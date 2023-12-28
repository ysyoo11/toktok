import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';
import { InView } from 'react-intersection-observer';

import { usePostStore } from '@/context/PostContext';
import { Comment, SimplePost } from '@/model/post';

import { COMMENTS_LIST_ID } from './modal/CommentsModal';
import PostComment from './PostComment';
import Loading from './ui/Loading';

type Props = {
  post: SimplePost;
  setMode: Dispatch<SetStateAction<'comment' | 'reply'>>;
  setReplyTarget: Dispatch<
    SetStateAction<{
      username: string;
      commentId: string;
    }>
  >;
  setLike: (comment: Comment, username: string, like: boolean) => Promise<void>;
  comments: Comment[];
  className?: string;
};

export default function CommentsList({
  post,
  setMode,
  setReplyTarget,
  setLike,
  comments,
  className,
}: Props) {
  const { isReachingEnd, loading, loadMore } = usePostStore();
  return (
    <ul
      className={clsx('overflow-y-auto bg-white', className)}
      id={COMMENTS_LIST_ID}
    >
      {comments.map((comment) => (
        <li key={`pc-${comment.id}`}>
          <PostComment
            comment={comment}
            setLike={setLike}
            post={post}
            setMode={setMode}
            setReplyTarget={setReplyTarget}
          />
        </li>
      ))}
      {loading && <Loading className='w-12' />}
      {!isReachingEnd && (
        <div className='py-2'>
          <InView
            as='div'
            rootMargin='24px'
            onChange={(inView) => {
              if (inView) loadMore();
            }}
          />
        </div>
      )}
    </ul>
  );
}
