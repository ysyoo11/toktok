'use client';

import { LockClosedIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import ProfilePostsSection from '@/components/ProfilePostsSection';
import ProfileUserSection from '@/components/ProfileUserSection';
import Loading from '@/components/ui/Loading';
import { useUser } from '@/hooks/useUser';
import { ProfileUser } from '@/model/user';

type Props = {
  params: {
    username: string;
  };
};

const tabs = ['videos', 'favorites', 'liked'] as const;
type ProfileTab = (typeof tabs)[number];

export default function ProfilePage({ params: { username } }: Props) {
  const { data: user, error } = useSWRImmutable<ProfileUser>(
    `/api/user/${username}`,
  );
  const { user: me } = useUser();

  const [selectedTab, setSelectedTab] = useState<ProfileTab>('videos');

  if (error) notFound();

  if (!user)
    return (
      <div className='py-20'>
        <Loading className='w-12' />
      </div>
    );

  const isMyPage = user.id === me?.id;

  return (
    <main className='mx-auto max-w-7xl pb-20'>
      <ProfileUserSection user={user} isMyPage={isMyPage} />
      <ul className='mt-4 flex w-full border-b'>
        {tabs.map((tab, idx) => (
          <li
            key={`profile-tab-${idx}`}
            className={clsx('flex basis-1/3 justify-center border-b-2', {
              'border-transparent text-gray-400': selectedTab !== tab,
              'border-gray-900 text-gray-900': selectedTab === tab,
              hidden: !isMyPage && tab !== 'videos',
            })}
          >
            <button
              className={clsx(
                'flex w-full items-center justify-center space-x-1 pb-1.5 text-sm sm:text-base',
              )}
              onClick={() => setSelectedTab(tab)}
            >
              {tab !== 'videos' && <LockClosedIcon className='h-4 w-4' />}
              <span className='capitalize'>{tab}</span>
            </button>
          </li>
        ))}
      </ul>
      {selectedTab === 'videos' && <ProfilePostsSection username={username} />}
    </main>
  );
}
