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

export type User = ItemWithTimestamp & {
  name: string;
  username: string;
  imageUrl: string;
  bio: string;
  following: string[];
  followers: string[];
  posts: SimplePost[];
  liked: SimplePost[];
  saved: SimplePost[];
  collections: Collection[];
};

export type SimpleUser = Omit<
  User,
  'posts' | 'liked' | 'saved' | 'collections' | 'bio'
>;

export type ProfileUser = Omit<SimpleUser, 'following' | 'followers'> & {
  following: number;
  followers: number;
  bio: string;
};
