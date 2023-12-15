'use client';

import { usePathname } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import GoogleLogo from '@/components/icon/GoogleLogo';
import Button from '@/components/ui/Button';
import { baseUrl } from '@/utils/env';

export default function SigninPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const pathname = usePathname();

  const handleGoogleSignin = () => {
    signIn('google', { callbackUrl: baseUrl + pathname });
  };
  return (
    <div className='mx-auto w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle transition-all'>
      <div className='px-12 pb-4 pt-20'>
        <h2 className='text-center text-3xl font-bold leading-6 text-gray-800'>
          {mode === 'login' ? `Log in to` : `Sign up for`} TokTok
        </h2>

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
          By continuing with an account located in Australia, you agree to our
          Terms of Service and acknowledge that you have read our Privacy
          Policy.
        </p>
      </div>

      <div className='flex items-center justify-center border-t py-4 text-sm'>
        <p>Don&apos;t have an account?</p>
        <button
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          className='ml-1.5 font-medium text-theme-pink-100 hover:text-theme-pink-200'
        >
          {mode === 'login' ? 'Sign up' : 'Log in'}
        </button>
      </div>
    </div>
  );
}
