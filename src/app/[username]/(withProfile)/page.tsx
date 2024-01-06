'use client';

import ProfilePostsGrid from '@/components/ProfilePostsGrid';
import SkeletonProfileCards from '@/components/skeleton/SkeletonProfileCards';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { UserPost } from '@/model/post';
import { POLICY } from '@/policy';

type Props = {
  params: {
    username: string;
  };
};

export default function ProfilePage({ params: { username } }: Props) {
  const {
    items: posts,
    loading,
    loadMore,
    isReachingEnd,
  } = useInfiniteScroll<UserPost>({
    fetchInput: `/api/user/${username}/posts`,
    fetchLimit: POLICY.POST_FETCH_LIMIT,
    sortOrder: 'createdAt',
  });

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
