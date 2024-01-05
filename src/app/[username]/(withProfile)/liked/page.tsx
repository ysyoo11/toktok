'use client';

import ProfilePostsGrid from '@/components/ProfilePostsGrid';
import SkeletonProfileCards from '@/components/skeleton/SkeletonProfileCards';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { POLICY } from '@/policy';

import type { UserPost } from '@/model/post';

type Props = {
  params: {
    username: string;
  };
};

export default function ProfileLikedPage({ params: { username } }: Props) {
  const {
    items: posts,
    loading,
    loadMore,
    isReachingEnd,
  } = useInfiniteScroll<UserPost>({
    fetchInput: `/api/user/${username}/liked`,
    fetchLimit: POLICY.POST_FETCH_LIMIT,
    sortOrder: 'updatedAt',
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
