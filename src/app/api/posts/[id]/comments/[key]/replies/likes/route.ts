import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { dislikeReply, likeReply } from '@/service/posts/like';

// TODO: Refactor by making a middleware for validating session user
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string; key: string } },
) {
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;

  if (!uid) {
    return NextResponse.json(
      { message: 'Authentication Error' },
      { status: 401 },
    );
  }

  const { id: postId, key: commentKey } = params;
  const { replyKey, like } = await req.json();

  if (!postId || !commentKey || replyKey === undefined || like === undefined) {
    return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
  }

  const request = like ? likeReply : dislikeReply;

  return request({ postId, commentKey, replyKey, uid })
    .then(() =>
      NextResponse.json(
        {
          message: `${
            like ? 'Liked' : 'Disliked'
          } the reply (key: ${replyKey})`,
        },
        { status: 200 },
      ),
    )
    .catch((err) => {
      console.error(err);
      return new Response(JSON.stringify(err), { status: 500 });
    });
}

export const dynamic = 'force-dynamic';
