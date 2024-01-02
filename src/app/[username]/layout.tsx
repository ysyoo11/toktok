import ProfileUserSection from '@/components/ProfileUserSection';

type Props = {
  children: React.ReactNode;
  params: {
    username: string;
  };
};

export default function ProfilePageLayout({
  children,
  params: { username },
}: Props) {
  return (
    <main className='mx-auto max-w-7xl pb-20'>
      <ProfileUserSection username={username} />
      {children}
    </main>
  );
}
