import { groq } from 'next-sanity';

import { client } from '@/service/sanity';

import type { SimplePost } from '@/model/post';

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
  "comments": count(comments)
`;

export async function getPublicPosts() {
  return await client
    .fetch(
      groq`*[_type == 'video' && visibility == 'public'] | order(_createdAt desc) {
    ${simplePostProjection}
  }`,
    )
    .then(mapPosts);
}

export async function getPostById(id: string) {
  return await client
    .fetch(
      groq`*[_type == 'video' && _id == '${id}'][0]{
    ${simplePostProjection}
  }`,
    )
    .then(setLike);
}

function mapPosts(posts: SimplePost[]) {
  return posts.map((post: SimplePost) => ({
    ...post,
    likes: post.likes ?? [],
  }));
}

function setLike(post: SimplePost) {
  return { ...post, likes: post.likes ?? [] };
}
