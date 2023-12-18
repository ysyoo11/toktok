import { groq } from 'next-sanity';

import { client } from '@/service/sanity';

import type { RawPost } from '@/model/post';

const simplePostProjection = `
  ...,
  "id": _id,
  "createdAt": _createdAt,
  videoUrl,
  caption,
  "authorUsername": author->username,
  "authorName": author->name,
  "authorImage": author->imageUrl,
  "likes": likes[]->username,
  saved,
  music,
  "comments": comments[]{
    _key,
    replies[]{
      _key,
    },
  },
`;

export async function getPublicPosts() {
  const posts = await client
    .fetch(
      groq`*[_type == 'video' && visibility == 'public'] | order(_createdAt desc) {
    ${simplePostProjection}
  }`,
    )
    .then(mapPosts);
  return posts;
}

export async function getPostById(id: string) {
  const post = await client
    .fetch(
      groq`*[_type == 'video' && _id == '${id}'][0] {
    ${simplePostProjection}
  }`,
    )
    .then(refinePost);
  return post;
}

function mapPosts(posts: RawPost[]) {
  return posts.map((post: RawPost) => {
    const comments = getTotalComments(post);
    return {
      ...post,
      likes: post.likes ?? [],
      comments,
    };
  });
}

function refinePost(post: RawPost) {
  const comments = getTotalComments(post);
  return {
    ...post,
    likes: post.likes ?? [],
    comments,
  };
}

function getTotalComments({ comments }: RawPost): number {
  const replies = comments.reduce(
    (partialSum, currVal) => partialSum + currVal.replies.length,
    0,
  );
  return comments.length + replies;
}
