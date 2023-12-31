import { PencilSquareIcon } from '@heroicons/react/24/outline';

import { useUser } from '@/hooks/useUser';
import { ProfileUser } from '@/model/user';

import Avatar from './Avatar';
import Button from './ui/Button';

type Props = {
  user: ProfileUser;
  isMyPage: boolean;
};

export default function ProfileUserSection({ user }: Props) {
  const { imageUrl, name, bio, id, username } = user;
  const { user: me } = useUser();

  const isMyPage = id === me?.id;
  const isFollowing = me
    ? me.following.find((user) => user.username === username)
    : false;

  return (
    <>
      <div className='mt-4 flex lg:mt-8'>
        <Avatar
          size='base'
          image={imageUrl}
          name={username}
          priority
          className='lg:hidden'
        />
        <Avatar
          size='xl'
          image={imageUrl}
          name={username}
          priority
          className='hidden lg:block'
        />
        <div className='ml-4'>
          <h2 className='text-lg font-semibold sm:text-xl lg:text-2xl'>
            {username}
          </h2>
          <span className='block text-sm text-gray-800 sm:text-base lg:mt-2 lg:text-lg'>
            {name}
          </span>
          {isMyPage && (
            <>
              <Button
                className='mt-2 flex items-center space-x-1 sm:hidden'
                color='white'
                size='xs'
              >
                <PencilSquareIcon className='h-4 w-4' />
                <span>Edit profile</span>
              </Button>
              <Button
                className='mt-2 hidden items-center space-x-2 sm:flex'
                color='white'
                size='base'
              >
                <PencilSquareIcon className='h-4 w-4' />
                <span>Edit profile</span>
              </Button>
            </>
          )}
          {!isMyPage && !isFollowing && (
            <Button className='mt-2 block' size='xs'>
              Follow
            </Button>
          )}
        </div>
      </div>
      <div className='mt-4 flex space-x-4'>
        <div className='flex items-center text-sm sm:text-base'>
          <span className='mr-2 font-semibold'>
            {user.following ? user.following.length : 0}
          </span>
          <span className='text-gray-500'>Following</span>
        </div>
        <div className='flex items-center text-sm sm:text-base'>
          <span className='mr-2 font-semibold'>
            {user.followers ? user.followers.length : 0}
          </span>
          <span className='text-gray-500'>Followers</span>
        </div>
      </div>
      <p className='mt-4 text-sm sm:text-base'>{bio}</p>
    </>
  );
}
