import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { dislikeComment, likeComment } from '@/service/posts/like';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const postId = params.id;

  const { like, commentId } = await req.json();

  if (!postId || like === undefined || commentId === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  const request = like ? likeComment : dislikeComment;

  return request(postId, commentId, user.id)
    .then(() =>
      NextResponse.json(
        {
          message: `${
            like ? 'Liked' : 'Disliked'
          } the comment (id: ${commentId})`,
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
