import PostList from '@/components/PostList';

export default async function HomePage() {
  return (
    <main className='mx-auto w-full max-w-3xl'>
      <PostList />
    </main>
  );
}
