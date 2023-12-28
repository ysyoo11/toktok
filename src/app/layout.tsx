import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';

import Header from '@/components/core/Header';
import SideNav from '@/components/core/SideNav';
import AuthContext from '@/context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';

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

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthContext session={session}>
          <Header />
          <SWRConfigContext>
            <>
              <div className='flex w-full' id='base-route'>
                <SideNav />
                <div className='mx-auto mt-16 w-full max-w-3xl px-3 lg:pl-0'>
                  {children}
                </div>
              </div>
              <div>{modal}</div>
            </>
          </SWRConfigContext>
        </AuthContext>
      </body>
    </html>
  );
}
