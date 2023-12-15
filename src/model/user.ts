import { Collection } from './collection';
import { SimplePost } from './post';

export type AuthUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
};

export type SimpleUser = Pick<User, 'id' | 'name' | 'username' | 'imageUrl'>;

export type User = {
  id: string;
  _createdAt: Date;
  _type: 'user';
  name: string;
  username: string;
  imageUrl: string;
  bio: string;
  following: SimpleUser[];
  follower: SimpleUser[];
  videos: SimplePost[];
  liked: SimplePost[];
  saved: SimplePost[];
  collections: Collection[];
};
