import { NextRequest, NextResponse } from 'next/server';

import { getCollectionsByUsername } from '@/service/collection';

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } },
) {
  const lastCollectionDate = req.nextUrl.searchParams.get('lastCollectionDate');
  const onlyPublic = req.nextUrl.searchParams.get('onlyPublic');
  const { username } = params;

  if (!lastCollectionDate || !username || !onlyPublic)
    return new Response('Bad Request', { status: 400 });

  const getOnlyPublic = onlyPublic === 'true' ? true : false;

  return await getCollectionsByUsername(
    username,
    lastCollectionDate,
    getOnlyPublic,
  )
    .then(({ collections }) => NextResponse.json(collections, { status: 200 }))
    .catch((err) => {
      console.error(err);
      return new Response('Server Error', { status: 500 });
    });
}

export const dynamic = 'force-dynamic';
