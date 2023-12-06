import { User as NextAuthUser } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { groq } from 'next-sanity';

import { User } from '@/types';
import { slugify } from '@/utils/slugify';
import { urlToObject } from '@/utils/url-to-object';

import { client } from '../lib/client';
import { urlForImage } from '../lib/image';

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

async function uploadImage(file: File, username: string) {
  return await client.assets.upload('image', file, {
    contentType: 'image/jpg',
    filename: `${username}.jpg`,
  });
}

export async function createUser(user: NextAuthUser | AdapterUser) {
  const { image, id, name, email } = user;

  const file = image ? await urlToObject(image) : null;

  let imageId = '';

  if (file) {
    await uploadImage(file, name || 'image')
      .then((doc) => {
        imageId = doc._id;
      })
      .catch(console.error);
  }

  const asset = {
    _type: 'reference',
    _ref: imageId,
  };

  const userData = {
    _type: 'user',
    _id: id,
    name,
    email,
    slug: {
      _type: 'slug',
      current: slugify(email!.split('@')[0]),
    },
    image: file
      ? {
          _type: 'image',
          asset,
          alt: `Profile of ${name}`,
        }
      : null,
    imageURL: file ? urlForImage({ asset }).url() : '',
  };

  return await client.createIfNotExists(userData).catch(console.error);
}
