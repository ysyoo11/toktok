import useSWR from 'swr';

import { updateLike } from '@/lib/posts/like';
import { SimplePost } from '@/model/post';

export default function usePosts() {
  const { data: posts, isLoading, mutate } = useSWR<SimplePost[]>('/api/posts');

  const setLike = async (post: SimplePost, username: string, like: boolean) => {
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username]
        : post.likes.filter((item) => item !== username),
    };
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return {
    posts,
    setLike,
    isLoading,
  };
}
