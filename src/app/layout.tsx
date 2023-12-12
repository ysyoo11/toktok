import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { ReactNode } from 'react';

import Header from '@/components/core/Header';
import SideNav from '@/components/core/SideNav';
import AuthProvider from '@/context/auth-provider';

import { authOptions } from './api/auth/[...nextauth]/options';

import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: 'TokTok | %s',
    default: 'TokTok',
  },
  description: 'Make your day',
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider session={session}>
          <Header />
          <div className='flex w-full'>
            <SideNav />
            <div className='mx-auto mt-16 min-h-[4000px] w-full max-w-3xl px-3 lg:pl-0'>
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
