import Lottie from 'lottie-react';

import loading from '../../../public/lottie/loading.json';

type Props = {
  className?: string;
};

export default function Loading({ className }: Props) {
  return (
    <div className='flex w-full items-center justify-center'>
      <Lottie animationData={loading} loop={true} className={className} />
    </div>
  );
}
