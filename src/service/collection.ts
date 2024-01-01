// 1. getAllCollectionsByUsername
// 2. getPublicCollectionsByUsername
// ** Fetch 6 collections on each request

import { groq } from 'next-sanity';
import uuid4 from 'uuid4';

import { POLICY } from '@/policy';

import { client } from './sanity';

export async function getAllCollectionsByUsername(
  username: string,
  lastCollectionDate: string,
) {
  return await client.fetch(
    groq`*[_type == 'user' && username == '${username}'][0]{
      "collections": collections[${
        lastCollectionDate === '0' ? true : 'createdAt < $lastCollectionDate'
      }] | order(createdAt desc) [0...${POLICY.COLLETION_FETCH_LIMIT}] {
        id,
        "key": _key,
        name,
        "firstVideoUrl": videos[0]->videoUrl
      }
    }`,
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
        author: { _type: 'reference', _ref: uid },
        name,
        isPrivate,
        posts: [],
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}
