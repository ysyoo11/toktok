import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getReplies, postReply } from '@/service/posts/replies';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; key: string } },
) {
  const { id: postId, key: commentKey } = params;
  const searchParams = req.nextUrl.searchParams;
  const lastReplyDate = searchParams.get('lastReplyDate');

  const replies = await getReplies(postId, commentKey, lastReplyDate).catch(
    (err) => {
      console.error(err);
      return new Response('Server Error', { status: 500 });
    },
  );

  return NextResponse.json(replies, { status: 200 });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string; key: string } },
) {
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;

  if (!uid) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { reply } = await req.json();
  const { id: postId, key: commentKey } = params;
  if (!reply || !postId || !commentKey) {
    return new Response('Bad Reqeust', { status: 400 });
  }

  return await postReply({ postId, commentKey, uid, reply })
    .then(() =>
      NextResponse.json(
        { message: 'Successfully posted the reply' },
        { status: 201 },
      ),
    )
    .catch((err) => {
      console.error(err);
      return new Response('Server error', { status: 500 });
    });
}

export const dynamic = 'force-dynamic';
