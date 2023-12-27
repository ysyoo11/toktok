import { Reply } from '@/model/post';

type GetRepliesProps = {
  postId: string;
  commentId: string;
  lastReplyDate: string | null;
};

export async function getReplies({
  postId,
  commentId,
  lastReplyDate,
}: GetRepliesProps): Promise<Reply[]> {
  return await fetch(
    `/api/posts/${postId}/comments/${commentId}/replies?lastReplyDate=${lastReplyDate}`,
  ).then((res) => res.json());
}

type PostReplyProps = {
  postId: string;
  commentId: string;
  reply: string;
};
export async function postReply({ postId, commentId, reply }: PostReplyProps) {
  return await fetch(`/api/posts/${postId}/comments/${commentId}/replies`, {
    method: 'POST',
    body: JSON.stringify({ reply }),
  }).then((res) => res.json());
}
