import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from 'next/navigation';

import useComments from '@/hooks/useComments';
import { useUser } from '@/hooks/useUser';

import Avatar from './Avatar';
import CommentReply from './PostCommentReply';
import ToggleButton from './ui/ToggleButton';

import type { Comment } from '@/model/post';

type Props = {
  comment: Comment;
};

export default function PostComment({ comment }: Props) {
  const { authorImage, authorUsername, text, likes, replies } = comment;
  const router = useRouter();
  const pathname = usePathname();
  const postId = pathname.split('/post/')[1];
  const { setLike } = useComments(postId);
  const { user } = useUser();
  const liked = user ? likes.includes(user.username) : false;
  const writtenByAuthor = authorUsername === user?.username;

  const handleLike = (isLiked: boolean) => {
    if (!user) return router.push('/signin', { scroll: false });
    setLike(comment, user.username, isLiked);
  };

  return (
    <>
      <div className='flex w-full items-center justify-between'>
        <div className='flex w-full'>
          <Avatar size='sm' image={authorImage} name={authorUsername} />
          <div className='ml-2 w-full'>
            <div className='flex w-full justify-between'>
              <div>
                <span className='font-medium text-gray-500'>
                  {authorUsername}
                </span>
                {writtenByAuthor && (
                  <span>
                    &nbsp;&middot;&nbsp;
                    <span className='text-theme-pink-100'>Author</span>
                  </span>
                )}
                <p>{text}</p>
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
            {replies.length > 0 && (
              <ul className='mt-4'>
                {replies.map((reply) => (
                  <CommentReply key={reply.key} reply={reply} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
