import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';

import { usePostStore } from '@/context/PostContext';
import { useUser } from '@/hooks/useUser';

import Avatar from './Avatar';

type Props = {
  hasTopBorder?: boolean;
  className?: string;
};

export default function CommentForm({ hasTopBorder = true, className }: Props) {
  const { user } = useUser();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { replyTarget, addComment, addReply } = usePostStore();

  const username = replyTarget?.username ?? '';
  const commentId = replyTarget?.commentId ?? '';

  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return router.push('/signin', { scroll: false });
    setLoading(true);
    replyTarget
      ? await addReply(commentId, comment)
      : await addComment(comment);
    setComment('');
    setLoading(false);
  };

  useEffect(() => {
    if (replyTarget) {
      inputRef.current?.focus();
    }
  }, [replyTarget]);

  return (
    <div
      className={clsx(
        'flex w-full items-center bg-white py-3',
        {
          'border-t': hasTopBorder,
        },
        className,
      )}
    >
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
          ref={inputRef}
          type='text'
          className='w-full rounded-full bg-gray-100 px-4 py-2 focus:bg-white'
          placeholder={replyTarget ? `Reply to ${username}` : 'Add comment...'}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          disabled={loading}
          required
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
