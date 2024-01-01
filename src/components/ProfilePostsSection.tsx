import { InView } from 'react-intersection-observer';

import useProfilePosts from '@/hooks/useProfilePosts';

import ProfilePostCard from './ProfilePostCard';
import Loading from './ui/Loading';

type Props = {
  username: string;
};

export default function ProfilePostsSection({ username }: Props) {
  const { posts, isReachingEnd, loadMore, loading } = useProfilePosts(username);

  if (!posts)
    return (
      <div className='py-14'>
        <Loading className='w-12' />
      </div>
    );

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
