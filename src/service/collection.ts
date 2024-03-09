import { groq } from 'next-sanity';

import { POLICY } from '@/policy';

import { client } from './sanity';

export async function getCollectionsByUsername(
  username: string,
  lastCollectionDate: string,
  getOnlyPublic: boolean,
) {
  return await client.fetch(
    groq`*[_type == 'collection' && author._ref in *[_type=='user' && username=='${username}']._id][${
      lastCollectionDate === '0' ? true : '_createdAt < $lastCollectionDate'
    }${
      getOnlyPublic ? ' && isPrivate == false' : ''
    }] | order(_createdAt desc) [0...${POLICY.COLLECTION_FETCH_LIMIT}] {
      "id": _id,
      "createdAt": _createdAt,
      name,
      isPrivate,
      "firstVideoUrl": posts[0]->videoUrl,
      "posts": posts[]->_id
    }`,
    { lastCollectionDate },
  );
}

export async function getCollectionById(id: string) {
  return await client.fetch(
    groq`*[_type == 'collection' && _id == '${id}'][0] {
      "id": _id,
      name,
      isPrivate,
      "posts": posts[]->id
    }`,
  );
}

export async function createCollection(
  uid: string,
  name: string,
  isPrivate: boolean,
) {
  const collectionData = {
    _type: 'collection',
    name,
    isPrivate,
    posts: [],
    author: {
      _type: 'reference',
      _ref: uid,
    },
  };

  const collection = await client.create(collectionData);

  return await client
    .patch(uid)
    .setIfMissing({ collections: [] })
    .append('collections', [{ _type: 'reference', _ref: collection._id }])
    .commit({ autoGenerateArrayKeys: true });
}

export async function addPostToCollection(colId: string, postId: string) {
  client
    .patch(postId)
    .setIfMissing({ bookmarks: [] })
    .append('bookmarks', [{ _type: 'reference', _ref: colId }])
    .commit({ autoGenerateArrayKeys: true });
  client
    .patch(colId)
    .setIfMissing({ posts: [] })
    .append('posts', [{ _type: 'reference', _ref: postId }])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removePostFromCollection(colId: string, postId: string) {
  client
    .patch(postId)
    .unset([`bookmarks[_ref=="${colId}"]`])
    .commit();
  client
    .patch(colId)
    .unset([`posts[_ref=="${postId}"]`])
    .commit();
}
