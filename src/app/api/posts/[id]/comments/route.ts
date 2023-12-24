import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getComments, postComment } from '@/service/posts/comments';

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

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;

  if (!uid) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { comment } = await req.json();
  const { id: postId } = params;

  if (!postId || !comment) {
    return new Response('Bad request', { status: 400 });
  }

  return await postComment(postId, uid, comment)
    .then(() =>
      NextResponse.json(
        { message: 'Successfully posted the comment' },
        { status: 201 },
      ),
    )
    .catch((err) => {
      console.error(err);
      return new Response('Server error', { status: 500 });
    });
}

export const dynamic = 'force-dynamic';
