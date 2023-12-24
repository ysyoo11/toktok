import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { useUser } from '@/hooks/useUser';
import { postComment } from '@/lib/posts/comments';

import Avatar from './Avatar';

type Props = {
  postId: string;
};

export default function CommentForm({ postId }: Props) {
  const { user } = useUser();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return router.push('/signin', { scroll: false });
    setLoading(true);
    await postComment({ postId, comment })
      .then(() => {
        // TODO: Show noti
        setComment('');
      })
      .catch((err) => {
        // TODO: Show noti
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

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
          disabled={loading}
        />
        <button
          disabled={comment === '' || loading}
          className='p-2 font-medium text-theme-pink-100 hover:text-theme-pink-200 disabled:text-gray-300'
        >
          Post
        </button>
      </form>
    </div>
  );
}
