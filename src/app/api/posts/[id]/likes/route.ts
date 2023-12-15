import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { dislikePost, likePost } from '@/service/posts/like';

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

  const { like } = await req.json();

  if (!postId || like === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  const request = like ? likePost : dislikePost;

  return request(postId, user.id)
    .then(() =>
      NextResponse.json(
        { message: `Liked the post (id: ${postId})` },
        { status: 200 },
      ),
    )
    .catch((error) => {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    });
}
