import { useSession } from 'next-auth/react';
import useSWRImmutable from 'swr/immutable';

import { getUserByEmail } from '@/sanity/utils/user';

export function useUser() {
  const { data: session, status } = useSession();

  const { data: user, isLoading } = useSWRImmutable(
    `${session?.user?.email}-${status}`,
    () => getUserByEmail(session?.user?.email!),
  );

  return {
    user,
    uid: user ? user._id : undefined,
    isLoading,
  };
}
