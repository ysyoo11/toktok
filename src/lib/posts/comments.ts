import type { Comment } from '@/model/post';

type Props = {
  postId: string;
  lastCommentDate: string;
};

export async function getComments({
  postId,
  lastCommentDate,
}: Props): Promise<Comment[]> {
  return await fetch(
    `/api/posts/${postId}/comments?lastCommentDate=${lastCommentDate}`,
  ).then((res) => res.json());
}
