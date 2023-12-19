import useSWR from 'swr';

import { SimplePost } from '@/model/post';

export default function usePost(postId: string) {
  const { data: post, isLoading } = useSWR<SimplePost>(`/api/posts/${postId}`);

  return {
    post,
    loading: isLoading,
  };
}
