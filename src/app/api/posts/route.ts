import { NextRequest, NextResponse } from 'next/server';

import { getPublicPosts } from '@/service/posts';
import { client } from '@/service/sanity';

export async function GET() {
  return getPublicPosts().then((data) => NextResponse.json(data));
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
    const { url: videoUrl, _id } = await client.assets.upload('file', file);

    const videoData = {
      _type: 'video',
      id: _id,
      videoUrl,
      author: {
        _type: 'reference',
        _ref: authorId,
      },
      caption,
      visibility: 'public',
      views: 0,
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
