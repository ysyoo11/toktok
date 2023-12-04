'use client';

import { GlobeAltIcon, HomeIcon, UsersIcon } from '@heroicons/react/24/outline';
import {
  GlobeAltIcon as SolidGlobeAlt,
  HomeIcon as SolidHomeIcon,
  UsersIcon as SolidUserIcon,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navs = [
  {
    name: 'For You',
    href: '/',
    icon: HomeIcon,
    activeIcon: SolidHomeIcon,
  },
  {
    name: 'Following',
    href: '/following',
    icon: UsersIcon,
    activeIcon: SolidUserIcon,
  },
  {
    name: 'Explore',
    href: '/explore',
    icon: GlobeAltIcon,
    activeIcon: SolidGlobeAlt,
  },
] as const;

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className='sticky top-0 flex h-screen shrink-0 flex-col overflow-hidden border-r lg:w-56 lg:border-r-0'>
      <div className='mt-20 shrink-0 px-1'>
        <nav>
          <ul className='space-y-0'>
            {navs.map(({ name, href, ...nav }, idx) => (
              <li key={`nav-${name}-${idx}`}>
                <Link href={href}>
                  <div className='flex items-center rounded-lg p-3 hover:bg-gray-100 lg:space-x-3'>
                    {pathname === href ? (
                      <nav.activeIcon className='text-theme-pink-100 h-6 w-6 stroke-2' />
                    ) : (
                      <nav.icon className='h-6 w-6 stroke-2' />
                    )}
                    <span
                      className={clsx('hidden text-lg font-semibold lg:block', {
                        'text-theme-pink-100': pathname === href,
                      })}
                    >
                      {name}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
