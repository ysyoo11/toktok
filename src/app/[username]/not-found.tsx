import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='mt-4'>
      <h2 className='mb-10 text-2xl font-semibold'>User Not Found 😕</h2>
      <Link
        className='rounded bg-theme-pink-100 px-4 py-2 text-white hover:bg-theme-pink-200'
        href='/'
      >
        Return Home
      </Link>
    </div>
  );
}
