'use client';

import { usePathname } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function ModalLayout({ children }: Props) {
  const pathname = usePathname();
  return pathname.startsWith('/post/') ? children : null;
}
