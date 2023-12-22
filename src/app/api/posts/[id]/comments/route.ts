import { NextRequest, NextResponse } from 'next/server';

import { getComments } from '@/service/posts/comments';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id: postId } = params;
  const searchParams = req.nextUrl.searchParams;
  const lastCommentDate = searchParams.get('lastCommentDate');
  const comments = await getComments(postId, lastCommentDate);

  return NextResponse.json(comments, { status: 200 });
}

export const dynamic = 'force-dynamic';
