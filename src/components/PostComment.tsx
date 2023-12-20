import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

import useComments from '@/hooks/useComments';
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
};

export default function PostComment({ comment, postId }: Props) {
  const {
    authorImage,
    authorUsername,
    text,
    likes,
    key: commentKey,
    totalReplies,
  } = comment;

  const { replies, loadMore, isEmpty, isReachingEnd, isLoading } = useReplies({
    postId,
    commentKey,
  });

  const router = useRouter();
  const { setLike } = useComments(postId);
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
                  />
                ))}
              </ul>
            )}
            {!isEmpty && !isLoading && !isReachingEnd && (
              <button
                onClick={loadMore}
                className='mt-2 w-full py-1 text-start text-gray-500'
              >
                &mdash;&nbsp;View {totalReplies - replies.length} more
              </button>
            )}
            {/* TODO: Create better loading state UI */}
            {isLoading && <Loading className='w-10' />}
          </div>
        </div>
      </div>
    </>
  );
}
