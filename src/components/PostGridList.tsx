import clsx from 'clsx';

import { SimplePost } from '@/model/post';

import SimpleVideoCard from './SimpleVideoCard';

type Props = {
  posts: SimplePost[];
  className?: string;
};

export default function PostGridList({ posts, className }: Props) {
  return (
    <ul className={clsx('grid grid-cols-3 gap-4 md:grid-cols-4', className)}>
      {posts.map((post) => (
        <li key={`grid-post-${post.id}`}>
          <SimpleVideoCard post={post} />
        </li>
      ))}
    </ul>
  );
}
