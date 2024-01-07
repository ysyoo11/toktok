import { SimpleUser } from '@/model/user';

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
  const isFollowing = user ? user.following.includes(targetUsername) : false;
  const isFollowed = user ? user.followers.includes(targetUsername) : false;

  const handleFollow = () => {};
  const handleUnfollow = () => {};

  if (user && user.username === targetUsername) return null;

  if (isFollowing) {
    return (
      <Button
        size='sm'
        color='white'
        onClick={handleUnfollow}
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
            onClick={handleFollow}
            className={className}
          >
            {isFollowed ? 'Follow back' : 'Follow'}
          </Button>
        ) : (
          <Button size='sm' onClick={handleFollow} className={className}>
            {isFollowed ? 'Follow back' : 'Follow'}
          </Button>
        )}
      </>
    );
  }
}
