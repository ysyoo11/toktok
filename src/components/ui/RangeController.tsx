import clsx from 'clsx';
import { ChangeEvent } from 'react';

type Props = {
  className?: string;
  value: number;
  max: number;
  min: number;
  step?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function RangeController({
  className,
  value,
  max,
  min,
  onChange,
  step = 1,
}: Props) {
  return (
    <div
      className={clsx(
        'group/range relative flex h-[0.125rem] min-w-[2rem] items-center rounded-full bg-white/30 hover:h-1',
        className,
      )}
    >
      <div
        className='h-full rounded-full bg-white'
        style={{ width: `${(value / max) * 100}%` }}
      />
      <input
        type='range'
        className='custom-range absolute w-full'
        max={isNaN(max) ? 1 : max}
        min={min}
        step={step}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
