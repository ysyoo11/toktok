import { getServerSession } from 'next-auth';

import VideoPost from '@/components/VideoPost';
import { getAllVideos } from '@/service/posts';

import { authOptions } from './api/auth/[...nextauth]/options';

export const revalidate = 0;

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const videos = await getAllVideos(session?.user.username);
  return (
    <main className='divide-y'>
      {videos.map((video) => (
        <VideoPost key={video._id} video={video} />
      ))}
    </main>
  );
}
