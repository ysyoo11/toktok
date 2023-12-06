'use client';

import {
  PaperAirplaneIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

import LoginModal from '@/components/LoginModal';
import MenuButton from '@/components/MenuButton';
import Button from '@/components/ui/Button';
import { useUser } from '@/hooks/use-user';

import ProfileButton from '../ProfileButton';

export default function HeaderNav() {
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser();

  return (
    <>
      <nav className='flex items-center space-x-5'>
        <Link href='/upload'>
          <VideoCameraIcon className='h-6 w-6 stroke-2' />
        </Link>
        <Link href='/message'>
          <PaperAirplaneIcon className='h-6 w-6 -translate-y-0.5 -rotate-45 stroke-2' />
        </Link>
        {user ? (
          <ProfileButton image={user.imageURL} name={user.name} />
        ) : (
          <>
            <Button onClick={() => setShowModal(true)}>Log in</Button>
            <MenuButton />
          </>
        )}
      </nav>
      <LoginModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
