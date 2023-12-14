import { SimpleUser } from './user';

export type SimplePost = Omit<
  Post,
  'view' | 'tags' | 'comments' | 'visibility'
> & {
  comments: number;
};

export type Post = {
  id: string;
  createdAt: Date;
  videoUrl: string;
  caption: string;
  author: SimpleUser;
  visibility: 'public' | 'friends' | 'private';
  music?: string;
  likes: SimpleUser[];
  saved: number;
  comments: Comment[];
  view: number;
  tags?: string[];
};

export type Comment = {
  author: SimpleUser;
  text: string;
  likes: SimpleUser[];
  replies: Reply[];
};

export type Reply = Omit<Comment, 'replies'>;
