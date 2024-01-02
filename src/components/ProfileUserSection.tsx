'use client';

import { LockClosedIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { notFound, usePathname } from 'next/navigation';
import useSWRImmutable from 'swr/immutable';

import { useUser } from '@/hooks/useUser';
import { ProfileUser } from '@/model/user';

import ProfileUserInfo from './ProfileUserInfo';

const tabs = ['videos', 'collections', 'liked'] as const;

type Props = {
  username: string;
};

export default function ProfileUserSection({ username }: Props) {
  const detailedPath = usePathname().split(`/${username}`)[1];
  const selectedTab =
    detailedPath === '' ? 'videos' : detailedPath.replace('/', '');
  const { data: user, error } = useSWRImmutable<ProfileUser>(
    `/api/user/${username}`,
  );
  const { user: me } = useUser();

  if (error) notFound();

  const isMyPage = user && me ? user.id === me.id : false;
  const isFollowing = me
    ? Boolean(me.following.find((user) => user.username === username))
    : false;

  return (
    <>
      <ProfileUserInfo
        user={user}
        isMyPage={isMyPage}
        isFollowing={isFollowing}
      />
      <ul className='mt-4 flex w-full border-b'>
        {tabs.map((tab, idx) => (
          <li
            key={`profile-tab-${idx}`}
            className={clsx('flex basis-1/3 justify-center border-b-2', {
              'border-transparent text-gray-400': selectedTab !== tab,
              'border-gray-900 text-gray-900': selectedTab === tab,
              hidden: !isMyPage && tab === 'liked',
            })}
          >
            <Link
              className={clsx(
                'flex w-full items-center justify-center space-x-1 pb-1.5 text-sm sm:text-base',
              )}
              href={tab === 'videos' ? `/${username}` : `/${username}/${tab}`}
            >
              {tab === 'liked' && <LockClosedIcon className='h-4 w-4' />}
              <span className='capitalize'>{tab}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
