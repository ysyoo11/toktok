import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import NewCollectionModal from './modal/NewCollectionModal';

type Props = {
  username: string;
};

export default function ProfileCollectionsSection({ username }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className='mt-2 lg:mt-4'>
        <ul className='grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
          <li className='h-full w-full'>
            <button
              onClick={() => setShowModal(true)}
              className='group flex h-72 w-full flex-col items-center justify-center rounded-lg border-2 border-gray-400/60 text-gray-400 hover:border-black/60 hover:text-black'
            >
              <PlusCircleIcon className='h-10 w-10 stroke-[0.5px] group-hover:text-theme-pink-100' />
              <span>Create new collection</span>
            </button>
          </li>
        </ul>
      </section>
      <NewCollectionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
