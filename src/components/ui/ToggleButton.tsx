import clsx from 'clsx';

type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
  wrapped?: boolean;
};

export default function ToggleButton({
  toggled,
  onToggle,
  onIcon,
  offIcon,
  wrapped = false,
}: Props) {
  return (
    <button
      onClick={() => onToggle(!toggled)}
      className={clsx(wrapped ? 'rounded-full bg-gray-100 p-1.5 sm:p-2.5' : '')}
    >
      {toggled ? onIcon : offIcon}
    </button>
  );
}
