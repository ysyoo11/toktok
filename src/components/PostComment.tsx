import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

import usePost from '@/hooks/usePost';
import useReplies from '@/hooks/useReplies';
import { useUser } from '@/hooks/useUser';

import Avatar from './Avatar';
import PostCommentReply from './PostCommentReply';
import Loading from './ui/Loading';
import ToggleButton from './ui/ToggleButton';

import type { Comment } from '@/model/post';

type Props = {
  comment: Comment;
  postId: string;
  setLike: (comment: Comment, username: string, like: boolean) => Promise<void>;
};

export default function PostComment({ comment, postId, setLike }: Props) {
  const {
    authorImage,
    authorUsername,
    text,
    likes,
    key: commentKey,
    totalReplies,
  } = comment;

  const {
    replies,
    loadMore,
    isReachingEnd,
    isLoading,
    setLike: setReplyLike,
  } = useReplies({
    postId,
    commentKey,
  });

  const router = useRouter();
  const { user } = useUser();
  const { post } = usePost(postId);

  if (!post) return <p>loading...</p>;
  const liked = user ? likes.includes(user.username) : false;
  const writtenByAuthor = authorUsername === post.authorUsername;

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
            {totalReplies > 0 && !isLoading && !isReachingEnd && (
              <button
                onClick={loadMore}
                disabled={isLoading}
                className='my-2 w-full py-1 text-start text-gray-500'
              >
                {!isLoading && `⸺ View ${totalReplies - replies.length} more`}
              </button>
            )}
            {isLoading && <Loading className='my-1 w-10' />}
          </div>
        </div>
      </div>
    </>
  );
}
