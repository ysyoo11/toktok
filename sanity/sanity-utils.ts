import { groq } from 'next-sanity';

import { User } from '@/types';

import { client } from './lib/client';

export async function getUsers(): Promise<User[]> {
  return await client.fetch(
    groq`*[_type == 'user']{
      _id,
      _createdAt,
      name,
      bio,
      "slug": slug.current,
      "image": image.asset->url,
      following,
      follower,
      videos,
      liked,
      saved,
      collections
    }`,
  );
}

export async function getUserById(id: string): Promise<User> {
  return await client
    .fetch(
      groq`*[_id == '${id}']{
      name,
      following,
      follower,
      videos
    }`,
    )
    .then((res) => res[0]);
}
