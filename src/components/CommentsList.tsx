import clsx from 'clsx';
import { InView } from 'react-intersection-observer';

import { usePostStore } from '@/context/PostContext';
import { SimplePost } from '@/model/post';

import PostComment from './PostComment';
import Loading from './ui/Loading';

type CommentListLocation = 'mobile-modal' | 'mobile-sidebar' | 'detail-page';

type Props = {
  post: SimplePost;
  location: CommentListLocation;
  className?: string;
};

export default function CommentsList({ post, location, className }: Props) {
  const { isReachingEnd, loading, loadMore, comments, setReplyTarget } =
    usePostStore();

  return (
    <ul
      className={clsx('overflow-y-auto bg-white', className)}
      onClick={() => location === 'mobile-modal' && setReplyTarget(null)}
    >
      {comments.map((comment) => (
        <li key={`${location}-${comment.id}`}>
          <PostComment comment={comment} post={post} />
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
