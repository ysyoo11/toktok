import { NextRequest, NextResponse } from 'next/server';

import { getPostById } from '@/service/posts';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const video = await getPostById(id);

  if (!video) {
    return NextResponse.json(
      { message: 'Video post not found' },
      { status: 404 },
    );
  }

  return NextResponse.json(video, { status: 200 });
}

export const dynamic = 'force-dynamic';
