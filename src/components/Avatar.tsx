type Props = {
  image: string;
  name: string;
  size?: 'sm' | 'base';
};

export default function Avatar({ image, name, size = 'base' }: Props) {
  return (
    <div className='relative h-10 w-10 overflow-hidden rounded-full'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={`profile pic of ${name}`}
        className='object-cover object-center'
        sizes={size === 'base' ? `10rem` : `2.5rem`}
      />
    </div>
  );
}
