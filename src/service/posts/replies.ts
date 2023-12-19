import { groq } from 'next-sanity';

import { POLICY } from '@/policy';

import { client } from '../sanity';

import type { Reply } from '@/model/post';

export async function getReplies(
  postId: string,
  commentKey: string,
  lastReplyDate: string | null,
) {
  const replies = await client
    .fetch<{ replies: Reply[] }>(
      groq`*[_type == 'video' && _id == '${postId}'][0]{
    "replies": comments[_key == '${commentKey}'].replies[createdAt > $lastReplyDate][0...${POLICY.COMMENT_FETCH_LIMIT}]{
      ...,
      "key": _key,
      "authorUsername": author->username,
      "authorImage": author->imageUrl,
      text,
      "likes": likes[]->username,
    }
  }`,
      { lastReplyDate },
    )
    .then(({ replies }) => mapReplies(replies));

  return replies;
}

function mapReplies(replies: Reply[]) {
  return replies.map((reply) => ({
    ...reply,
    likes: reply.likes ?? [],
  }));
}
