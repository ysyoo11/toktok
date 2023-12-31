import { NextRequest, NextResponse } from 'next/server';

import { getPostsByUsername } from '@/service/posts';

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } },
) {
  const lastPostDate = req.nextUrl.searchParams.get('lastPostDate');
  const { username } = params;

  if (!username || !lastPostDate)
    return new Response('Bad Request', { status: 400 });

  return await getPostsByUsername(username, lastPostDate)
    .then((res) => NextResponse.json(res, { status: 200 }))
    .catch((err) => {
      console.error(err);
      return new Response('Server Error', { status: 500 });
    });
}

export const dynamic = 'force-dynamic';
