import { client } from './sanity';

export async function follow(originUserId: string, targetUserId: string) {
  await client
    .patch(originUserId)
    .setIfMissing({ following: [] })
    .append('following', [{ _type: 'reference', _ref: targetUserId }])
    .commit({ autoGenerateArrayKeys: true });

  await client
    .patch(targetUserId)
    .setIfMissing({ followers: [] })
    .append('followers', [{ _type: 'reference', _ref: originUserId }])
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(originUserId: string, targetUserId: string) {
  await client
    .patch(originUserId)
    .unset([`following[_ref=="${targetUserId}"]`])
    .commit();

  await client
    .patch(targetUserId)
    .unset([`followers[_ref=="${originUserId}"]`])
    .commit();
}
