import { client } from '../sanity';

export async function likePost(videoId: string, uid: string) {
  await client
    .patch(videoId)
    .setIfMissing({ likes: [] })
    .insert('after', 'likes[-1]', [{ _type: 'reference', _ref: uid }])
    .commit({ autoGenerateArrayKeys: true });

  await client
    .patch(uid)
    .setIfMissing({ liked: [] })
    .insert('after', 'liked[-1]', [{ _type: 'reference', _ref: videoId }])
    .commit({ autoGenerateArrayKeys: true });
}

export async function dislikePost(videoId: string, uid: string) {
  await client
    .patch(uid)
    .unset([`liked[_ref=="${videoId}"]`])
    .commit();

  await client
    .patch(videoId)
    .unset([`likes[_ref=="${uid}"]`])
    .commit();
}
