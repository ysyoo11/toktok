'use client';

import { LockClosedIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { InView } from 'react-intersection-observer';

import ProfilePostCard from '@/components/ProfilePostCard';
import SkeletonProfileCards from '@/components/skeleton/SkeletonProfileCards';
import SkeletonText from '@/components/skeleton/SkeletonText';
import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import useCollection from '@/hooks/useCollection';

type Props = {
  params: {
    username: string;
    id: string;
  };
};

export default function CollectionDetailPage({
  params: { username, id },
}: Props) {
  const [manageMode, setManageMode] = useState(false);

  const {
    posts,
    name,
    loading,
    isReachingEnd,
    loadMore,
    isBlocked,
    isPrivate,
  } = useCollection(username, id);

  const deleteVideo = () => {
    setManageMode(false);
  };

  if (posts.length === 0 && loading)
    return (
      <>
        <div className='border-b py-4 sm:py-8'>
          <SkeletonText className='my-2 w-40' />
          <div className='sm:mt-4'>
            <SkeletonText className='mt-2 w-44' textSize='lg' />
          </div>
          <SkeletonText className='mt-3 w-20' />
          <div className='mt-2 sm:mt-4 lg:mt-6'>
            <SkeletonText className='w-40' textSize='xl' />
          </div>
        </div>
        <SkeletonProfileCards className='sm:mt-6' />
      </>
    );
  if (isBlocked) notFound();

  return (
    <>
      <div className='border-b py-4 sm:py-8'>
        <Link
          href={`/${username}/collections`}
          className='flex w-max items-center space-x-2 py-2 pr-2 text-gray-500 hover:text-gray-900'
        >
          <ChevronLeftIcon className='h-5 w-5 stroke-2 sm:h-6 sm:w-6' />
          <span className='hidden sm:block lg:text-lg'>
            See all collections
          </span>
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
          {posts.length} {posts.length === 1 ? 'video' : 'videos'}
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
      <section className='mt-6 lg:mt-10'>
        <ul className='grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
          {posts.map((post) => (
            <li key={`user-post-${post.id}`}>
              <ProfilePostCard post={post} />
            </li>
          ))}
        </ul>
        {loading && <Loading className='w-12 py-20' />}
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
    </>
  );
}
