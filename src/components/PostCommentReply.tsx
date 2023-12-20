import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

import { useUser } from '@/hooks/useUser';

import Avatar from './Avatar';
import ToggleButton from './ui/ToggleButton';

import type { Reply } from '@/model/post';

type Props = {
  reply: Reply;
  postAuthorUsername: string;
  setLike: (reply: Reply, username: string, like: boolean) => Promise<void>;
};

export default function PostCommentReply({
  reply,
  postAuthorUsername,
  setLike,
}: Props) {
  const { authorImage, authorUsername, text, likes, key } = reply;
  const router = useRouter();
  const { user } = useUser();
  const liked = user ? likes.includes(user.username) : false;
  const writtenByAuthor = authorUsername === postAuthorUsername;

  const handleLike = (isLiked: boolean) => {
    if (!user) return router.push('/signin', { scroll: false });
    setLike(reply, user.username, isLiked);
  };

  return (
    <div className='flex w-full'>
      <div className='flex w-full justify-between'>
        <div className='flex justify-between'>
          <Avatar size='xs' image={authorImage} name={authorUsername} />
          <div className='ml-2'>
            <span className='font-medium text-gray-500'>{authorUsername}</span>
            {writtenByAuthor && (
              <span>
                &nbsp;&middot;&nbsp;
                <span className='text-theme-pink-100'>Author</span>
              </span>
            )}
            <p>{text}</p>
          </div>
        </div>

        <div className='flex items-center space-x-1'>
          <ToggleButton
            toggled={liked}
            onToggle={handleLike}
            onIcon={<SolidHeartIcon className='h-5 w-5 text-red-500' />}
            offIcon={<HeartIcon className='h-5 w-5 text-gray-400' />}
          />
          <span className='text-gray-400'>{likes.length}</span>
        </div>
      </div>
    </div>
  );
}
