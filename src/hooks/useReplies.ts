import { useEffect, useRef, useState } from 'react';
import { Arguments, mutate as globalMutate } from 'swr';
import useSWRImmutable from 'swr/immutable';

import { updateReplyLike } from '@/lib/posts/like';
import { getReplies } from '@/lib/posts/replies';
import { POLICY } from '@/policy';
import { VIDEO_SWR_KEY } from '@/swr';

import type { Reply, SimplePost } from '@/model/post';

type Props = {
  post: SimplePost;
  commentId: string;
};

export default function useReplies({ post, commentId }: Props) {
  const { id: postId } = post;
  const REPLY_SWR_BASE_KEY = `${VIDEO_SWR_KEY.GET_POST_COMMENT_REPLIES}-${postId}-${commentId}`;

  const [page, setPage] = useState(0);
  const [replies, setReplies] = useState<Reply[]>([]);
  const lastReplyDateRef = useRef('0');

  const { data, isLoading, isValidating } = useSWRImmutable(
    page > 0 ? `${REPLY_SWR_BASE_KEY}-${page}` : null,
    async () =>
      await getReplies({
        postId,
        commentId,
        lastReplyDate: lastReplyDateRef.current,
      }),
  );

  const loadMore = () => setPage((prev) => prev + 1);
  const isReachingEnd = data && data.length < POLICY.REPLY_FETCH_LIMIT;

  const setLike = async (reply: Reply, username: string, like: boolean) => {
    const newReply = {
      ...reply,
      likes: like
        ? [...reply.likes, username]
        : reply.likes.filter((item) => item !== username),
    };

    const newReplies = replies.map((r) => (r.key === reply.key ? newReply : r));
    setReplies(newReplies);

    await globalMutate(
      (key: Arguments) =>
        typeof key === 'string' && key.startsWith(REPLY_SWR_BASE_KEY),
      updateReplyLike({
        postId,
        commentId,
        replyKey: reply.key,
        like,
      }),
      {
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      },
    );
  };

  useEffect(() => {
    if (replies.length > 0) {
      const lastReply = replies[replies.length - 1];
      lastReplyDateRef.current = lastReply.createdAt;
    } else {
      lastReplyDateRef.current = '0';
    }
  }, [replies]);

  useEffect(() => {
    if (data && data.length > 0) {
      setReplies((prev) => [...prev, ...data]);
    }
  }, [data]);

  return {
    replies,
    loadMore,
    loading: isLoading || isValidating,
    isReachingEnd,
    setLike,
  };
}
