import { NextRequest, NextResponse } from 'next/server';
import { groq } from 'next-sanity';

import { client } from '@/service/sanity';

import type { User } from '@/model/user';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { message: 'User id is not passed as a query parameter' },
      { status: 400 },
    );
  }

  const user = await client
    .fetch<User[]>(
      groq`*[_type=='user' && _id=='${id}']{
      _id,
      name,
      videos,
      imageURL,
      following,
      follower
    }`,
    )
    .then((res) => res[0])
    .catch((err) => {
      console.error(err);
      return NextResponse.json({ message: 'Server error' }, { status: 500 });
    });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ user }, { status: 200 });
}
