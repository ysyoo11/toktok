import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { getUserByUsername } from '@/service/user';

import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return await getUserByUsername(user.username) //
    .then((data) => NextResponse.json(data));
}
