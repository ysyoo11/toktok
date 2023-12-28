'use client';
import { Dialog } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import ModalVideoPlayer from '@/components/ModalVideoPlayer';
import PostDetailSidebar from '@/components/PostDetailSidebar';
import Loading from '@/components/ui/Loading';
import { PostProvider } from '@/context/PostContext';
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

  if (!post)
    return (
      <div className='fixed inset-0 z-10 flex w-full bg-black/70 backdrop-blur-lg'>
        <Loading className='w-20' />
      </div>
    );

  return (
    <PostProvider post={post}>
      <Dialog
        as='div'
        className='relative z-10 h-screen'
        open={true}
        onClose={onClose}
      >
        <div
          className='fixed inset-0 bg-black/70 backdrop-blur-lg'
          aria-hidden
        />
        <div className='fixed inset-0 h-full w-screen overflow-y-auto'>
          <Dialog.Panel className='h-full w-full'>
            <div className='flex h-full w-full items-center overflow-y-auto'>
              <div className='sticky top-0 z-[1] h-full w-full'>
                <ModalVideoPlayer post={post} />
              </div>
              <PostDetailSidebar post={post} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </PostProvider>
  );
}
