import { groq } from 'next-sanity';
import uuid from 'uuid4';

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
    "comments": comments[${
      lastCommentDate === '0' ? true : 'createdAt < $lastCommentDate'
    }] | order(createdAt desc) [0...${POLICY.COMMENT_FETCH_LIMIT}] {
      id,
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
    .then(({ comments }) => (comments ? mapComments(comments) : []));
  return comments;
}

export async function getCommentById(postId: string, commentId: string) {
  const { comment } = await client.fetch<{ comment: Comment }>(
    groq`*[_type == 'video' && _id == '${postId}'][0] {
      "comment": comments[id == '${commentId}'][0] {
        "totalReplies": count(replies)
      }
    }`,
  );
  return comment;
}

export async function postComment(
  postId: string,
  uid: string,
  comment: string,
) {
  const id = uuid();
  return await client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append('comments', [
      {
        id,
        createdAt: new Date(),
        author: { _type: 'reference', _ref: uid },
        text: comment,
        likes: [],
        replies: [],
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
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
