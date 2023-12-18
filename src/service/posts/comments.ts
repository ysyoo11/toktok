import { groq } from 'next-sanity';

import { Comment } from '@/model/post';

import { client } from '../sanity';

// TODO:
// 1. fetch 12 comments each time (infinite scroll)
// 2. fetch only the first reply and fetch 3 more when requested to show more replies
export async function getComments(postId: string) {
  const comments = await client
    .fetch<{ comments: Comment[] }>(
      groq`*[_type == 'video' && _id == '${postId}'][0]{
    "comments": comments[]{
      ...,
      "key": _key,
      "authorUsername": author->username,
      "authorImage": author->imageUrl,
      text,
      "likes": likes[]->username,
      "replies": replies[]{
        "key": _key,
        "authorUsername": author->username,
        "authorImage": author->imageUrl,
        "likes": likes[]->username,
        text
      }
    }
  }`,
    )
    .then((data) => mapComments(data.comments));
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
