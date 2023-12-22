import { useEffect, useRef, useState } from 'react';
import { Arguments, mutate as globalMutate } from 'swr';
import useSWRImmutable from 'swr/immutable';

import { updateReplyLike } from '@/lib/posts/like';
import { getReplies } from '@/lib/posts/replies';
import { POLICY } from '@/policy';
import { VIDEO_SWR_KEY } from '@/swr';

import type { Reply } from '@/model/post';

type Props = {
  postId: string;
  commentKey: string;
};

export default function useReplies({ postId, commentKey }: Props) {
  const REPLY_SWR_BASE_KEY = `${VIDEO_SWR_KEY.GET_POST_COMMENT_REPLIES}-${postId}-${commentKey}`;

  const [fetchable, setFetchable] = useState(false);
  const [page, setPage] = useState(0);
  const [replies, setReplies] = useState<Reply[]>([]);
  const lastReplyDateRef = useRef('0');

  const { data, isLoading, isValidating } = useSWRImmutable(
    fetchable ? `${REPLY_SWR_BASE_KEY}-${page}` : null,
    () => {
      return getReplies({
        postId,
        commentKey,
        lastReplyDate: lastReplyDateRef.current,
      });
    },
  );

  const loadMore = async () => {
    if (!fetchable) {
      setFetchable(true);
      return;
    }
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (replies.length > 0) {
      const lastReply = replies[replies.length - 1];
      lastReplyDateRef.current = lastReply.createdAt;
    } else {
      lastReplyDateRef.current = '0';
    }
  }, [replies]);

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
      updateReplyLike({ postId, commentKey, replyKey: reply.key, like }),
      {
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      },
    );
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setReplies((prev) => [...prev, ...data]);
    }
  }, [data]);

  return {
    replies,
    loadMore,
    isLoading: isLoading || isValidating,
    isReachingEnd,
    setLike,
  };
}
