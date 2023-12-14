'use client';

import useSWR from 'swr';

import { SimplePost } from '@/model/post';

import VideoPost from './VideoPost';

export default function PostList() {
  const { data: posts, isLoading } = useSWR<SimplePost[]>('/api/posts');

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
