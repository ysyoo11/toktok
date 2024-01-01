import { NextRequest, NextResponse } from 'next/server';

import { createCollection } from '@/service/collection';

export async function POST(req: NextRequest) {
  const { uid, name, isPrivate } = await req.json();

  if (!uid || !name || !isPrivate)
    return new Response('Bad Request', { status: 400 });

  return await createCollection(uid, name, isPrivate)
    .then(() =>
      NextResponse.json(
        { message: 'Created a new collection' },
        { status: 200 },
      ),
    )
    .catch((err) => {
      console.error(err);
      return new Response('Server Error', { status: 500 });
    });
}
