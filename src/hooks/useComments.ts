import useSWR from 'swr';

import { updateCommentLike } from '@/lib/posts/like';

import type { Comment } from '@/model/post';

export default function useComments(postId: string) {
  const {
    data: comments,
    isLoading,
    mutate,
  } = useSWR<Comment[]>(`/api/posts/${postId}/comments`);

  const setLike = async (comment: Comment, username: string, like: boolean) => {
    const newComment = {
      ...comment,
      likes: like
        ? [...comment.likes, username]
        : comment.likes.filter((item) => item !== username),
    };
    const newComments = comments?.map((c) =>
      c.key === comment.key ? newComment : c,
    );

    return mutate(updateCommentLike(postId, newComment.key, like), {
      optimisticData: newComments,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    }).catch(console.error);
  };

  return {
    comments,
    loading: isLoading,
    setLike,
  };
}
