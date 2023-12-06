export type UserRef = {
  _ref: string;
  _type: 'reference';
  _key: string;
};

export type User = {
  _id: string;
  _createdAt: Date;
  _type: 'user';
  name: string;
  imageURL: string;
  bio: string;
  following: UserRef[];
  follower: UserRef[];
  videos: Video[];
  liked: Video[];
  saved: Video[];
  collections: Collection[];
};

export type Video = {};

export type Collection = {};
