'use client';

import Button from '@/components/ui/Button';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function CollectionError({ error, reset }: Props) {
  return (
    <div>
      <h2 className='text-2xl font-semibold'>Something went wrong 🥲</h2>
      <p className='text-lg'>{error.message}</p>
      <Button onClick={() => reset()} className='mt-20'>
        Try again
      </Button>
    </div>
  );
}
