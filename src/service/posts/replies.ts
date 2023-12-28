import { groq } from 'next-sanity';
import uuid from 'uuid4';

import { POLICY } from '@/policy';

import { client } from '../sanity';

import type { Reply } from '@/model/post';

export async function getReplies(
  postId: string,
  commentId: string,
  lastReplyDate: string | null,
) {
  const replies = await client
    .fetch<{ replies: Reply[] }>(
      groq`*[_type == 'video' && _id == '${postId}'][0]{
    "replies": comments[id == '${commentId}'].replies[createdAt > $lastReplyDate][0...${POLICY.REPLY_FETCH_LIMIT}]{
      id,
      "key": _key,
      "authorUsername": author->username,
      "authorImage": author->imageUrl,
      text,
      "likes": likes[]->username,
      createdAt,
    }
  }`,
      { lastReplyDate },
    )
    .then(({ replies }) => mapReplies(replies));

  return replies;
}

type PostReplyProps = {
  postId: string;
  commentId: string;
  uid: string;
  reply: string;
};
export async function postReply({
  postId,
  commentId,
  uid,
  reply,
}: PostReplyProps) {
  const id = uuid();
  const result = await client
    .patch(postId)
    .setIfMissing({ [`comments[id=="${commentId}"].replies`]: [] })
    .append(`comments[id=="${commentId}"].replies`, [
      {
        id,
        createdAt: new Date(),
        author: { _type: 'reference', _ref: uid },
        text: reply,
        likes: [],
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
  return result;
}

function mapReplies(replies: Reply[]) {
  return replies.map((reply) => ({
    ...reply,
    likes: reply.likes ?? [],
  }));
}
