import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // const { file, authorId, caption } = form;

  // if (!file || !authorId) return;

  // const { url: videoUrl } = await uploadVideo(file);

  // const videoData = {
  //   _type: 'video',
  //   videoUrl,
  //   author: {
  //     _type: 'reference',
  //     _ref: authorId,
  //   },
  //   caption,
  //   visibility: 'public',
  // };

  // return await client.create(videoData).catch(console.error);

  return NextResponse.json({ message: 'hello' }, { status: 200 });
}
