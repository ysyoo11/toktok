export async function updatePostLike(postId: string, like: boolean) {
  return await fetch(`/api/posts/${postId}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ like }),
  }).then((res) => res.json());
}

export async function updateCommentLike(
  postId: string,
  commentId: string,
  like: boolean,
) {
  return await fetch(`/api/posts/${postId}/comments/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ commentId, like }),
  }).then((res) => res.json());
}

type ReplyLikeProps = {
  postId: string;
  commentId: string;
  replyKey: string;
  like: boolean;
};
export async function updateReplyLike({
  postId,
  commentId,
  replyKey,
  like,
}: ReplyLikeProps) {
  return await fetch(
    `/api/posts/${postId}/comments/${commentId}/replies/likes`,
    {
      method: 'PUT',
      body: JSON.stringify({ replyKey, like }),
    },
  ).then((res) => res.json());
}
