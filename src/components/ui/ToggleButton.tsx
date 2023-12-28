import clsx from 'clsx';

type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
  wrapped?: boolean;
  horizontal?: boolean;
};

export default function ToggleButton({
  toggled,
  onToggle,
  onIcon,
  offIcon,
  wrapped = false,
  horizontal = false,
}: Props) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle(!toggled);
      }}
      className={clsx(wrapped ? 'rounded-full bg-gray-100' : '', {
        'p-2': horizontal,
        'p-1.5 sm:p-2.5': !horizontal,
      })}
    >
      {toggled ? onIcon : offIcon}
    </button>
  );
}
