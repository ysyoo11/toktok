import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

type Props = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) redirect('/signin');
  return <>{children}</>;
}
