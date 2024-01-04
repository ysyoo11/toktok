import { InView } from 'react-intersection-observer';

import ProfilePostCard from './ProfilePostCard';
import Loading from './ui/Loading';

import type { UserPost } from '@/model/post';

type Props = {
  posts: UserPost[];
  loading: boolean;
  isReachingEnd: boolean;
  loadMore: () => void;
};

export default function ProfilePostsGrid({
  posts,
  loading,
  isReachingEnd,
  loadMore,
}: Props) {
  return (
    <section className='mt-6 lg:mt-10'>
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
