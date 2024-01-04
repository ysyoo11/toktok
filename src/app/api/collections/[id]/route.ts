import { NextRequest, NextResponse } from 'next/server';

import { getCollectionById } from '@/service/collection';

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

export const dynamic = 'force-dynamic';
