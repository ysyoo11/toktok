import clsx from 'clsx';

type Props = {
  className?: string;
  src: string;
};

export default function VideoPreview({ className, src }: Props) {
  return (
    <video
      src={src}
      controls
      className={clsx(
        'mx-auto w-full rounded-xl sm:max-w-xs sm:px-0',
        className,
      )}
      playsInline
    />
  );
}
