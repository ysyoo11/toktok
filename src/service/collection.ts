// TODO:
// 1. createCollection ✅
// 2. getCollectionsByUsername ✅ (public only / all)
// 3. getCollectionById

import { groq } from 'next-sanity';

import { POLICY } from '@/policy';

import { userPostProjection } from './posts';
import { client } from './sanity';

export async function getCollectionsByUsername(
  username: string,
  lastCollectionDate: string,
  getOnlyPublic: boolean,
) {
  return await client.fetch(
    groq`*[_type == 'collection' && author._ref in *[_type=='user' && username=='${username}']._id][${
      lastCollectionDate === '0' ? true : '_createdAt > $lastCollectionDate'
    }${
      getOnlyPublic ? ' && isPrivate == false' : ''
    }] | order(_createdAt asc) [0...${POLICY.COLLECTION_FETCH_LIMIT}] {
      "id": _id,
      "createdAt": _createdAt,
      name,
      isPrivate,
      "firstVideoUrl": posts[0]->videoUrl,
    }`,
    { lastCollectionDate },
  );
}

export async function getCollectionById(
  username: string,
  id: string,
  lastPostKey: string,
) {
  return await client.fetch(
    groq`*[_type == 'collection' && _id == '${id}'][0] {
      "collection": collections[id == '${id}'][0]{
        id,
        name,
        isPrivate,
        posts[_key > $lastPostKey] | order(_key asc) [0...1]->{
          ${userPostProjection}
        },
      }
    }`,
    {
      lastPostKey,
    },
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
