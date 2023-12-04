import { MusicalNoteIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/' className='flex w-max items-center space-x-1'>
      <MusicalNoteIcon className='h-6 w-6 stroke-[2.5px]' />
      <span className='text-2xl font-bold'>TokTok</span>
    </Link>
  );
}
