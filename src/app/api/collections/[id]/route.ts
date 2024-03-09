import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { addPostToCollection, getCollectionById } from '@/service/collection';

import { authOptions } from '../../auth/[...nextauth]/options';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  if (id === undefined) return new Response('Bad Request', { status: 400 });

  return await getCollectionById(id)
    .then((collection) => NextResponse.json(collection, { status: 200 }))
    .catch((err) => {
      console.error(err);
      return new Response('Server Error', { status: 500 });
    });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;

  if (!uid) {
    return NextResponse.json(
      { message: 'Authentication Error' },
      { status: 401 },
    );
  }

  const { id } = params;
  const { postId } = await req.json();

  if (id === undefined || postId === undefined) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  return addPostToCollection(id, postId)
    .then(() =>
      NextResponse.json(
        { message: `Added to the collection` },
        { status: 200 },
      ),
    )
    .catch((err) => {
      console.error(err);
      return new Response(JSON.stringify(err), { status: 500 });
    });
}

export const dynamic = 'force-dynamic';
