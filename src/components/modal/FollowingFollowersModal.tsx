import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Dispatch, Fragment, SetStateAction } from 'react';

import FollowingFollowersList from '../FollowingFollowersList';
import {
  ModalState,
  followingFollowersModalDisplayModes,
} from '../ProfileUserInfo';

type Props = {
  username: string;
  following: number;
  followers: number;
  setModalState: Dispatch<SetStateAction<ModalState>>;
  isOpen: boolean;
  onClose: () => void;
  type: 'followers' | 'following';
};

export default function FollowingFollowersModal({
  username: profileUsername,
  following,
  followers,
  setModalState,
  isOpen,
  onClose,
  type,
}: Props) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='fixed inset-0 z-10' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>

        <div className='fixed inset-0'>
          <div className='flex min-h-full items-center justify-center text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-200'
              enterFrom='opacity-0 translate-y-12'
              enterTo='opacity-100 translate-y-0'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-12'
            >
              <Dialog.Panel className='relative min-h-[24rem] w-4/5 transform overflow-hidden rounded-lg bg-white py-6 text-left align-middle shadow-xl transition-all sm:min-h-[32rem] sm:max-w-[480px] lg:min-h-[48rem]'>
                <Dialog.Title
                  as='h2'
                  className='text-center text-lg font-semibold sm:text-xl lg:text-2xl'
                >
                  {profileUsername}
                </Dialog.Title>
                <div className='flex w-full border-b'>
                  {followingFollowersModalDisplayModes.map((item, idx) => (
                    <button
                      key={`following-followers-tab-${idx}`}
                      className={clsx(
                        'w-full border-b-2 px-6 py-3 font-medium capitalize',
                        {
                          'border-b-gray-900 text-gray-900': type === item,
                          'border-b-transparent text-gray-500': type !== item,
                        },
                      )}
                      onClick={() =>
                        setModalState((prev) => ({ ...prev, type: item }))
                      }
                    >
                      {item}
                      <span className='pl-2'>
                        {item === 'following' ? following : followers}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={onClose}
                  className='absolute right-4 top-4 text-gray-600 transition-colors hover:text-gray-800'
                >
                  <XMarkIcon className='h-6 w-6' />
                </button>

                {followingFollowersModalDisplayModes.map((mode, idx) => (
                  <FollowingFollowersList
                    key={`${mode}-list-${idx}`}
                    originUsername={profileUsername}
                    type={mode}
                    className={type === mode ? 'block' : 'hidden'}
                  />
                ))}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
