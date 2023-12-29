import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';

import { useUser } from '@/hooks/useUser';

import Avatar from './Avatar';
import { COMMENTS_LIST_ID } from './modal/CommentsModal';
import { REPLIES_LIST_ID } from './PostComment';

type Props = {
  mode?: 'reply' | 'comment';
  replyTarget?: { username: string; commentId: string };
  addReply?: (commentId: string, reply: string) => Promise<void>;
  addComment: (comment: string) => Promise<void>;
  hasTopBorder?: boolean;
  className?: string;
};

export default function CommentForm({
  mode = 'comment',
  replyTarget,
  addComment,
  addReply,
  hasTopBorder = true,
  className,
}: Props) {
  const { user } = useUser();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const username = replyTarget?.username ?? '';
  const commentId = replyTarget?.commentId ?? '';

  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToTop = () => {
    setTimeout(() => {
      const commentsListElem = document.getElementById(COMMENTS_LIST_ID);
      if (!commentsListElem) return;
      commentsListElem.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    }, 500);
  };

  const scrollToReply = () => {
    setTimeout(() => {
      const repliesListElem = document.getElementById(
        `${REPLIES_LIST_ID}-${commentId}`,
      );
      if (!repliesListElem) return;
      repliesListElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return router.push('/signin', { scroll: false });
    setLoading(true);
    mode === 'reply' && addReply
      ? await addReply(commentId, comment).then(() => scrollToReply())
      : await addComment(comment).then(() => scrollToTop());
    setComment('');
    setLoading(false);
  };

  useEffect(() => {
    if (mode === 'reply') {
      inputRef.current?.focus();
    }
  }, [mode]);

  return (
    <div
      className={clsx(
        'flex w-full items-center bg-white px-4 py-3',
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
          placeholder={
            mode === 'reply' ? `Reply to ${username}` : 'Add comment...'
          }
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
