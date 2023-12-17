'use client';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Fragment, useCallback, useState } from 'react';

import GoogleLogo from '@/components/icon/GoogleLogo';
import Button from '@/components/ui/Button';
import { baseUrl } from '@/utils/env';

export default function LoginModal() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const router = useRouter();

  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  const pathname = usePathname();

  const handleGoogleSignin = () => {
    signIn('google', { callbackUrl: baseUrl + pathname });
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10'
        open={true}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all'>
                <div className='px-12 pb-4 pt-20'>
                  <Dialog.Title
                    as='h2'
                    className='text-center text-3xl font-bold leading-6 text-gray-800'
                  >
                    {mode === 'login' ? `Log in to` : `Sign up for`} TokTok
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className='absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100'
                  >
                    <XMarkIcon className='h-5 w-5 stroke-2' />
                  </button>

                  <div className='mt-8'>
                    <Button
                      onClick={handleGoogleSignin}
                      color='white'
                      size='sm'
                      icon={<GoogleLogo className='h-5 w-5' />}
                      full
                    >
                      Continue with Google
                    </Button>
                  </div>

                  <p className='mt-24 text-center text-xs text-gray-500'>
                    By continuing with an account located in Australia, you
                    agree to our Terms of Service and acknowledge that you have
                    read our Privacy Policy.
                  </p>
                </div>

                <div className='flex items-center justify-center border-t py-4 text-sm'>
                  <p>Don&apos;t have an account?</p>
                  <button
                    onClick={() =>
                      setMode(mode === 'login' ? 'signup' : 'login')
                    }
                    className='ml-1.5 font-medium text-theme-pink-100 hover:text-theme-pink-200'
                  >
                    {mode === 'login' ? 'Sign up' : 'Log in'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
