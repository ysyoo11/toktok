'use client';

import usePosts from '@/hooks/usePosts';

import VideoPost from './VideoPost';

export default function PostList() {
  const { posts, isLoading } = usePosts();

  return (
    <section>
      {isLoading && <p>Loading...</p>}
      {posts && (
        <ul className='divide-y'>
          {posts.map((post, idx) => (
            <li key={post.id}>
              <VideoPost post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
