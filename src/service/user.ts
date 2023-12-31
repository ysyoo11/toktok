import { User as NextAuthUser } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { groq } from 'next-sanity';

import { client } from './sanity';

import type { ProfileUser, User } from '@/model/user';

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
    following[]->{username,imageUrl},
    followers[]->{username,imageUrl},
  }`,
  );
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
