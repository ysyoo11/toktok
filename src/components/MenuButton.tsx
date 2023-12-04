import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon, MoonIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Fragment } from 'react';

import DarkModeToggle from './DarkModeToggle';

type Props = {
  className?: string;
};

export default function MenuButton({ className }: Props) {
  return (
    <Menu
      as='div'
      className={clsx('relative inline-block text-left', className)}
    >
      <div>
        <Menu.Button className='flex w-full items-center justify-center font-medium'>
          <EllipsisVerticalIcon className='h-6 w-6' />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
          <div className='p-1'>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100' : 'text-gray-900'
                  } group flex w-full items-center justify-between rounded-md px-2 py-2`}
                >
                  <div className='flex items-center space-x-2'>
                    <MoonIcon className='h-5 w-5' />
                    <span>Dark mode</span>
                  </div>
                  <DarkModeToggle />
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
