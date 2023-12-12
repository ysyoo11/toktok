'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

const colorClass = {
  pink: 'bg-theme-pink-100 text-white hover:bg-theme-pink-200',
  'white-theme':
    'bg-white border-theme-pink-100 text-theme-pink-100 hover:bg-theme-pink-100/10 border',
  white: 'bg-white hover:bg-gray-100 border',
} as const;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: keyof typeof colorClass;
  className?: string;
  size?: 'xs' | 'sm' | 'base';
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
        'relative rounded font-medium disabled:cursor-default disabled:bg-gray-200 disabled:text-white',
        {
          'w-full px-6 py-2': full,
          'px-6 py-2 text-base': size === 'base',
          'px-6 py-2 text-sm': size === 'sm',
          'px-5 py-1.5 text-xs': size === 'xs',
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
