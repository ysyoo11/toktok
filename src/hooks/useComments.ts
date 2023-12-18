import useSWRImmutable from 'swr/immutable';

import { Comment } from '@/model/post';

export default function useComments(postId: string) {
  const {
    data: comments,
    mutate,
    isLoading,
  } = useSWRImmutable<Comment[]>(`/api/posts/${postId}/comments`);

  // TODO:
  const setLike = async (
    comment: Comment,
    username: string,
    like: boolean,
  ) => {};

  return {
    comments,
    mutate,
    loading: isLoading,
    setLike,
  };
}
