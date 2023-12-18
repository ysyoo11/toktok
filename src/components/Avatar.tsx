import clsx from 'clsx';
import Image from 'next/image';

type Props = {
  className?: string;
  image: string;
  name: string;
  size?: 'xs' | 'sm' | 'base' | 'lg';
  hasBorder?: boolean;
};

export default function Avatar({
  className,
  image,
  name,
  size = 'base',
  hasBorder = false,
}: Props) {
  return (
    <div
      className={clsx(
        'relative shrink-0 overflow-hidden rounded-full',
        {
          'h-8 w-8': size === 'xs',
          'h-10 w-10': size === 'sm',
          'h-14 w-14': size === 'base',
          'h-16 w-16': size === 'lg',
          'border-2 border-white': hasBorder,
        },
        className,
      )}
    >
      <Image
        src={image}
        alt={`profile pic of ${name}`}
        fill
        className='object-cover object-center'
        sizes={size === 'lg' ? `10rem` : `3.5rem`}
      />
    </div>
  );
}
