import { Reply } from '@/model/post';

type Props = {
  postId: string;
  commentKey: string;
  lastReplyDate: string | null;
};

export async function getReplies({
  postId,
  commentKey,
  lastReplyDate,
}: Props): Promise<Reply[]> {
  return await fetch(
    `/api/posts/${postId}/comments/${commentKey}/replies?lastReplyDate=${lastReplyDate}`,
  ).then((res) => res.json());
}
