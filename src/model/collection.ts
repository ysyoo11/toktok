import { SimplePost } from './post';

export type Collection = {
  id: string;
  name: string;
  posts: SimplePost[];
};

export type SimpleCollection = {
  id: string;
  name: string;
  firstVideoUrl: string;
  createdAt: string;
};
