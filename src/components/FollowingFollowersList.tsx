import { useRouter } from 'next/navigation';
import { InView } from 'react-intersection-observer';

import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useUser } from '@/hooks/useUser';
import { POLICY } from '@/policy';

import Avatar from './Avatar';
import FollowButton from './FollowButton';
import Loading from './ui/Loading';

import type { FollowingFollowersModalDisplayMode } from './ProfileUserInfo';
import type { SimpleUser } from '@/model/user';

type Props = {
  originUsername: string;
  type: FollowingFollowersModalDisplayMode;
  className?: string;
};

export default function FollowingFollowersList({
  originUsername,
  type,
  className,
}: Props) {
  const {
    items: users,
    loading,
    loadMore,
    isReachingEnd,
  } = useInfiniteScroll<SimpleUser>({
    fetchInput: `/api/user/${originUsername}/${type}`,
    fetchLimit: POLICY.USER_FETCH_LIMIT,
    sortOrder: 'id',
  });
  const { user } = useUser();
  const router = useRouter();

  return (
    <section className={className}>
      <ul className='mt-4 space-y-4 overflow-y-auto px-6 sm:px-8'>
        {users.map(({ id, imageUrl, username, name, followers, following }) => (
          <li key={id} className='flex items-center justify-between'>
            <button
              onClick={() => router.push(`/${username}`)}
              className='flex items-center'
            >
              <Avatar
                size='xs'
                image={imageUrl}
                name={username}
                className='sm:hidden'
              />
              <Avatar
                size='sm'
                image={imageUrl}
                name={username}
                className='hidden sm:block'
              />
              <div className='ml-2 flex flex-col items-start space-y-0.5'>
                <span className='text-sm font-medium sm:text-base'>
                  {username}
                </span>
                <span className='text-xs text-gray-600 sm:text-sm'>{name}</span>
              </div>
            </button>
            <FollowButton user={user} targetUsername={username} />
          </li>
        ))}
      </ul>
      {loading && <Loading className='w-12' />}
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
