import useSWRImmutable from 'swr/immutable';

import { USER_SWR_KEY } from '@/swr';

import type { User } from '@/model/user';

export function useUser() {
  const { data: user, isLoading } = useSWRImmutable<User | null>(
    USER_SWR_KEY.GET_ME,
    () => fetch('/api/me').then((res) => res.json()),
  );

  return {
    user,
    uid: user?.id,
    isLoading,
  };
}
