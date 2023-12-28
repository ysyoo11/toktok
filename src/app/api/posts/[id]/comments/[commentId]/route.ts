import { NextRequest, NextResponse } from 'next/server';

import { getCommentById } from '@/service/posts/comments';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string; commentId: string } },
) {
  const { id: postId, commentId } = params;

  if (!postId || !commentId)
    return new Response('Bad Request', { status: 400 });

  return await getCommentById(postId, commentId)
    .then((res) => NextResponse.json(res, { status: 200 }))
    .catch(() => new Response('Server Error', { status: 500 }));
}

export const dynamic = 'force-dynamic';
