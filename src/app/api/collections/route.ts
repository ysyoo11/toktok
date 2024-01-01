import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { createCollection } from '@/service/collection';

import { authOptions } from '../auth/[...nextauth]/options';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) return new Response('Authentication Error', { status: 401 });

  const { name, isPrivate } = await req.json();

  if (!name || !isPrivate) return new Response('Bad Request', { status: 400 });

  return await createCollection(user.id, name, isPrivate)
    .then(() =>
      NextResponse.json(
        { message: 'Created a new collection' },
        { status: 200 },
      ),
    )
    .catch((err) => {
      console.error(err);
      return new Response('Server Error', { status: 500 });
    });
}
