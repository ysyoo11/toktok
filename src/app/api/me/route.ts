import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { getUserById } from '@/service/user';

import { authOptions } from '../auth/[...nextauth]/options';

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return await getUserById(user.id) //
    .then((data) => NextResponse.json(data));
}
