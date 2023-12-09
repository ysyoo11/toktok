import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Fragment } from 'react';

export type Option<T> = {
  title: string;
  value: T;
};

type Props<T> = {
  label?: string;
  options: Option<T>[];
  className?: string;
  full?: boolean;
  selected: Option<T>;
  onChange: (option: Option<T>) => void;
};

export default function Dropdown<T>({
  label,
  options,
  className,
  full,
  selected,
  onChange,
}: Props<T>) {
  return (
    <div className={className}>
      {label && (
        <label className='font-semibold capitalize text-gray-700'>
          {label}
        </label>
      )}
      <Listbox value={selected} onChange={onChange}>
        <div className='relative mt-1'>
          <Listbox.Button
            className={clsx(
              'relative cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm',
              full ? 'w-full' : 'min-w-[11rem]',
            )}
          >
            <span className='block truncate'>{selected.title}</span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options
              className={clsx(
                'absolute z-[1] mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm',
                full ? 'w-full' : 'min-w-[11rem]',
              )}
            >
              {options.map((option, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? 'bg-gray-100 text-theme-pink-100'
                        : 'text-gray-900'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.title}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
