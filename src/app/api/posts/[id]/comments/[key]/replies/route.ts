import { NextRequest, NextResponse } from 'next/server';

import { getReplies } from '@/service/posts/replies';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; key: string } },
) {
  const { id: postId, key: commentKey } = params;
  const searchParams = req.nextUrl.searchParams;
  const lastReplyDate = searchParams.get('lastReplyDate');

  const replies = await getReplies(postId, commentKey, lastReplyDate);

  return NextResponse.json(replies, { status: 200 });
}

export const dynamic = 'force-dynamic';
