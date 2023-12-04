'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

const colorClass = {
  pink: 'bg-theme-pink-100 text-white hover:bg-theme-pink-200',
  white: 'bg-white hover:bg-gray-100 border',
} as const;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: keyof typeof colorClass;
  className?: string;
};

export default function Button({ color = 'pink', className, ...props }: Props) {
  const { children } = props;

  return (
    <button
      className={clsx(
        'rounded px-6 py-1.5 font-medium disabled:cursor-default disabled:bg-gray-200 disabled:text-white',
        className,
        colorClass[color],
      )}
      {...props}
    >
      {children}
    </button>
  );
}
