import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { format } from 'timeago.js';

import { usePostStore } from '@/context/PostContext';
import useReplies from '@/hooks/useReplies';
import { useUser } from '@/hooks/useUser';

import Avatar from './Avatar';
import PostCommentReply from './PostCommentReply';
import Loading from './ui/Loading';
import ToggleButton from './ui/ToggleButton';

import type { Comment, SimplePost } from '@/model/post';

type Props = {
  comment: Comment;
  post: SimplePost;
};

export default function PostComment({ comment, post }: Props) {
  const {
    authorImage,
    authorUsername,
    text,
    likes,
    id: commentId,
    createdAt,
    totalReplies: commentTotalReplies,
  } = comment;

  const { setLike, setReplyTarget } = usePostStore();
  const {
    replies,
    loadMore,
    isReachingEnd,
    loading,
    setLike: setReplyLike,
  } = useReplies({
    post,
    commentId,
  });

  const router = useRouter();
  const { user } = useUser();

  const liked = user ? likes.includes(user.username) : false;
  const writtenByAuthor = authorUsername === post.authorUsername;

  const handleLike = (isLiked: boolean) => {
    if (!user) return router.push('/signin', { scroll: false });
    setLike(comment, user.username, isLiked);
  };

  return (
    <div className='flex w-full items-center justify-between xs:py-2'>
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
          <div className='flex items-center space-x-2'>
            <span className='text-xs text-gray-400'>{format(createdAt)}</span>
            <button
              className='text-sm text-gray-500'
              onClick={(e) => {
                e.stopPropagation();
                setReplyTarget({ username: authorUsername, commentId });
              }}
            >
              Reply
            </button>
          </div>
          {replies.length > 0 && (
            <ul className='mt-4 w-full space-y-4'>
              {replies.map((reply) => (
                <PostCommentReply
                  key={reply.key}
                  reply={reply}
                  postAuthorUsername={post.authorUsername}
                  setLike={setReplyLike}
                />
              ))}
            </ul>
          )}
          {commentTotalReplies - replies.length > 0 &&
            !loading &&
            !isReachingEnd && (
              <button
                onClick={loadMore}
                disabled={loading}
                className='my-2 w-full py-1 text-start text-gray-500'
              >
                {!loading &&
                  `⸺ View ${commentTotalReplies - replies.length} more`}
              </button>
            )}
          {loading && <Loading className='my-1 w-10' />}
        </div>
      </div>
    </div>
  );
}
