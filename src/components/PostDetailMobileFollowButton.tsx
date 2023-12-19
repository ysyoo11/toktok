import { PlusIcon } from '@heroicons/react/24/solid';

import Avatar from './Avatar';

type Props = {
  onClick: () => void;
  image: string;
  username: string;
  isFollowed: boolean;
};

export default function PostDetailMobileFollowButton({
  onClick,
  image,
  username,
  isFollowed,
}: Props) {
  return (
    <button
      className='relative'
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <Avatar image={image} name={username} hasBorder />
      {!isFollowed && (
        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full bg-theme-pink-100 p-0.5'>
          <PlusIcon className='h-4 w-4 stroke-[4] text-white' />
        </div>
      )}
    </button>
  );
}
