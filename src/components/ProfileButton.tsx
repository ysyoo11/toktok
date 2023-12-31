'use client';

import { Menu, Transition } from '@headlessui/react';
import {
  ArrowRightOnRectangleIcon,
  MoonIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Fragment } from 'react';

import { useUser } from '@/hooks/useUser';
import { baseUrl } from '@/utils/env';

import Avatar from './Avatar';
import DarkModeToggle from './DarkModeToggle';

type Props = {
  image: string | undefined | null;
  name: string | undefined | null;
};

export default function ProfileButton({ image, name }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const menuItems = [
    {
      icon: UserIcon,
      text: 'View profile',
      onClick: () => router.push(`/${user?.username}`),
    },
  ];

  const logOut = () => {
    signOut({ callbackUrl: baseUrl + pathname });
  };

  return (
    <Menu as='div' className='relative'>
      <div className='flex items-center'>
        <Menu.Button className='w-full focus:outline-none'>
          {image ? (
            <Avatar image={image} name={name || 'a user'} size='sm' />
          ) : (
            <div className='h-10 w-10 rounded-full bg-gray-300' />
          )}
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
        <Menu.Items
          as='div'
          className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white p-1 shadow-lg ring-1 ring-black/5 focus:outline-none'
        >
          <div className='p-1'>
            <ul>
              {menuItems.map(({ onClick, text, ...menu }, idx) => (
                <Menu.Item as='li' key={`menu-item-${idx}`}>
                  <button
                    className='flex w-full items-center justify-between rounded-md p-3 hover:bg-gray-100'
                    onClick={onClick}
                  >
                    <div className='flex items-center space-x-2'>
                      <menu.icon className='h-5 w-5' />
                      <span>{text}</span>
                    </div>
                  </button>
                </Menu.Item>
              ))}
              <Menu.Item as='li'>
                <div className='flex w-full items-center justify-between rounded-md p-3 hover:bg-gray-100'>
                  <div className='flex items-center space-x-2'>
                    <MoonIcon className='h-5 w-5' />
                    <span>Dark mode</span>
                  </div>
                  <DarkModeToggle />
                </div>
              </Menu.Item>
            </ul>
          </div>
          <div className='p-1'>
            <Menu.Item>
              <button
                onClick={logOut}
                className='flex w-full items-center justify-between rounded-md p-3 hover:bg-gray-100'
              >
                <div className='flex items-center space-x-2'>
                  <ArrowRightOnRectangleIcon className='h-5 w-5 stroke-2' />
                  <span>Sign out</span>
                </div>
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
