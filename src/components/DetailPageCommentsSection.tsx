import { usePostStore } from '@/context/PostContext';
import { SimplePost } from '@/model/post';

import CommentForm from './CommentForm';
import DetailPageCommentsList from './DetailPageCommentsList';

type Props = {
  post: SimplePost;
};

export default function DetailPageCommentsSection({ post }: Props) {
  const { addComment } = usePostStore();

  return (
    <section className='mt-4'>
      <div className='my-6 h-[1.5px] bg-gray-200' />
      <p className='mb-2 text-lg font-semibold'>
        {post.comments} {post.comments === 1 ? 'comment' : 'comments'}
      </p>
      <CommentForm addComment={addComment} hasTopBorder={false} />
      <div className='my-4 h-[1.5px] bg-gray-200' />
      <DetailPageCommentsList post={post} />
    </section>
  );
}
