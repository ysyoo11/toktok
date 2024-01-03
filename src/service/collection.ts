// TODO:
// 1. createCollection ✅
// 1. getAllCollectionsByUsername
// 2. getPublicCollectionsByUsername
// * Fetch 6 collections on each request

import { groq } from 'next-sanity';
import uuid4 from 'uuid4';

import { POLICY } from '@/policy';

import { client } from './sanity';

export async function getCollectionsByUsername(
  username: string,
  lastCollectionDate: string,
  getOnlyPublic: boolean,
) {
  return await client.fetch(
    groq`*[_type == 'user' && username == '${username}'][0]{
      "collections": collections[${
        lastCollectionDate === '0' ? true : 'createdAt > $lastCollectionDate'
      }${
        getOnlyPublic ? ' && isPrivate == false' : ''
      }] | order(createdAt asc) [0...${POLICY.COLLECTION_FETCH_LIMIT}] {
        id,
        name,
        createdAt,
        isPrivate,
        "firstVideoUrl": videos[0]->videoUrl
      }
    }`,
    { lastCollectionDate },
  );
}

export async function createCollection(
  uid: string,
  name: string,
  isPrivate: boolean,
) {
  const id = uuid4();
  return await client
    .patch(uid)
    .setIfMissing({ collections: [] })
    .append('collections', [
      {
        id,
        createdAt: new Date(),
        name,
        isPrivate,
        posts: [],
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}
