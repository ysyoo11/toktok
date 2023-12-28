import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import usePosts from '@/hooks/usePosts';
import { useUser } from '@/hooks/useUser';

import ToggleButton from './ui/ToggleButton';

import type { SimplePost } from '@/model/post';

type Props = {
  post: SimplePost;
  horizontal?: boolean;
  className?: string;
};

export default function PostEngagementBar({
  post,
  horizontal = false,
  className,
}: Props) {
  const { likes, comments } = post;

  const listClassName = `flex ${
    horizontal ? 'flex-row space-x-1' : 'flex-col'
  } items-center`;
  const figureClassName = `${
    horizontal ? 'text-xs' : 'text-sm'
  } font-semibold text-gray-600`;

  const { user } = useUser();
  const liked = user ? likes.includes(user.username) : false;
  const router = useRouter();

  const [isSaved, setIsSaved] = useState(false);

  const { setLike } = usePosts();

  const handleLike = async (isLiked: boolean) => {
    if (!user) return router.push('/signin', { scroll: false });

    setLike(post, user.username, isLiked);
  };

  const onCommentClick = () => {
    router.push(`/post/${post.id}`, { scroll: false });
  };

  // TODO:
  const handleSave = () => {};

  return (
    <ul
      className={clsx(
        'flex px-4',
        horizontal ? 'flex-row space-x-3' : 'flex-col',
        className,
      )}
    >
      <li className={listClassName}>
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={
            <HeartIcon
              className={clsx('h-5 w-5 text-red-500', {
                'sm:h-7 sm:w-7': !horizontal,
              })}
            />
          }
          offIcon={
            <HeartIcon
              className={clsx('h-5 w-5', {
                'sm:h-7 sm:w-7': !horizontal,
              })}
            />
          }
          wrapped
          horizontal={horizontal}
        />
        <span className={figureClassName}>{likes.length}</span>
      </li>
      <li className={listClassName}>
        <button
          onClick={onCommentClick}
          className={clsx('rounded-full bg-gray-100 p-2', {
            'p-1.5 sm:p-2.5': !horizontal,
          })}
        >
          <ChatBubbleOvalLeftEllipsisIcon
            className={clsx('h-5 w-5', {
              'sm:h-7 sm:w-7': !horizontal,
            })}
          />
        </button>
        <span className={figureClassName}>{comments}</span>
      </li>
      <li className={listClassName}>
        <ToggleButton
          toggled={isSaved}
          onToggle={setIsSaved}
          onIcon={
            <BookmarkIcon
              className={clsx('h-5 w-5 text-yellow-500', {
                'sm:h-7 sm:w-7': !horizontal,
              })}
            />
          }
          offIcon={
            <BookmarkIcon
              className={clsx('h-5 w-5', {
                'sm:h-7 sm:w-7': !horizontal,
              })}
            />
          }
          wrapped
          horizontal={horizontal}
        />
        <span className={figureClassName}>0</span>
      </li>
    </ul>
  );
}
