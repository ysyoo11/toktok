'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { InView } from 'react-intersection-observer';

import useCollections from '@/hooks/useCollections';
import { AuthUser } from '@/model/user';

import CollectionCard from './CollectionCard';
import NewCollectionModal from './modal/NewCollectionModal';
import Loading from './ui/Loading';

type Props = {
  authUser: AuthUser | undefined;
  username: string;
};

export default function ProfileCollectionSection({
  authUser,
  username,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const { collections, isReachingEnd, loadMore, loading, createNewCollection } =
    useCollections(username);

  const isMyPage = authUser ? authUser.username === username : false;

  return (
    <>
      <section className='mt-2 lg:mt-4'>
        <ul className='grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
          {isMyPage && (
            <li className='h-full w-full'>
              <button
                onClick={() => setShowModal(true)}
                className='group flex aspect-[4/6] w-full flex-col items-center justify-center rounded-lg border-2 border-gray-400/60 text-gray-400 hover:border-black/60 hover:text-black'
              >
                <div className='relative h-16 w-16 rounded-full bg-theme-pink-100/30'>
                  <div className='absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-theme-pink-100/90'>
                    <PlusIcon className='absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 stroke-2 text-white' />
                  </div>
                </div>
                <div className='mt-2 rounded-full border border-gray-300 px-2 py-0.5 text-xs'>
                  Create collection
                </div>
              </button>
            </li>
          )}
          {collections.map((collection) => (
            <li key={`user-collection-${collection.id}`}>
              <CollectionCard username={username} collection={collection} />
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
      <NewCollectionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        createNewCollection={createNewCollection}
      />
    </>
  );
}
