import { User as NextAuthUser } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { groq } from 'next-sanity';

import { User } from '@/types';

import { client } from './sanity';

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
      videos,
      imageURL,
      following,
      follower
    }`,
    )
    .then((res) => res[0]);
}

export async function getUserByUsername(username: string) {
  return await client.fetch(`
  *[_type == 'user' && username == '${username}'][0]{
    ...,
    "id": _id,
    following[]->{username,imageUrl},
    followers[]->{username,imageUrl},
    "saved":saved[]->_id
  }`);
}

export async function getUserByEmail(email: string): Promise<User> {
  return await client
    .fetch(
      groq`*[_type=='user' && email=='${email}']{
      _id,
      name,
      videos,
      imageURL,
      following,
      follower
    }`,
    )
    .then((res) => res[0]);
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
    imageURL: image,
  };

  return await client.createIfNotExists(userData).catch(console.error);
}
