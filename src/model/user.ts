import { ItemWithTimestamp } from './base';
import { Collection } from './collection';
import { SimplePost } from './post';

export type AuthUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
};

export type SimpleUser = Pick<
  User,
  'id' | 'username' | 'name' | 'imageUrl' | 'createdAt' | 'updatedAt'
> & {
  following: string[];
  followers: string[];
};

export type User = ItemWithTimestamp & {
  name: string;
  username: string;
  imageUrl: string;
  bio: string;
  following: SimpleUser[];
  followers: SimpleUser[];
  videos: SimplePost[];
  liked: SimplePost[];
  saved: SimplePost[];
  collections: Collection[];
};

export type ProfileUser = Omit<
  User,
  'videos' | 'liked' | 'saved' | 'collections' | 'following' | 'followers'
> & {
  following: number;
  followers: number;
};
