'use client';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FormEvent, Fragment, useState } from 'react';

import { createCollection } from '@/lib/collections';
import { RULES } from '@/rules';

import Button from '../ui/Button';
import Input from '../ui/Input';
import ToggleSwitch from '../ui/ToggleSwitch';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NewCollectionModal({ isOpen, onClose }: Props) {
  const [name, setName] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await createCollection(name, isPrivate) //
      .then(() => {
        // TODO: mutate
      })
      .finally(() => {
        setLoading(false);
        onClose();
      });
  };

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
              <Dialog.Panel className='relative w-4/5 transform overflow-hidden rounded-lg bg-white px-10 py-6 text-left align-middle shadow-xl transition-all sm:max-w-[480px]'>
                <Dialog.Title as='h2' className='text-xl font-semibold'>
                  New Collection
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className='absolute right-4 top-4 text-gray-600 transition-colors hover:text-gray-800'
                >
                  <XMarkIcon className='h-6 w-6' />
                </button>

                <form action='submit' onSubmit={onSubmit} className='mt-6'>
                  <Input
                    value={name}
                    label='name'
                    maxLength={RULES.COLLECTION_MAX_CHAR}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                  />
                  <div className='mt-4 flex w-full justify-between'>
                    <span className='font-medium'>Make public</span>
                    <ToggleSwitch
                      checked={!isPrivate}
                      setChecked={() => setIsPrivate((prev) => !prev)}
                      toggleObject='public/private'
                    />
                  </div>
                  <Button
                    full
                    className='mt-8'
                    disabled={loading || name === ''}
                  >
                    {loading ? 'Creating...' : 'Create'}
                  </Button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
