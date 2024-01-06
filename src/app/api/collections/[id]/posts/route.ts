import { NextRequest, NextResponse } from 'next/server';

import { getPostsByCollectionId } from '@/service/posts';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const lastItemSortIndex = req.nextUrl.searchParams.get('lastItemSortIndex');
  const { id } = params;

  if (lastItemSortIndex === null || id === undefined)
    return new Response('Bad Request', { status: 400 });

  return await getPostsByCollectionId(id, lastItemSortIndex)
    .then((res) => NextResponse.json(res, { status: 200 }))
    .catch((err) => {
      console.error(err);
      return new Response('Server Error', { status: 500 });
    });
}

export const dynamic = 'force-dynamic';
