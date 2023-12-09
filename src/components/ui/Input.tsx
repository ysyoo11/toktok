'use client';

import clsx from 'clsx';
import { InputHTMLAttributes, useRef } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label?: string;
};

export default function Input({ className, label, ...props }: Props) {
  const { id, maxLength } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='flex flex-col space-y-1'>
      <div className='flex items-center justify-between'>
        <label htmlFor={id}>
          <span className='font-semibold capitalize text-gray-700'>
            {label}
          </span>
        </label>
        <span className='text-sm text-gray-400'>
          {inputRef.current?.value.length} / {maxLength}
        </span>
      </div>
      <input
        type='text'
        ref={inputRef}
        className={clsx('rounded-md border p-2', className)}
        {...props}
      />
    </div>
  );
}
