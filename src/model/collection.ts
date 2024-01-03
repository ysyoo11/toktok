import type { UserPost } from './post';

export type Collection = {
  id: string;
  name: string;
  posts: UserPost[];
  firstVideoUrl: string;
  isPrivate: boolean;
  createdAt: string;
};
