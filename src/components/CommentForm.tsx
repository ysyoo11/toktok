import { useState } from 'react';

import { useUser } from '@/hooks/useUser';

import Avatar from './Avatar';

export default function CommentForm() {
  const { user } = useUser();
  const [comment, setComment] = useState('');

  const onSubmit = () => {};

  return (
    <div className='flex items-center border-t px-4 pt-4'>
      <Avatar
        image={user ? user.imageUrl : ''}
        name={user ? user.username : ''}
        size='sm'
      />
      <form
        action='submit'
        onSubmit={onSubmit}
        className='ml-2 flex w-full items-center'
      >
        <input
          type='text'
          className='w-full rounded-full bg-gray-100 px-4 py-2 focus:bg-white'
          placeholder='Add comment...'
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button
          disabled={comment === ''}
          className='p-2 font-medium text-theme-pink-100 hover:text-theme-pink-200 disabled:text-gray-300'
        >
          Post
        </button>
      </form>
    </div>
  );
}
