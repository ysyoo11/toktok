import { useEffect, useRef, useState } from 'react';
import { Arguments, mutate as globalMutate } from 'swr';
import useSWRImmutable from 'swr/immutable';

import { updateReplyLike } from '@/lib/posts/like';
import { getReplies, postReply } from '@/lib/posts/replies';
import { POLICY } from '@/policy';
import { VIDEO_SWR_KEY } from '@/swr';

import { useUser } from './useUser';

import type { Comment, Reply, SimplePost } from '@/model/post';

type Props = {
  post: SimplePost;
  commentId: string;
};

export default function useReplies({ post, commentId }: Props) {
  const REPLY_SWR_BASE_KEY = `${VIDEO_SWR_KEY.GET_POST_COMMENT_REPLIES}-${post.id}-${commentId}`;

  const { user } = useUser();
  const [fetchable, setFetchable] = useState(false);
  const [page, setPage] = useState(0);
  const [replies, setReplies] = useState<Reply[]>([]);
  const lastReplyDateRef = useRef('0');

  const { data, isLoading, isValidating, mutate } = useSWRImmutable(
    fetchable ? `${REPLY_SWR_BASE_KEY}-${page}` : null,
    () => {
      return getReplies({
        postId: post.id,
        commentId,
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
      updateReplyLike({
        postId: post.id,
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

  const addReply = async (commentId: string, reply: string) => {
    await mutate(postReply({ postId: post.id, commentId, reply }), {
      populateCache: false,
      revalidate: true,
      rollbackOnError: true,
    }).then((res: any) => {
      if (!res || !user) return;
      const replies = (res.data.comments as Comment[]).find(
        (c) => c.id === commentId,
      )?.replies;
      if (!replies) throw new Error('Could not find replies');
      const uploadedReply = replies[replies.length - 1];
      const modifiedReply: Reply = {
        ...uploadedReply,
        authorImage: user.imageUrl,
        authorUsername: user.username,
      };
      setReplies((prev) => [...prev, modifiedReply]);
    });

    const newPost = { ...post, comments: post.comments + 1 };
    globalMutate(`/api/posts/${post.id}`, true, {
      optimisticData: newPost,
      revalidate: false,
      populateCache: false,
      rollbackOnError: false,
    });

    globalMutate(
      (key: Arguments) =>
        typeof key === 'string' &&
        key.startsWith(`${VIDEO_SWR_KEY.GET_POST_COMMENTS}-${post.id}`),
      true,
      {
        revalidate: true,
        populateCache: false,
        rollbackOnError: true,
      },
    ).then((res) => console.log(res));
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
    addReply,
  };
}
