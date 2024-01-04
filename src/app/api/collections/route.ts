import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import {
  createCollection,
  getCollectionsByUsername,
} from '@/service/collection';

import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const username = searchParams.get('username');
  const lastCollectionDate = searchParams.get('lastCollectionDate');
  const onlyPublic = searchParams.get('onlyPublic');

  if (lastCollectionDate === null || username === null || onlyPublic === null)
    return new Response('Bad Request', { status: 400 });

  const getOnlyPublic = onlyPublic === 'true' ? true : false;

  return await getCollectionsByUsername(
    username,
    lastCollectionDate,
    getOnlyPublic,
  )
    .then((collections) => NextResponse.json(collections, { status: 200 }))
    .catch((err) => {
      console.error(err);
      return new Response('Server Error', { status: 500 });
    });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) return new Response('Authentication Error', { status: 401 });

  const { name, isPrivate } = await req.json();

  if (name === undefined || isPrivate === undefined)
    return new Response('Bad Request', { status: 400 });

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

export const dynamic = 'force-dynamic';
