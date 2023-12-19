'use client';

import {
  PaperAirplaneIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

import MenuButton from '@/components/MenuButton';
import { useUser } from '@/hooks/useUser';

import ProfileButton from '../ProfileButton';

export default function HeaderNav() {
  const { user } = useUser();

  return (
    <>
      <nav className='flex items-center space-x-5'>
        <Link href={user ? '/upload' : '/signin'} scroll={user ? true : false}>
          <VideoCameraIcon className='h-6 w-6 stroke-2' />
        </Link>
        <Link href={user ? '/message' : '/signin'} scroll={user ? true : false}>
          <PaperAirplaneIcon className='h-6 w-6 -translate-y-0.5 -rotate-45 stroke-2' />
        </Link>
        {user ? (
          <ProfileButton image={user.imageUrl} name={user.name} />
        ) : (
          <>
            <Link
              href='/signin'
              scroll={false}
              className='rounded bg-theme-pink-100 px-6 py-2 text-sm font-medium text-white hover:bg-theme-pink-200'
            >
              Log in
            </Link>

            <MenuButton />
          </>
        )}
      </nav>
    </>
  );
}
