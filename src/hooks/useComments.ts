import { useEffect, useRef, useState } from 'react';
import { Arguments, mutate as globalMutate } from 'swr';
import useSWRInfinite from 'swr/infinite';

import { getComments } from '@/lib/posts/comments';
import { updateCommentLike } from '@/lib/posts/like';
import { POLICY } from '@/policy';
import { VIDEO_SWR_KEY } from '@/swr';

import type { Comment } from '@/model/post';

export default function useComments(postId: string) {
  const COMMENT_SWR_BASE_KEY = `${VIDEO_SWR_KEY.GET_POST_COMMENTS}-${postId}`;

  const [comments, setComments] = useState<Comment[]>([]);
  const lastCommentDateRef = useRef('0');

  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index) => `${COMMENT_SWR_BASE_KEY}-${index}`,
    async () => {
      const data = await getComments({
        postId,
        lastCommentDate: lastCommentDateRef.current,
      });
      return data;
    },
    {
      revalidateFirstPage: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const loadMore = () => {
    setSize((prev) => prev + 1);
  };

  useEffect(() => {
    if (comments.length > 0) {
      lastCommentDateRef.current = comments[comments.length - 1].createdAt;
    } else {
      lastCommentDateRef.current = '0';
    }
  }, [comments]);

  const isReachingEnd =
    comments && comments.length < size * POLICY.COMMENT_FETCH_LIMIT;

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
    setComments(newComments);

    await globalMutate(
      (key: Arguments) =>
        typeof key === 'string' && key.startsWith(COMMENT_SWR_BASE_KEY),
      updateCommentLike(postId, comment.key, like),
      {
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      },
    );
  };

  useEffect(() => {
    if (data) {
      setComments(data.flat());
    }
  }, [data]);

  return {
    comments,
    loading: isLoading,
    setLike,
    isReachingEnd,
    loadMore,
  };
}
