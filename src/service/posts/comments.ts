import { groq } from 'next-sanity';

import { Comment } from '@/model/post';
import { POLICY } from '@/policy';

import { client } from '../sanity';

export async function getComments(
  postId: string,
  lastCommentDate: string | null,
) {
  const comments = await client
    .fetch<{ comments: Comment[] }>(
      groq`*[_type == 'video' && _id == '${postId}'][0]{
    "comments": comments[createdAt > $lastCommentDate][0...${POLICY.COMMENT_FETCH_LIMIT}]{
      "key": _key,
      "authorUsername": author->username,
      "authorImage": author->imageUrl,
      text,
      "likes": likes[]->username,
      createdAt,
      "totalReplies": count(replies)
    }
  }`,
      { lastCommentDate },
    )
    .then(({ comments }) => mapComments(comments));
  return comments;
}

function mapComments(comments: Comment[]) {
  return comments.map((comment) => ({
    ...comment,
    likes: comment.likes ?? [],
    replies: comment.replies
      ? comment.replies.map((reply) => ({
          ...reply,
          likes: reply.likes ?? [],
        }))
      : [],
  }));
}
