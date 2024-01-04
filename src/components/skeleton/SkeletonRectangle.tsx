import clsx from 'clsx';

type Props = {
  className?: string;
};

export default function SkeletonRectangle({ className }: Props) {
  return (
    <div className={clsx('animate-pulse rounded-lg bg-gray-300', className)} />
  );
}
