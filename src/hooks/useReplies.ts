import { useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';

import { getReplies } from '@/lib/posts/replies';
import { POLICY } from '@/policy';
import { VIDEO_SWR_KEY } from '@/swr';

import type { Reply } from '@/model/post';

type Props = {
  postId: string;
  commentKey: string;
};

export default function useReplies({ postId, commentKey }: Props) {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [page, setPage] = useState(0);
  const [lastReplyDate, setLastReplyDate] = useState<string | null>('');
  const [newRepliesTemp, setNewRepliesTemp] = useState<Reply[]>([]);

  const { trigger, isMutating } = useSWRMutation(
    `${VIDEO_SWR_KEY.GET_POST_COMMENT_REPLIES}-${postId}-${commentKey}-${page}`,
    async () => {
      const newReplies = await getReplies({
        postId,
        commentKey,
        lastReplyDate,
      });
      return newReplies;
    },
  );

  const loadMore = async () => {
    const newReplies = await trigger();
    setNewRepliesTemp(newReplies);
    if (newReplies && newReplies.length > 0) {
      setReplies((prev) => [...prev, ...newReplies]);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (replies.length > 0) {
      const lastReply = replies[replies.length - 1];
      setLastReplyDate(lastReply.createdAt);
    } else {
      setLastReplyDate(null);
    }
  }, [replies]);

  const isEmpty = page > 0 && replies.length === 0;
  const isReachingEnd =
    isEmpty || (page > 0 && newRepliesTemp.length < POLICY.COMMENT_FETCH_LIMIT);

  return {
    replies,
    loadMore,
    isLoading: isMutating,
    isEmpty,
    isReachingEnd,
  };
}
