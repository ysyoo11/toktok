import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '../api/auth/[...nextauth]/options';

type Props = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/signin');
  }

  return <div>{children}</div>;
}
