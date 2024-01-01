import { NextRequest, NextResponse } from 'next/server';

import { createPost, getPublicPosts } from '@/service/posts';

export async function GET() {
  return getPublicPosts().then((data) => NextResponse.json(data));
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get('file') as File;
  const authorId = formData.get('authorId') as string;
  const caption = formData.get('caption') as string;

  if (!file || !authorId || !caption) {
    return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
  }

  return await createPost(file, authorId, caption)
    .then(() =>
      NextResponse.json({ message: 'Created a post' }, { status: 201 }),
    )
    .catch((err) => {
      console.error(err);
      return new Response('Server Error', { status: 500 });
    });
}
