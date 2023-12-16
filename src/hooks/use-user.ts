import useSWRImmutable from 'swr/immutable';

import type { User } from '@/model/user';

export function useUser() {
  const { data: user, isLoading } = useSWRImmutable<User>('/api/me');

  return {
    user,
    uid: user?.id,
    isLoading,
  };
}
