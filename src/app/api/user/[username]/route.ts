import { NextRequest, NextResponse } from 'next/server';

import { getUserByUsername } from '@/service/user';

export async function GET(
  _req: NextRequest,
  { params: { username } }: { params: { username: string } },
) {
  if (!username) return new Response('Bad Request', { status: 400 });

  return await getUserByUsername(username)
    .then((res) =>
      res
        ? NextResponse.json(res, { status: 200 })
        : new Response('User Not Found', { status: 404 }),
    )
    .catch((err) => {
      console.error(err);
      return new Response('Server Error', { status: 500 });
    });
}

export const dynamic = 'force-dynamic';
