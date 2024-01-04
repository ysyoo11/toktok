'use client';

import { ChevronLeftIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

import { Collection } from '@/model/collection';

import Button from './ui/Button';

type Props = {
  username: string;
  collection: Collection;
  manageMode: boolean;
  setManageMode: Dispatch<SetStateAction<boolean>>;
};

export default function CollectionInfo({
  username,
  collection: { name, isPrivate, posts },
  manageMode,
  setManageMode,
}: Props) {
  const deleteVideo = () => {
    setManageMode(false);
  };

  return (
    <div className='border-b py-4 sm:py-8'>
      <Link
        href={`/${username}/collections`}
        className='flex w-max items-center space-x-2 py-2 pr-2 text-gray-500 hover:text-gray-900'
      >
        <ChevronLeftIcon className='h-5 w-5 stroke-2 sm:h-6 sm:w-6' />
        <span className='hidden sm:block lg:text-lg'>See all collections</span>
      </Link>
      <div className='flex items-center space-x-2 sm:mt-4'>
        <h3 className='text-lg font-medium sm:text-xl lg:text-2xl'>{name}</h3>
        {!isPrivate && (
          <span>
            <LockClosedIcon className='h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8' />
          </span>
        )}
      </div>
      <p className='text-xs text-gray-400 sm:text-sm lg:text-base'>
        {posts} {posts === 1 ? 'video' : 'videos'}
      </p>
      <div className='mt-2 sm:mt-4 lg:mt-6'>
        {manageMode ? (
          <div className='flex'>
            <Button color='white-theme' onClick={deleteVideo} size='sm'>
              Delete
            </Button>
          </div>
        ) : (
          <>
            <Button
              onClick={() => setManageMode(true)}
              color='white'
              size='sm'
              className='flex items-center space-x-2 lg:hidden'
            >
              <Cog6ToothIcon className='h-4 w-4' />
              <span>Manage videos</span>
            </Button>
            <Button
              onClick={() => setManageMode(true)}
              color='white'
              className='hidden items-center space-x-2 lg:flex'
            >
              <Cog6ToothIcon className='h-5 w-5' />
              <span>Manage videos</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
