import useSWRImmutable from 'swr/immutable';

import { SimplePost } from '@/model/post';

export default function usePost(postId: string) {
  const { data: post, isLoading } = useSWRImmutable<SimplePost>(
    `/api/posts/${postId}`,
  );

  return {
    post,
    loading: isLoading,
  };
}
