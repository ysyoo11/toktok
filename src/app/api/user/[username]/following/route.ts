import { NextRequest, NextResponse } from 'next/server';

import { getFollowingByUsername } from '@/service/user';

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } },
) {
  const lastItemSortIndex = req.nextUrl.searchParams.get('lastItemSortIndex');
  const { username } = params;

  if (username === undefined || lastItemSortIndex === null)
    return new Response('Bad Request', { status: 400 });

  return await getFollowingByUsername(username, lastItemSortIndex)
    .then(({ following }) => NextResponse.json(following, { status: 200 }))
    .catch((err) => {
      console.error(err);
      return new Response('Server Error', { status: 500 });
    });
}

export const dynamic = 'force-dynamic';
