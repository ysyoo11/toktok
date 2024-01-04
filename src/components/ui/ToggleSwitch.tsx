'use client';

import { Switch } from '@headlessui/react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  toggleObject: string;
};

export default function ToggleSwitch({
  checked,
  setChecked,
  toggleObject,
}: Props) {
  return (
    <Switch
      as='div'
      checked={checked}
      onChange={setChecked}
      className={`${checked ? 'bg-teal-500' : 'bg-gray-300'}
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
    >
      <span className='sr-only'>Toggle {toggleObject}</span>
      <span
        aria-hidden='true'
        className={`${checked ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}
