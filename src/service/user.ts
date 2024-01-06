import { User as NextAuthUser } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { groq } from 'next-sanity';

import { POLICY } from '@/policy';

import { client } from './sanity';

import type { ProfileUser, User } from '@/model/user';

const simpleUserProjection = `
  "id": _id,
  username,
  name,
  imageUrl,
  "createdAt": _createdAt,
  "updatedAt": _updatedAt,
  "following": following[]->username,
  "followers": followers[]->username
`;

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
  return await client.fetch(
    groq`*[_type == 'user' && _id == '${id}'][0]{
      ...,
      "id": _id,
      following[]->{username,imageUrl},
      followers[]->{username,imageUrl},
      liked[]->{_id},
      "saved":saved[]->_id
    }`,
  );
}

export async function getUserByUsername(
  username: string,
): Promise<ProfileUser> {
  return await client.fetch(
    groq`*[_type == 'user' && username == '${username}'][0]{
    "id": _id,
    "createdAt": _createdAt,
    username,
    name,
    imageUrl,
    bio,
    "following": count(following),
    "followers": count(followers)
  }`,
  );
}

export async function getFollowersByUsername(
  username: string,
  lastId: string,
): Promise<Pick<User, 'followers'>> {
  return await client
    .fetch(
      groq`*[_type == 'user' && username == '${username}'][0]{
      followers[${
        lastId === '0' ? true : '_ref > $lastId'
      }] | order(_id asc) [0...${POLICY.USER_FETCH_LIMIT}]->{
        ${simpleUserProjection}
      }
    }`,
      {
        lastId,
      },
    )
    .then((res) => (!res.followers ? { followers: [] } : res));
}
export async function getFollowingByUsername(
  username: string,
  lastId: string,
): Promise<Pick<User, 'following'>> {
  return await client
    .fetch(
      groq`*[_type == 'user' && username == '${username}'][0]{
      following[${
        lastId === '0' ? true : '_ref > $lastId'
      }] | order(_id asc) [0...${POLICY.USER_FETCH_LIMIT}]->{
        ${simpleUserProjection}
      }
    }`,
      {
        lastId,
      },
    )
    .then((res) => (!res.following ? { following: [] } : res));
}

// async function uploadImage(file: File, username: string) {
//   return await client.assets.upload('image', file, {
//     contentType: 'image/jpg',
//     filename: `${username}.jpg`,
//   });
// }

export async function createUser(user: NextAuthUser | AdapterUser) {
  const { image, id, name, email } = user;

  // const file = image ? await urlToObject(image) : null;

  // let imageId = '';
  // let imageURL = '';

  // if (file) {
  //   await uploadImage(file, name || 'image')
  //     .then((doc) => {
  //       imageId = doc._id;
  //       imageURL = doc.url;
  //     })
  //     .catch(console.error);
  // }

  // const asset = {
  //   _type: 'reference',
  //   _ref: imageId,
  // };

  const userData = {
    _type: 'user',
    _id: id,
    name,
    username: user.email!.split('@')[0],
    email,
    // image: file
    //   ? {
    //       _type: 'image',
    //       asset,
    //       alt: `Profile of ${name}`,
    //     }
    //   : null,
    following: [],
    followers: [],
    imageUrl: image,
    liked: [],
    saved: [],
    videos: [],
    collections: [],
  };

  return await client.createIfNotExists(userData).catch(console.error);
}
