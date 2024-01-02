import clsx from 'clsx';

type Props = {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  className?: string;
};

export default function SkeletonAvatar({ size, className }: Props) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-full bg-gray-300',
        {
          'h-8 w-8': size === 'xs',
          'h-10 w-10': size === 'sm',
          'h-14 w-14': size === 'base',
          'h-16 w-16': size === 'lg',
          'h-20 w-20': size === 'xl',
        },
        className,
      )}
    />
  );
}
