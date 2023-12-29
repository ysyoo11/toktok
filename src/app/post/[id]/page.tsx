'use client';

import { notFound } from 'next/navigation';

import DetailPageCommentsSection from '@/components/DetailPageCommentsSection';
import ModalVideoPlayer from '@/components/ModalVideoPlayer';
import PostGridList from '@/components/PostGridList';
import PostInfo from '@/components/PostInfo';
import Loading from '@/components/ui/Loading';
import { PostProvider } from '@/context/PostContext';
import usePost from '@/hooks/usePost';
import usePosts from '@/hooks/usePosts';

type Props = {
  params: {
    id: string;
  };
};

export default function PostDetailPage({ params: { id } }: Props) {
  const { post, error } = usePost(id);
  const { posts } = usePosts();

  if (error) notFound();

  if (!post) {
    return (
      <div className='h-full w-full py-20'>
        <Loading className='w-12 sm:w-20' />
      </div>
    );
  }
  return (
    <PostProvider post={post}>
      <div className='mx-auto mt-4 flex h-full max-h-[640px] w-full justify-center'>
        <ModalVideoPlayer post={post} />
      </div>
      <PostInfo post={post} />
      {!posts ? (
        <div className='w-full py-4'>
          <Loading className='w-10' />
        </div>
      ) : (
        <PostGridList posts={posts} className='mt-6' />
      )}
      <DetailPageCommentsSection post={post} />
    </PostProvider>
  );
}
