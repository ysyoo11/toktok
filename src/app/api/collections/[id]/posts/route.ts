import { NextRequest, NextResponse } from 'next/server';

import { getPostsByCollectionId } from '@/service/posts';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const lastPostDate = req.nextUrl.searchParams.get('lastPostDate');
  const { id } = params;

  if (lastPostDate === null || id === undefined)
    return new Response('Bad Request', { status: 400 });

  return await getPostsByCollectionId(id, lastPostDate)
    .then((res) => NextResponse.json(res, { status: 200 }))
    .catch((err) => {
      console.error(err);
      return new Response('Server Error', { status: 500 });
    });
}

export const dynamic = 'force-dynamic';
