import { PlusIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { MouseEvent, useCallback } from 'react';
import { useSWRConfig } from 'swr';

import { updateFollow } from '@/lib/follow';
import { USER_SWR_KEY } from '@/swr';

import Avatar from './Avatar';

import type { SimpleUser } from '@/model/user';

type Props = {
  user: SimpleUser | undefined;
  targetUserImage: string;
  targetUsername: string;
};

export default function AvatarFollowButton({
  user,
  targetUserImage,
  targetUsername,
}: Props) {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const isFollowing = user ? user.following.includes(targetUsername) : false;

  const handleFollow = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      if (user === undefined) return router.push('/signin', { scroll: false });
      if (isFollowing) return router.push(`/${targetUsername}`);

      const newUser: SimpleUser = {
        ...user,
        following: [...user.following, targetUsername],
      };
      mutate(
        (key) => typeof key === 'string' && key === USER_SWR_KEY.GET_ME,
        updateFollow(targetUsername, 'follow'),
        {
          optimisticData: newUser,
          revalidate: false,
          populateCache: false,
          rollbackOnError: true,
        },
      ).then(() =>
        mutate((key) => typeof key === 'string' && key.startsWith('/api/user')),
      );
    },
    [isFollowing, router, targetUsername, user, mutate],
  );

  return (
    <button className='relative' onClick={handleFollow}>
      <Avatar image={targetUserImage} name={targetUsername} hasBorder />
      {!isFollowing && (
        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full bg-theme-pink-100 p-0.5'>
          <PlusIcon className='h-4 w-4 stroke-[4] text-white' />
        </div>
      )}
    </button>
  );
}
