import { NextRequest, NextResponse } from 'next/server';
import { groq } from 'next-sanity';

import { client } from '@/service/sanity';

export async function GET() {
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
        tag
      }`,
    )
    .catch((err) => {
      console.error(err);
      NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    });

  return NextResponse.json({ videos }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get('file') as File;
  const authorId = formData.get('authorId');
  const caption = formData.get('caption');

  if (!file || !authorId || !caption) {
    return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
  }

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

  const video = await client
    .create(videoData) //
    .catch((err) => {
      console.error(err);
      return NextResponse.json(
        { message: 'Something went wrong' },
        { status: 500 },
      );
    });

  return NextResponse.json(
    { message: 'Successfully uploaded the video' },
    { status: 200 },
  );
}
