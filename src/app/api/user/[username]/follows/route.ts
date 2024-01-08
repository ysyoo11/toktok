import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { follow, unfollow } from '@/service/follow';
import { getUserByUsername } from '@/service/user';

import { authOptions } from '../../../auth/[...nextauth]/options';

export async function PUT(
  req: NextRequest,
  { params }: { params: { username: string } },
) {
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;

  if (!uid) return new Response('Authentication Error', { status: 401 });

  const { username } = params;
  const { type } = await req.json();

  if (username === undefined || type === undefined)
    return new Response('Bad Request');

  const { id: targetUserId } = await getUserByUsername(username);

  const request = type === 'follow' ? follow : unfollow;

  return request(uid, targetUserId)
    .then((res) =>
      NextResponse.json(
        {
          message: `Successfully ${
            type === 'follow' ? 'followed' : 'unfollowed'
          } '${username}'`,
        },
        { status: 200 },
      ),
    )
    .catch((err) => {
      console.error(err);
      return new Response('Server Error', { status: 500 });
    });
}
