import { NextRequest, NextResponse } from 'next/server';
import { groq } from 'next-sanity';

import { client } from '@/service/sanity';

export async function GET() {
  const videos = await client
    .fetch(
      groq`*[_type == 'video']{
        _id,
        _createdAt,
        videoUrl,
        author->{username, imageURL},
        caption,
        visibility,
        music,
        comment,
        view,
        likes,
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
