import { useEffect, useRef, useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import { getPostsByUsername } from '@/lib/posts';
import { UserPost } from '@/model/post';
import { POLICY } from '@/policy';
import { VIDEO_SWR_KEY } from '@/swr';

export default function useProfilePosts(username: string) {
  const [index, setIndex] = useState(1);
  const [posts, setPosts] = useState<UserPost[]>([]);
  const lastPostDateRef = useRef('0');

  const { data, isLoading } = useSWRImmutable<UserPost[]>(
    `${VIDEO_SWR_KEY.GET_POSTS_BY_USERNAME}-${username}-${index}`,
    async () => await getPostsByUsername(username, lastPostDateRef.current),
  );

  const loadMore = () => {
    setIndex((prev) => prev + 1);
  };

  lastPostDateRef.current =
    posts.length > 0 ? posts[posts.length - 1].createdAt : '0';

  const isReachingEnd =
    posts.length === 0 || posts.length < index * POLICY.POST_FETCH_LIMIT;

  useEffect(() => {
    if (data) {
      setPosts((prev) => [...prev, ...data]);
    }
  }, [data]);

  return {
    posts,
    loading: isLoading,
    loadMore,
    isReachingEnd,
  };
}
