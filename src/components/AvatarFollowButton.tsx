import { PlusIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

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

  const isFollowing = user ? user.following.includes(targetUsername) : false;

  const handleFollow = (e: MouseEvent) => {
    e.stopPropagation();
    if (user === undefined) router.push('/signin', { scroll: false });
    if (isFollowing) {
      router.push(`/${targetUsername}`);
    }
    // TODO: handle follow
  };

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
