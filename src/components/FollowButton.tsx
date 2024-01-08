import { useCallback } from 'react';
import { useSWRConfig } from 'swr';

import { updateFollow } from '@/lib/follow';
import { SimpleUser } from '@/model/user';
import { USER_SWR_KEY } from '@/swr';

import Button from './ui/Button';

type Props = {
  user: SimpleUser | undefined;
  location?: 'feed' | 'profile';
  targetUsername: string;
  className?: string;
};

export default function FollowButton({
  user,
  location = 'profile',
  targetUsername,
  className,
}: Props) {
  const { mutate } = useSWRConfig();

  const isFollowing = user ? user.following?.includes(targetUsername) : false;
  const isFollowed = user ? user.followers?.includes(targetUsername) : false;

  const handleFollowUpdate = useCallback(
    (type: 'follow' | 'unfollow') => {
      if (!user) return;
      const newUser: SimpleUser =
        type === 'follow'
          ? { ...user, following: [...user.following, targetUsername] }
          : {
              ...user,
              following: user.following.filter((f) => f !== targetUsername),
            };
      mutate(
        (key) => typeof key === 'string' && key === USER_SWR_KEY.GET_ME,
        updateFollow(targetUsername, type),
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
    [mutate, targetUsername, user],
  );

  if (user && user.username === targetUsername) return null;

  if (isFollowing) {
    return (
      <Button
        size='sm'
        color='white'
        onClick={() => handleFollowUpdate('unfollow')}
        className={className}
      >
        Following
      </Button>
    );
  } else {
    return (
      <>
        {location === 'feed' ? (
          <Button
            size='sm'
            color='white-theme'
            onClick={() => handleFollowUpdate('follow')}
            className={className}
          >
            Follow
          </Button>
        ) : (
          <Button
            size='sm'
            onClick={() => handleFollowUpdate('follow')}
            className={className}
          >
            {isFollowed ? 'Follow back' : 'Follow'}
          </Button>
        )}
      </>
    );
  }
}
