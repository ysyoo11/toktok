'use client';

import { notFound } from 'next/navigation';

import CommentForm from '@/components/CommentForm';
import CommentsList from '@/components/CommentsList';
import DetailVideoPlayer from '@/components/DetailVideoPlayer';
import PostGridList from '@/components/PostGridList';
import PostInfo from '@/components/PostInfo';
import SimpleVideoCard from '@/components/SimpleVideoCard';
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
    <PostProvider post={post} location='detail-page'>
      <main className='mx-auto mt-4 w-full max-w-6xl pb-20 lg:flex'>
        <div>
          <div className='mt-4 flex h-full max-h-[640px] justify-center'>
            <DetailVideoPlayer location='page' post={post} />
          </div>
          <PostInfo post={post} />
          {!posts ? (
            <div className='w-full py-4'>
              <Loading className='w-10' />
            </div>
          ) : (
            <PostGridList posts={posts} className='mt-6 lg:hidden' />
          )}
          <section className='mt-4'>
            <div className='my-6 h-[1.5px] bg-gray-200' />
            <p className='mb-2 text-lg font-semibold'>
              {post.comments} {post.comments === 1 ? 'comment' : 'comments'}
            </p>
            <CommentForm hasTopBorder={false} />
            <div className='my-4 h-[1.5px] bg-gray-200' />
            <CommentsList location='detail-page' post={post} />
          </section>
        </div>
        <aside className='hidden w-full max-w-xs pl-4 lg:block'>
          <p className='text-lg font-semibold'>You may like</p>
          {!posts ? (
            <div className='w-full py-4'>
              <Loading className='w-10' />
            </div>
          ) : (
            <ul className='mt-4 grid grid-cols-2 gap-4'>
              {posts.map((post) => (
                <li key={`side-grid-post-${post.id}`}>
                  <SimpleVideoCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </aside>
      </main>
    </PostProvider>
  );
}
