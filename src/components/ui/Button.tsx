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
  size?: 'sm' | 'base';
  icon?: JSX.Element;
  full?: boolean;
};

export default function Button({
  color = 'pink',
  className,
  size = 'base',
  icon,
  full = false,
  ...props
}: Props) {
  const { children } = props;

  return (
    <button
      className={clsx(
        'relative rounded px-6 py-2 font-medium disabled:cursor-default disabled:bg-gray-200 disabled:text-white',
        {
          'w-full': full,
          'text-sm': size === 'sm',
        },
        className,
        colorClass[color],
      )}
      {...props}
    >
      {icon && <i className='absolute left-2'>{icon}</i>}
      {children}
    </button>
  );
}
