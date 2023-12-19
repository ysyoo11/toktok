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
  commentKey: string,
  uid: string,
) {
  await client
    .patch(postId)
    .setIfMissing({ [`comments[_key==\"${commentKey}"].likes`]: [] })
    .append(`comments[_key==\"${commentKey}"].likes`, [
      {
        _type: 'reference',
        _ref: uid,
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function dislikeComment(
  postId: string,
  commentKey: string,
  uid: string,
) {
  await client
    .patch(postId)
    .unset([`comments[_key==\"${commentKey}"].likes[_ref=="${uid}"]`])
    .commit();
}
