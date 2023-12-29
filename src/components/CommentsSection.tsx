import { useState } from 'react';

import { usePostStore } from '@/context/PostContext';
import { SimplePost } from '@/model/post';

import CommentForm from './CommentForm';
import CommentsList from './CommentsList';

type Props = {
  post: SimplePost;
};

export default function CommentsSection({ post }: Props) {
  const { comments, setLike, addComment, addReply } = usePostStore();

  const [mode, setMode] = useState<'comment' | 'reply'>('comment');
  const [replyTarget, setReplyTarget] = useState<{
    username: string;
    commentId: string;
  }>({ username: '', commentId: '' });

  return (
    <>
      <CommentsList
        post={post}
        setMode={setMode}
        setReplyTarget={setReplyTarget}
        setLike={setLike}
        comments={comments}
        className='px-6 pt-1'
      />
      <CommentForm
        mode={mode}
        replyTarget={replyTarget}
        addComment={addComment}
        addReply={addReply}
        className='sticky bottom-0'
      />
    </>
  );
}
