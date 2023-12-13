import { NextRequest, NextResponse } from 'next/server';
import { groq } from 'next-sanity';

import { client } from '@/service/sanity';
import { getUserByUsername } from '@/service/user';

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get('username');

  const user = username ? await getUserByUsername(username) : null;

  const videos = await client
    .fetch(
      groq`*[_type == 'video'] | order(_createdAt desc) {
        _id,
        _createdAt,
        videoUrl,
        author->{username, imageUrl, name},
        caption,
        visibility,
        music,
        comments[]{
          author->{username, imageUrl, name},
          text,
          likes->{username, imageUrl, name},
          replies[]{
            author->{username, imageUrl, name},
            text,
            likes->{username, imageUrl, name},
          }
        },
        view,
        likes[]->{username, imageUrl},
        saved,
        tag,
        duration
      }`,
    )
    .catch((err) => {
      console.error(err);
      NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    });

  const userLikedVideoIds = [];
  const userLikeCheckedVideos = [];
  if (user) {
    for (const likedVideo of user.liked) {
      userLikedVideoIds.push(likedVideo._id);
    }
    for (const video of videos) {
      const isLikedByUser = user
        ? userLikedVideoIds.includes(video._id)
        : false;
      userLikeCheckedVideos.push({ ...video, isLikedByUser });
    }
  }

  return NextResponse.json(
    { videos: user ? userLikeCheckedVideos : videos },
    { status: 200 },
  );
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get('file') as File;
  const authorId = formData.get('authorId') as string;
  const caption = formData.get('caption') as string;

  if (!file || !authorId || !caption) {
    return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
  }

  try {
    const { url: videoUrl } = await client.assets.upload('file', file);

    const videoData = {
      _type: 'video',
      videoUrl,
      author: {
        _type: 'reference',
        _ref: authorId,
      },
      caption,
      visibility: 'public',
      comments: [],
      likes: [],
      saved: 0,
      tags: [],
    };

    const video = await client.create(videoData);

    await client
      .patch(authorId)
      .setIfMissing({ videos: [] })
      .insert('after', 'videos[-1]', [{ _type: 'reference', _ref: video._id }])
      .commit({ autoGenerateArrayKeys: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: 'Successfully uploaded the video' },
    { status: 200 },
  );
}
