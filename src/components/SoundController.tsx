import { ChangeEvent, MouseEvent } from 'react';

import MutedIcon from './icon/MutedIcon';
import SoundIcon from './icon/SoundIcon';
import RangeController from './ui/RangeController';

type Props = {
  isMuted: boolean;
  volume: number;
  controlVolume: (e: ChangeEvent<HTMLInputElement>) => void;
  toggleMute: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
};

export default function SoundController({
  isMuted,
  volume,
  controlVolume,
  toggleMute,
}: Props) {
  return (
    <div className='group/sound justify-itemscenter absolute right-5 top-0 hidden flex-col xs:-top-1.5 md:flex'>
      <div className='relative'>
        <div className='absolute -left-5 bottom-5 flex h-6 w-16 -rotate-90 items-center justify-center rounded-full bg-black/50 px-2.5'>
          <RangeController
            min={0}
            max={1}
            value={isMuted ? 0 : volume}
            step={0.1}
            onChange={controlVolume}
            className='w-full'
          />
        </div>
      </div>
      <button onClick={toggleMute}>
        {isMuted ? (
          <MutedIcon className='h-6 w-6 fill-white' />
        ) : (
          <SoundIcon className='h-6 w-6 fill-white' />
        )}
      </button>
    </div>
  );
}
