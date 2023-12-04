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

export default function HeaderNav() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className='flex items-center space-x-5'>
        <Link href='/upload'>
          <VideoCameraIcon className='h-6 w-6 stroke-2' />
        </Link>
        <Link href='/message'>
          <PaperAirplaneIcon className='h-6 w-6 -rotate-45 stroke-2' />
        </Link>
        <Button onClick={() => setShowModal(true)}>Log in</Button>
        <MenuButton />
      </nav>
      <LoginModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
