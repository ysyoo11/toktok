'use client';

import usePosts from '@/hooks/usePosts';
import { useUser } from '@/hooks/useUser';

import VideoPost from './VideoPost';

export default function PostList() {
  const { posts, isLoading } = usePosts();
  const { user } = useUser();

  return (
    <section>
      {isLoading && <p>Loading...</p>}
      {posts && (
        <ul className='divide-y'>
          {posts.map((post) => (
            <li key={post.id}>
              <VideoPost post={post} user={user} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
