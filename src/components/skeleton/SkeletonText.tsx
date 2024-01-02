import clsx from 'clsx';

type Props = {
  className?: string;
  textSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
};

export default function SkeletonText({ className, textSize = 'base' }: Props) {
  return (
    <div
      className={clsx(
        'min-w-[32px] animate-pulse rounded-lg bg-gray-300 text-xl',
        {
          'h-3': textSize === 'xs',
          'h-[0.875rem]': textSize === 'sm',
          'h-4': textSize === 'base',
          'h-[1.125rem]': textSize === 'lg',
          'h-5': textSize === 'xl',
        },
        className,
      )}
    />
  );
}
