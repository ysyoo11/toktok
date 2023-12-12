import clsx from 'clsx';
import Image from 'next/image';

type Props = {
  className?: string;
  image: string;
  name: string;
  size?: 'sm' | 'base' | 'lg';
};

export default function Avatar({
  className,
  image,
  name,
  size = 'base',
}: Props) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-full',
        {
          'h-10 w-10': size === 'sm',
          'h-14 w-14': size === 'base',
          'h-16 w-16': size === 'lg',
        },
        className,
      )}
    >
      <Image
        src={image}
        alt={`profile pic of ${name}`}
        fill
        className='object-cover object-center'
        sizes={size === 'lg' ? `10rem` : `2.5rem`}
      />
    </div>
  );
}
