import { groq } from 'next-sanity';

import { POLICY } from '@/policy';
import { client } from '@/service/sanity';

import type { RawPost, UserPost } from '@/model/post';

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
      groq`*[_type == 'video' && _id == '${id}'][0] {
    ${simplePostProjection}
  }`,
    )
    .then(refinePost);
}

export async function getPostsByUsername(
  username: string,
  lastPostDate: string,
): Promise<UserPost[]> {
  return await client.fetch(
    groq`*[_type == 'video' && author._ref in *[_type=='user' && username == '${username}']._id][${
      lastPostDate === '0' ? true : '_createdAt < $lastPostDate'
    }] | order(_createdAt desc) [0...${POLICY.POST_FETCH_LIMIT}] {
      "id": _id,
      "createdAt": _createdAt,
      videoUrl,
      caption,
      visibility,
      views
  }`,
    { lastPostDate },
  );
}

export async function createPost(
  file: File,
  authorId: string,
  caption: string,
) {
  const { url: videoUrl, _id } = await client.assets.upload('file', file);

  const postData = {
    _type: 'video',
    id: _id,
    videoUrl,
    author: {
      _type: 'reference',
      _ref: authorId,
    },
    caption,
    visibility: 'public',
    views: 0,
    comments: [],
    likes: [],
    saved: 0,
    tags: [],
  };

  const post = await client.create(postData);

  return await client
    .patch(authorId)
    .setIfMissing({ posts: [] })
    .insert('after', 'posts[-1]', [{ _type: 'reference', _ref: post._id }])
    .commit({ autoGenerateArrayKeys: true });
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
  if (!comments) return 0;
  const replies = comments.reduce(
    (partialSum, currVal) =>
      partialSum + (currVal.replies ? currVal.replies.length : 0),
    0,
  );
  return comments.length + replies;
}
