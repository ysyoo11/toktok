import { useEffect, useRef, useState } from 'react';
import { Arguments, useSWRConfig } from 'swr';
import useSWRImmutable from 'swr/immutable';

import { getComments, postComment } from '@/lib/posts/comments';
import { updateCommentLike } from '@/lib/posts/like';
import { postReply } from '@/lib/posts/replies';
import { POLICY } from '@/policy';
import { VIDEO_SWR_KEY } from '@/swr';

import type { Comment, SimplePost } from '@/model/post';

export default function useComments(post: SimplePost) {
  const { id: postId } = post;
  const COMMENT_SWR_BASE_KEY = `${VIDEO_SWR_KEY.GET_POST_COMMENTS}-${postId}`;
  const { mutate } = useSWRConfig();
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const lastCommentDateRef = useRef('0');
  const addCommentFlagRef = useRef(false);
  const maxCommentNumRef = useRef(0);

  const { data, isLoading } = useSWRImmutable(
    `${COMMENT_SWR_BASE_KEY}-${page}`,
    async () =>
      await getComments({
        postId,
        lastCommentDate: lastCommentDateRef.current,
      }),
  );

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const isReachingEnd =
    comments.length === 0 ||
    (comments.length < page * POLICY.COMMENT_FETCH_LIMIT &&
      maxCommentNumRef.current <= comments.length);

  const setLike = async (comment: Comment, username: string, like: boolean) => {
    const newComment = {
      ...comment,
      likes: like
        ? [...comment.likes, username]
        : comment.likes.filter((item) => item !== username),
    };
    const newComments = comments?.map((c) =>
      c.id === comment.id ? newComment : c,
    );
    setComments(newComments);

    await mutate(
      (key: Arguments) =>
        typeof key === 'string' && key.startsWith(COMMENT_SWR_BASE_KEY),
      updateCommentLike(postId, comment.id, like),
      {
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      },
    );
  };

  const mutatePostCommentsNum = () => {
    const newPost = { ...post, comments: post.comments + 1 };
    mutate(`/api/posts/${postId}`, true, {
      optimisticData: newPost,
      revalidate: false,
      populateCache: false,
      rollbackOnError: false,
    });
  };

  const addComment = async (comment: string) => {
    mutatePostCommentsNum();
    addCommentFlagRef.current = true;
    await postComment({ postId, comment }) //
      .then(() => {
        lastCommentDateRef.current = '0';
        mutate(
          (key) =>
            typeof key === 'string' && key.startsWith(COMMENT_SWR_BASE_KEY),
        );
      });
  };

  const addReply = async (commentId: string, reply: string) => {
    mutatePostCommentsNum();
    addCommentFlagRef.current = true;
    await postReply({ postId, commentId, reply }) //
      .then(() => {
        lastCommentDateRef.current = '0';
        mutate(
          (key) =>
            typeof key === 'string' && key.startsWith(COMMENT_SWR_BASE_KEY),
        );
      });
  };

  useEffect(() => {
    if (comments.length > 0) {
      lastCommentDateRef.current = comments[comments.length - 1].createdAt;
    } else {
      lastCommentDateRef.current = '0';
    }
  }, [comments]);

  useEffect(() => {
    if (data) {
      if (addCommentFlagRef.current === true) {
        setComments(data);
      } else {
        setComments((prev) => [...prev, ...data]);
      }
      addCommentFlagRef.current = false;
    }
  }, [data]);

  useEffect(() => {
    if (maxCommentNumRef.current < comments.length) {
      maxCommentNumRef.current = comments.length;
    }
  }, [comments.length]);

  return {
    comments,
    loading: isLoading,
    setLike,
    isReachingEnd,
    loadMore,
    addComment,
    page,
    addReply,
  };
}
