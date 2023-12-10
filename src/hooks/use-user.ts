import { useSession } from 'next-auth/react';
import useSWRImmutable from 'swr/immutable';

import { User } from '@/types';

export function useUser() {
  const { data: session, status } = useSession();

  const { data: user, isLoading } = useSWRImmutable<User>(
    `${session?.user.username}-${status}`,
    () => fetch('/api/me').then((res) => res.json()),
  );

  return {
    user,
    uid: user?.id,
    isLoading,
  };
}
