'use client';

import { InView } from 'react-intersection-observer';

import ProfilePostCard from '@/components/ProfilePostCard';
import SkeletonProfileCards from '@/components/skeleton/SkeletonProfileCards';
import Loading from '@/components/ui/Loading';
import useProfilePosts from '@/hooks/useProfilePosts';

type Props = {
  params: {
    username: string;
  };
};

export default function ProfilePage({ params: { username } }: Props) {
  const { posts, isReachingEnd, loadMore, loading } = useProfilePosts(username);

  if (posts.length === 0 && loading) return <SkeletonProfileCards />;

  return (
    <section className='mt-2 lg:mt-4'>
      <ul className='grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
        {posts.map((post) => (
          <li key={`user-post-${post.id}`}>
            <ProfilePostCard post={post} />
          </li>
        ))}
      </ul>
      {loading && <Loading className='w-12 py-20' />}
      {!isReachingEnd && (
        <div className='py-2'>
          <InView
            as='div'
            rootMargin='24px'
            onChange={(inView) => {
              if (inView) loadMore();
            }}
          />
        </div>
      )}
    </section>
  );
}
