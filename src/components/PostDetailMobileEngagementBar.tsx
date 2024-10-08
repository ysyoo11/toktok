import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';

import usePosts from '@/hooks/usePosts';
import { useUser } from '@/hooks/useUser';

import AvatarFollowButton from './AvatarFollowButton';
import CommentsModal from './modal/CommentsModal';
import ToggleButton from './ui/ToggleButton';

import type { SimplePost } from '@/model/post';

type Props = {
  post: SimplePost;
};

export default function PostDetailMobileEngagementBar({ post }: Props) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const { likes, comments, authorImage, authorUsername, id } = post;

  const router = useRouter();
  const { user } = useUser();
  const { setLike } = usePosts();
  const liked = user ? likes.includes(user.username) : false;

  const handleLike = async (isLiked: boolean) => {
    if (!user) return router.push('/signin', { scroll: false });
    setLike(post, user.username, isLiked);
  };

  const openComments = (e: MouseEvent) => {
    e.stopPropagation();
    if (!user) return router.push('/signin', { scroll: false });
    setShowComments(true);
  };

  const handleSave = () => {};

  return (
    <div className='basis-1/5 pb-2'>
      <ul className='flex flex-col items-center space-y-3'>
        <li>
          <AvatarFollowButton
            user={user}
            targetUserImage={authorImage}
            targetUsername={authorUsername}
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
          <button onClick={openComments}>
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
      <CommentsModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        post={post}
        totalComments={comments}
      />
    </div>
  );
}
