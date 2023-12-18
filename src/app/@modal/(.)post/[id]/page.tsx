'use client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import ModalVideoPlayer from '@/components/ModalVideoPlayer';
import usePost from '@/hooks/usePost';

type Props = {
  params: {
    id: string;
  };
};

export default function PostDetailModal({ params: { id } }: Props) {
  const { post } = usePost(id);
  const router = useRouter();

  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className='fixed inset-0 z-10 flex bg-black/70 backdrop-blur-lg'>
      <div className='flex items-center'>
        <ModalVideoPlayer post={post} />
        <div className='hidden sm:block'>
          {/* TODO: author, caption, engagement bar */}
        </div>
      </div>
    </div>
  );
}
