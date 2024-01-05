import { NextRequest, NextResponse } from 'next/server';

import { getLikedPostsByUsername } from '@/service/posts';

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } },
) {
  const lastItemDate = req.nextUrl.searchParams.get('lastItemDate');
  const { username } = params;

  if (!lastItemDate || username === undefined)
    return new Response('Bad Request', { status: 400 });

  return await getLikedPostsByUsername(username, lastItemDate)
    .then((res) => NextResponse.json(res, { status: 200 }))
    .catch((err) => {
      console.error(err);
      return new Response('Server Error', { status: 500 });
    });
}

export const dynamic = 'force-dynamic';
