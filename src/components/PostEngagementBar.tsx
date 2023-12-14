import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { useUser } from '@/hooks/use-user';
import { likeVideo } from '@/lib/posts/like';

import ToggleButton from './ui/ToggleButton';

import type { SimplePost } from '@/model/post';

type Props = {
  post: SimplePost;
};

export default function PostEngagementBar({ post }: Props) {
  const { likes, author, caption, createdAt, id, comments } = post;

  const { uid } = useUser();
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // 1. if user is not logged in, router.push('/signin') ✅
  // 2. if (!isLiked) add like to the video ✅
  // 3. if (isLiked) delete like from the video ✅
  // 4. return `isLikeByUser` from server ✅
  // 5. mutate like/unlike properly

  const handleLike = useCallback(async () => {
    if (!uid) return router.push('/signin');

    setIsLiked((prev) => !prev);
    if (isLiked) {
      await likeVideo(id, false);
    } else {
      await likeVideo(id, true);
    }
  }, [uid, router, id, isLiked]);

  const handleComment = () => {};
  const handleSave = () => {};

  return (
    <ul className='flex flex-col px-4'>
      <li className='flex flex-col items-center'>
        <ToggleButton
          toggled={isLiked}
          onToggle={setIsLiked}
          onIcon={<HeartIcon className='h-5 w-5 text-red-500 sm:h-7 sm:w-7' />}
          offIcon={<HeartIcon className='h-5 w-5 sm:h-7 sm:w-7' />}
          wrapped
        />
        <span className='text-sm font-semibold text-gray-600'>0</span>
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
