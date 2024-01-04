'use client';

import ProfilePostsGrid from '@/components/ProfilePostsGrid';
import SkeletonProfileCards from '@/components/skeleton/SkeletonProfileCards';
import useProfilePosts from '@/hooks/useProfilePosts';

type Props = {
  params: {
    username: string;
  };
};

export default function ProfilePage({ params: { username } }: Props) {
  const { posts, isReachingEnd, loadMore, loading } = useProfilePosts(username);

  if (posts.length === 0 && loading) return <SkeletonProfileCards />;

  return (
    <ProfilePostsGrid
      posts={posts}
      isReachingEnd={isReachingEnd}
      loadMore={loadMore}
      loading={loading}
    />
  );
}
