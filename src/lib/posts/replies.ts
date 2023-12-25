import { Reply } from '@/model/post';

type GetRepliesProps = {
  postId: string;
  commentKey: string;
  lastReplyDate: string | null;
};

export async function getReplies({
  postId,
  commentKey,
  lastReplyDate,
}: GetRepliesProps): Promise<Reply[]> {
  return await fetch(
    `/api/posts/${postId}/comments/${commentKey}/replies?lastReplyDate=${lastReplyDate}`,
  ).then((res) => res.json());
}

type PostReplyProps = {
  postId: string;
  commentKey: string;
  reply: string;
};
export async function postReply({ postId, commentKey, reply }: PostReplyProps) {
  return await fetch(`/api/posts/${postId}/comments/${commentKey}/replies`, {
    method: 'POST',
    body: JSON.stringify({ reply }),
  }).then((res) => res.json());
}
