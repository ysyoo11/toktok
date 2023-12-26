import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getReplies, postReply } from '@/service/posts/replies';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; commentId: string } },
) {
  const { id: postId, commentId } = params;
  const searchParams = req.nextUrl.searchParams;
  const lastReplyDate = searchParams.get('lastReplyDate');

  const replies = await getReplies(postId, commentId, lastReplyDate).catch(
    (err) => {
      console.error(err);
      return new Response('Server Error', { status: 500 });
    },
  );

  return NextResponse.json(replies, { status: 200 });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string; commentId: string } },
) {
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;

  if (!uid) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { reply } = await req.json();
  const { id: postId, commentId } = params;
  if (!reply || !postId || !commentId) {
    return new Response('Bad Reqeust', { status: 400 });
  }

  return await postReply({ postId, commentId, uid, reply })
    .then((data) =>
      NextResponse.json(
        { message: 'Successfully posted the reply', data },
        { status: 201 },
      ),
    )
    .catch((err) => {
      console.error(err);
      return new Response('Server error', { status: 500 });
    });
}

export const dynamic = 'force-dynamic';
