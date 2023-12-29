import { InView } from 'react-intersection-observer';

import { usePostStore } from '@/context/PostContext';
import { SimplePost } from '@/model/post';

import DetailPagePostComment from './DetailPagePostComment';
import Loading from './ui/Loading';

type Props = {
  post: SimplePost;
};

export default function DetailPageCommentsList({ post }: Props) {
  const { comments, isReachingEnd, loading, loadMore } = usePostStore();

  return (
    <ul className='overflow-y-auto bg-white'>
      {comments.map((comment) => (
        <li key={`pc-${comment.id}`}>
          <DetailPagePostComment comment={comment} post={post} />
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
