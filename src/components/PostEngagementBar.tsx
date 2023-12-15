import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import usePosts from '@/hooks/use-posts';
import { useUser } from '@/hooks/use-user';

import ToggleButton from './ui/ToggleButton';

import type { SimplePost } from '@/model/post';

type Props = {
  post: SimplePost;
};

export default function PostEngagementBar({ post }: Props) {
  const { likes, comments } = post;

  const { user } = useUser();
  const liked = user ? likes.includes(user.username) : false;
  const router = useRouter();

  const [isSaved, setIsSaved] = useState(false);

  const { setLike } = usePosts();

  const handleLike = async (isLiked: boolean) => {
    if (!user) return router.push('/signin');

    setLike(post, user.username, isLiked);
  };

  const handleComment = () => {
    // TODO: open post detail modal
  };

  // TODO:
  const handleSave = () => {};

  return (
    <ul className='flex flex-col px-4'>
      <li className='flex flex-col items-center'>
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartIcon className='h-5 w-5 text-red-500 sm:h-7 sm:w-7' />}
          offIcon={<HeartIcon className='h-5 w-5 sm:h-7 sm:w-7' />}
          wrapped
        />
        <span className='text-sm font-semibold text-gray-600'>
          {likes.length}
        </span>
      </li>
      <li className='flex flex-col items-center'>
        <button className='rounded-full bg-gray-100 p-1.5 sm:p-2.5'>
          <ChatBubbleOvalLeftEllipsisIcon className='h-5 w-5 sm:h-7 sm:w-7' />
        </button>
        <span className='text-sm font-semibold text-gray-600'>{comments}</span>
      </li>
      <li className='flex flex-col items-center'>
        <ToggleButton
          toggled={isSaved}
          onToggle={setIsSaved}
          onIcon={
            <BookmarkIcon className='h-5 w-5 text-yellow-500 sm:h-7 sm:w-7' />
          }
          offIcon={<BookmarkIcon className='h-5 w-5 sm:h-7 sm:w-7' />}
          wrapped
        />
        <span className='text-sm font-semibold text-gray-600'>0</span>
      </li>
    </ul>
  );
}
