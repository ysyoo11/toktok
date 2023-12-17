export type SimplePost = Omit<
  Post,
  'view' | 'tags' | 'comments' | 'visibility'
> & {
  comments: number;
};

export type RawPost = Omit<SimplePost, 'comments'> & {
  comments: {
    _key: string;
    replies: {
      _key: string;
    }[];
  }[];
};

export type Post = {
  id: string;
  createdAt: Date;
  videoUrl: string;
  caption: string;
  authorUsername: string;
  authorName: string;
  authorImage: string;
  visibility: 'public' | 'friends' | 'private';
  music?: string;
  likes: string[];
  saved: number;
  comments: Comment[];
  view: number;
  tags?: string[];
};

export type Comment = {
  text: string;
  username: string;
  likes: string[];
  replies: Reply[];
};

export type Reply = Omit<Comment, 'replies'>;
