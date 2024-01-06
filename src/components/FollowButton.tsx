import Button from './ui/Button';

type Props = {
  isFollowing: boolean;
  isFollowed: boolean;
  targetUsername: string;
};

export default function FollowButton({
  isFollowed,
  isFollowing,
  targetUsername,
}: Props) {
  const handleFollow = () => {};
  const handleUnfollow = () => {};

  if (isFollowing) {
    return (
      <Button size='sm' color='white' onClick={handleUnfollow}>
        Following
      </Button>
    );
  } else {
    return (
      <Button size='sm' onClick={handleFollow}>
        {isFollowed ? 'Follow back' : 'Follow'}
      </Button>
    );
  }
}
