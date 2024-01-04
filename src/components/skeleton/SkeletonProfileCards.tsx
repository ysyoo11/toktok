import clsx from 'clsx';

import SkeletonRectangle from './SkeletonRectangle';

type Props = {
  className?: string;
};
export default function SkeletonProfileCards({ className }: Props) {
  return (
    <section className={clsx('mt-6 lg:mt-10', className)}>
      <ul className='grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
        {[...new Array(12)].map((_, idx) => (
          <li key={`skeleton-box-${idx}`}>
            <SkeletonRectangle className='aspect-[4/6]' />
          </li>
        ))}
      </ul>
    </section>
  );
}
