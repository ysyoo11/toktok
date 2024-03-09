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
  createdAt: string;
  updatedAt: string;
  videoUrl: string;
  caption: string;
  authorUsername: string;
  authorName: string;
  authorImage: string;
  visibility: 'public' | 'friends' | 'private';
  music?: string;
  likes: string[];
  bookmarks: string[];
  comments: Comment[];
  views: number;
  tags?: string[];
};

export type UserPost = Pick<
  Post,
  | 'id'
  | 'createdAt'
  | 'videoUrl'
  | 'caption'
  | 'visibility'
  | 'views'
  | 'updatedAt'
>;

export type Comment = {
  id: string;
  key: string;
  authorUsername: string;
  authorImage: string;
  text: string;
  likes: string[];
  replies: Reply[];
  createdAt: string;
  totalReplies: number;
};

export type Reply = Omit<Comment, 'replies' | 'totalReplies'>;
