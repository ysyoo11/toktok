import useSWRImmutable from 'swr/immutable';

import { USER_SWR_KEY } from '@/swr';

import type { SimpleUser } from '@/model/user';

export function useUser() {
  const { data: user, isLoading } = useSWRImmutable<SimpleUser>(
    USER_SWR_KEY.GET_ME,
    () => fetch('/api/me').then((res) => res.json()),
    {
      shouldRetryOnError: false,
    },
  );

  return {
    user,
    uid: user?.id,
    isLoading,
  };
}
