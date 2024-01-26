'use client';

import usePosts from '@/hooks/usePosts';
import { useUser } from '@/hooks/useUser';

import SkeletonAvatar from './skeleton/SkeletonAvatar';
import SkeletonRectangle from './skeleton/SkeletonRectangle';
import VideoPost from './VideoPost';

export default function PostList() {
  const { posts, isLoading } = usePosts();
  const { user } = useUser();

  if (isLoading) {
    return (
      <ul className='divide-y'>
        {[...new Array(4)].map((_, idx) => (
          <li key={`post-${idx}`}>
            <div className='mx-auto flex w-full max-w-md py-4 sm:mx-auto sm:max-w-lg sm:py-8'>
              <SkeletonAvatar
                size='base'
                className='hidden shrink-0 xs:block'
              />
              <div className='flex w-full xs:pl-3'>
                <div className='w-full max-w-sm'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <SkeletonAvatar size='sm' className='xs:hidden' />
                      <div className='flex flex-col pl-2 xs:pl-0'>
                        <SkeletonRectangle className='mb-2 h-4 w-28' />
                        <SkeletonRectangle className='h-4 w-20' />
                      </div>
                    </div>
                  </div>
                  <div className='mt-2 xs:mt-4'>
                    <div className='items-end pr-10 text-sm xs:pr-0 xs:text-base'>
                      <SkeletonRectangle className='mb-2 h-4 w-full' />
                      <SkeletonRectangle className='h-4 w-full' />
                    </div>
                    <div className='mt-2 flex items-end'>
                      <SkeletonRectangle className='h-96 w-56' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section>
      {posts && (
        <ul className='divide-y'>
          {posts.map((post) => (
            <li key={post.id}>
              <VideoPost post={post} user={user} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
