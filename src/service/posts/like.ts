import { client } from '../sanity';

export async function likePost(postId: string, uid: string) {
  await client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append('likes', [{ _type: 'reference', _ref: uid }])
    .commit({ autoGenerateArrayKeys: true });

  await client
    .patch(uid)
    .setIfMissing({ liked: [] })
    .append('liked', [{ _type: 'reference', _ref: postId }])
    .commit({ autoGenerateArrayKeys: true });
}

export async function dislikePost(postId: string, uid: string) {
  await client
    .patch(uid)
    .unset([`liked[_ref=="${postId}"]`])
    .commit();

  await client
    .patch(postId)
    .unset([`likes[_ref=="${uid}"]`])
    .commit();
}

export async function likeComment(
  postId: string,
  commentId: string,
  uid: string,
) {
  await client
    .patch(postId)
    .setIfMissing({ [`comments[id=="${commentId}"].likes`]: [] })
    .append(`comments[id==\"${commentId}"].likes`, [
      {
        _type: 'reference',
        _ref: uid,
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function dislikeComment(
  postId: string,
  commentId: string,
  uid: string,
) {
  await client
    .patch(postId)
    .unset([`comments[id=="${commentId}"].likes[_ref=="${uid}"]`])
    .commit();
}

type LikeReplyProps = {
  postId: string;
  commentKey: string;
  replyKey: string;
  uid: string;
};
export async function likeReply({
  postId,
  commentKey,
  replyKey,
  uid,
}: LikeReplyProps) {
  const targetReplyLikes = `comments[_key=="${commentKey}"].replies[_key=="${replyKey}"].likes`;
  await client
    .patch(postId)
    .setIfMissing({ [targetReplyLikes]: [] })
    .append(targetReplyLikes, [
      {
        _type: 'reference',
        _ref: uid,
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}
export async function dislikeReply({
  postId,
  commentKey,
  replyKey,
  uid,
}: LikeReplyProps) {
  await client
    .patch(postId)
    .unset([
      `comments[_key=="${commentKey}"].replies[_key=="${replyKey}"].likes[_ref=="${uid}"]`,
    ])
    .commit();
}
