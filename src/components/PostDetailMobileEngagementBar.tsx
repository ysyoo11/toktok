import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import usePosts from '@/hooks/use-posts';
import { useUser } from '@/hooks/use-user';

import PostDetailMobileFollowButton from './PostDetailMobileFollowButton';
import ToggleButton from './ui/ToggleButton';

import type { SimplePost } from '@/model/post';

type Props = {
  post: SimplePost;
};

export default function PostDetailMobileEngagementBar({ post }: Props) {
  const { likes, comments, authorImage, authorUsername } = post;

  const router = useRouter();
  const { user } = useUser();
  const { setLike } = usePosts();
  const liked = user ? likes.includes(user.username) : false;
  const isFollowed = false; // TODO:

  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = async (isLiked: boolean) => {
    if (!user) return router.push('/signin', { scroll: false });
    setLike(post, user.username, isLiked);
  };

  const handleSave = () => {};

  const handleFollow = () => {};

  return (
    <ul className='flex flex-col items-center space-y-3'>
      <li>
        <PostDetailMobileFollowButton
          onClick={handleFollow}
          image={authorImage}
          username={authorUsername}
          isFollowed={isFollowed}
        />
      </li>
      <li className='flex flex-col items-center'>
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartIcon className='h-9 w-9 text-red-500' />}
          offIcon={<HeartIcon className='h-9 w-9 text-white' />}
        />
        <span className='text-sm text-white'>{likes.length}</span>
      </li>
      <li className='flex flex-col items-center'>
        <button>
          <ChatBubbleOvalLeftEllipsisIcon className='h-9 w-9 text-white' />
        </button>
        <span className='text-sm text-white'>{comments}</span>
      </li>
      <li className='flex flex-col items-center'>
        <ToggleButton
          toggled={isBookmarked}
          onToggle={handleLike}
          onIcon={<BookmarkIcon className='h-9 w-9 text-yellow-400' />}
          offIcon={<BookmarkIcon className='h-9 w-9 text-white' />}
        />
        <span className='text-sm text-white'>0</span>
      </li>
    </ul>
  );
}
