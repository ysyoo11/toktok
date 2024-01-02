import { PencilSquareIcon } from '@heroicons/react/24/outline';

import { ProfileUser } from '@/model/user';

import Avatar from './Avatar';
import SkeletonAvatar from './skeleton/SkeletonAvatar';
import SkeletonText from './skeleton/SkeletonText';
import Button from './ui/Button';

type Props = {
  user: ProfileUser | undefined;
  isMyPage: boolean;
  isFollowing: boolean;
};

export default function ProfileUserInfo({
  user,
  isMyPage,
  isFollowing,
}: Props) {
  if (!user)
    return (
      <>
        <div className='mt-4 flex lg:mt-8'>
          <SkeletonAvatar size='base' className='lg:hidden' />
          <SkeletonAvatar size='xl' className='hidden lg:block' />
          <div className='ml-4'>
            <SkeletonText textSize='lg' className='my-4 w-32' />
            <SkeletonText textSize='sm' className='my-1 w-20' />
          </div>
        </div>
        <div className='mt-8 flex space-x-4'>
          <div className='flex items-center space-x-4'>
            <SkeletonText textSize='sm' className='my-1 w-24' />
          </div>
          <div className='flex items-center text-sm sm:text-base'>
            <SkeletonText textSize='sm' className='my-1 w-24' />
          </div>
        </div>
        <SkeletonText className='my-2 w-44' />
      </>
    );

  const { imageUrl, username, name, bio } = user;

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
