import type { Comment } from '@/model/post';

type GetCommentsProps = {
  postId: string;
  lastCommentDate: string;
};
export async function getComments({
  postId,
  lastCommentDate,
}: GetCommentsProps): Promise<Comment[]> {
  return await fetch(
    `/api/posts/${postId}/comments?lastCommentDate=${lastCommentDate}`,
  ).then((res) => res.json());
}

type PostCommentProps = {
  postId: string;
  comment: string;
};
export async function postComment({ postId, comment }: PostCommentProps) {
  return await fetch(`/api/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ comment }),
  }).then((res) => res.json());
}
