export type UserRef = {
  _ref: string;
  _type: 'reference';
  _key: string;
};

export type User = {
  id: string;
  _createdAt: Date;
  _type: 'user';
  name: string;
  username: string;
  imageURL: string;
  bio: string;
  following: UserRef[];
  follower: UserRef[];
  videos: Video[];
  liked: Video[];
  saved: Video[];
  collections: Collection[];
};

export type Video = {
  _id: string;
  _createdAt: Date;
  _type: 'video';
  caption: string;
  videoUrl: string;
  author: User;
  visibility: 'public' | 'friends' | 'private';
  music?: string;
  comments: Comment[];
  view: number;
  likes: User[];
  tags?: string[];
};

export type Comment = {};

export type Collection = {};
