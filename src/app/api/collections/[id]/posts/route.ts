import { NextRequest, NextResponse } from 'next/server';

import { getPostsByCollectionId } from '@/service/posts';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const lastItemDate = req.nextUrl.searchParams.get('lastItemDate');
  const { id } = params;

  if (lastItemDate === null || id === undefined)
    return new Response('Bad Request', { status: 400 });

  return await getPostsByCollectionId(id, lastItemDate)
    .then((res) => NextResponse.json(res, { status: 200 }))
    .catch((err) => {
      console.error(err);
      return new Response('Server Error', { status: 500 });
    });
}

export const dynamic = 'force-dynamic';
