import VideoPost from '@/components/VideoPost';
import { getAllVideos } from '@/service/video';

export const revalidate = 0;

export default async function HomePage() {
  const videos = await getAllVideos();
  return (
    <main className='divide-y'>
      {videos.map((video) => (
        <VideoPost key={video._id} video={video} />
      ))}
    </main>
  );
}
