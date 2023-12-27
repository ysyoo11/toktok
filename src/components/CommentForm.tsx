import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';

import useReplies from '@/hooks/useReplies';
import { useUser } from '@/hooks/useUser';
import { SimplePost } from '@/model/post';

import Avatar from './Avatar';
import { COMMENTS_LIST_ID } from './modal/CommentsModal';

type Props = {
  post: SimplePost;
  mode: 'reply' | 'comment';
  replyTarget: { username: string; commentId: string };
  addComment: (comment: string) => Promise<void>;
};

export default function CommentForm({
  post,
  mode,
  replyTarget: { username, commentId },
  addComment,
}: Props) {
  const { user } = useUser();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const { addReply } = useReplies({ post, commentId });

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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return router.push('/signin', { scroll: false });
    setLoading(true);
    if (mode === 'reply') {
      await addReply(commentId, comment);
    } else {
      await addComment(comment) //
        .then(() => scrollToTop());
    }
    setComment('');
    setLoading(false);
  };

  useEffect(() => {
    if (mode === 'reply') {
      inputRef.current?.focus();
    }
  }, [mode]);

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
