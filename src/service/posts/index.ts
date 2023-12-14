import { groq } from 'next-sanity';

import { client } from '@/service/sanity';

import type { SimplePost } from '@/model/post';

const simplePostProjection = `
  ...,
  "id": _id,
  "createdAt": _createdAt,
  videoUrl,
  caption,
  author->{id, username, imageUrl, name},
  likes[]->{id, username, imageUrl, name},
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

function mapPosts(posts: SimplePost[]) {
  return posts.map((post: SimplePost) => ({
    ...post,
    likes: post.likes ?? [],
  }));
}
