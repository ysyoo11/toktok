import useSWR from 'swr';

import { updateLike } from '@/lib/posts/like';
import { SimplePost } from '@/model/post';

export default function usePost(postId: string) {
  const {
    data: post,
    isLoading,
    mutate,
  } = useSWR<SimplePost>(`/api/posts/${postId}`, () =>
    fetch(`/api/posts/${postId}`, { cache: 'no-cache' }).then((res) =>
      res.json(),
    ),
  );

  const setLike = async (post: SimplePost, username: string, like: boolean) => {
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username]
        : post.likes.filter((item) => item !== username),
    };

    return mutate(updateLike(post.id, like), {
      optimisticData: newPost,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    }).catch(console.error);
  };

  return {
    post,
    setLike,
    loading: isLoading,
  };
}
