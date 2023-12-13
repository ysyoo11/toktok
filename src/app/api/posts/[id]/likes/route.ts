import { NextRequest, NextResponse } from 'next/server';

import { client } from '@/service/sanity';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { uid } = await req.json();

  const videoId = params.id;

  try {
    await client
      .patch(videoId)
      .setIfMissing({ likes: [] })
      .insert('after', 'likes[-1]', [{ _type: 'reference', _ref: uid }])
      .commit({ autoGenerateArrayKeys: true });

    await client
      .patch(uid)
      .setIfMissing({ liked: [] })
      .insert('after', 'liked[-1]', [{ _type: 'reference', _ref: videoId }])
      .commit({ autoGenerateArrayKeys: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: 'Successfully liked the video!' },
    { status: 200 },
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const uid = req.headers.get('uid');
  const videoId = params.id;

  if (!uid) {
    return NextResponse.json({ message: 'Unauthorised user' }, { status: 401 });
  }

  try {
    await client
      .patch(uid)
      .unset([`liked[_ref=="${videoId}"]`])
      .commit();
    await client
      .patch(videoId)
      .unset([`likes[_ref=="${uid}"]`])
      .commit();
    return NextResponse.json(
      { message: 'Successfully deleted like' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
