import { NextRequest, NextResponse } from 'next/server';

import { getComments } from '@/service/posts/comments';

export async function GET(
  _req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const comments = await getComments(id);

  return NextResponse.json(comments, { status: 200 });
}

export const dynamic = 'force-dynamic';
