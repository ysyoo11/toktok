import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import {
  addPostToCollection,
  getCollectionById,
  removePostFromCollection,
} from '@/service/collection';

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
  const user = session?.user;

  if (!user) {
    return NextResponse.json(
      { message: 'Authentication Error' },
      { status: 401 },
    );
  }

  const { id } = params;
  const { postId, isSaved } = await req.json();

  if (id === undefined || postId === undefined || isSaved === undefined) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  const request = isSaved ? removePostFromCollection : addPostToCollection;

  return request(id, postId)
    .then(() =>
      NextResponse.json(
        {
          message: isSaved
            ? `Deleted the post from the collection`
            : `Added the post to the collection`,
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
