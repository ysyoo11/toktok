import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import ProfileCollectionSection from '@/components/ProfileCollectionSection';

type Props = {
  params: {
    username: string;
  };
};

export default async function ProfileCollectionsPage({
  params: { username },
}: Props) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return <ProfileCollectionSection username={username} authUser={user} />;
}
