'use client';

import { notFound } from 'next/navigation';
import { useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import CollectionInfo from '@/components/CollectionInfo';
import ProfilePostsGrid from '@/components/ProfilePostsGrid';
import SkeletonProfileCards from '@/components/skeleton/SkeletonProfileCards';
import SkeletonText from '@/components/skeleton/SkeletonText';
import useCollectionPosts from '@/hooks/useCollectionPosts';
import { useUser } from '@/hooks/useUser';
import { getCollectionById } from '@/lib/collections';
import { Collection } from '@/model/collection';
import { USER_SWR_KEY } from '@/swr';

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

  const { user, isLoading: userLoading } = useUser();

  const { data: collection, isLoading } = useSWRImmutable<Collection>(
    !userLoading && `${USER_SWR_KEY.GET_COLLECTION_BY_ID}-${username}-${id}`,
    async () => await getCollectionById(id),
  );

  const { posts, loading, loadMore, isReachingEnd } = useCollectionPosts(id);

  const isBlocked =
    !userLoading &&
    collection &&
    collection.isPrivate &&
    (user?.username !== username || !user);

  if (isLoading || !collection)
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
      <CollectionInfo
        username={username}
        collection={collection}
        manageMode={manageMode}
        setManageMode={setManageMode}
      />
      <ProfilePostsGrid
        posts={posts}
        isReachingEnd={isReachingEnd}
        loading={loading}
        loadMore={loadMore}
      />
    </>
  );
}
