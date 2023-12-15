import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { groq } from 'next-sanity';

import { client } from '@/service/sanity';
import { getUserByUsername } from '@/service/user';

import { authOptions } from '../../auth/[...nextauth]/options';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  const username = session?.user.username;
  const user = username ? await getUserByUsername(username) : null;

  const { id } = params;

  const video =
    await client.fetch(groq`*[_type == 'video' && _id == '${id}'][0]{
    id,
    videoUrl,
    author,
    caption,
    visibility,
    music,
    comments,
    view,
    likes[]->{_id, username, imageUrl},
    saved,
    tags
  }`);

  if (!video) {
    return NextResponse.json(
      { message: 'Video post not found' },
      { status: 404 },
    );
  }
  const userLikedVideoIds = [];
  if (user) {
    for (const likedVideo of user.liked) {
      userLikedVideoIds.push(likedVideo.id);
    }
  }
  const isLikedByUser = user ? userLikedVideoIds.includes(video.id) : false;

  return NextResponse.json(
    { video: { ...video, isLikedByUser } },
    { status: 200 },
  );
}
