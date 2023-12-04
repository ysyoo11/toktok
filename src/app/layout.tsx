import { Inter } from 'next/font/google';

import Header from '@/components/core/Header';
import SideNav from '@/components/core/SideNav';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        <div className='flex'>
          <SideNav />
          <div className='ml-4 mt-16 min-h-[4000px] py-4'>{children}</div>
        </div>
      </body>
    </html>
  );
}
