import { PlayIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { UserPost } from '@/model/post';

type Props = {
  post: UserPost;
};

export default function ProfilePostCard({
  post: { videoUrl, views, caption, id },
}: Props) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    if (!videoRef.current) return;
    videoRef.current.play();
  };
  const pause = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <button onClick={() => router.push(`/post/${id}`, { scroll: false })}>
      <div
        className='relative aspect-[4/6] overflow-hidden rounded'
        onMouseEnter={play}
        onMouseLeave={pause}
      >
        <video
          playsInline
          ref={videoRef}
          src={videoUrl}
          className='h-full w-full object-cover object-center'
          muted
        />
        <div className='absolute bottom-2 left-2 flex items-center space-x-1 text-white/90'>
          <PlayIcon className='h-4 w-4 stroke-2' />
          <span className='text-sm'>{views}</span>
        </div>
      </div>
      <p className='mt-1 line-clamp-1 text-left text-sm font-light text-gray-800'>
        {caption}
      </p>
    </button>
  );
}
