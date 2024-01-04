import { useEffect, useRef, useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import { getPostsByCollectionId } from '@/lib/posts';
import { POLICY } from '@/policy';
import { VIDEO_SWR_KEY } from '@/swr';

import type { UserPost } from '@/model/post';

export default function useCollectionPosts(id: string) {
  // const { mutate, cache } = useSWRConfig();
  const [index, setIndex] = useState(1);
  const [posts, setPosts] = useState<UserPost[]>([]);
  const lastPostDateRef = useRef('0');

  const loadMore = () => setIndex((prev) => prev + 1);
  const isReachingEnd =
    posts.length === 0 || posts.length < index * POLICY.POST_FETCH_LIMIT;

  const { data, isLoading } = useSWRImmutable<UserPost[]>(
    `${VIDEO_SWR_KEY.GET_POSTS_BY_COLLECTION_ID}-${id}-${index}`,
    async () => await getPostsByCollectionId(id, lastPostDateRef.current),
  );

  useEffect(() => {
    if (posts.length > 0) {
      lastPostDateRef.current = posts[posts.length - 1].updatedAt;
    } else {
      lastPostDateRef.current = '0';
    }
  }, [posts]);

  useEffect(() => {
    if (!data) return;
    setPosts((prev) => [...prev, ...data]);
  }, [data]);

  return {
    posts,
    loadMore,
    loading: isLoading,
    isReachingEnd,
  };
}
