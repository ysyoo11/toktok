import { ChangeEvent } from 'react';

import { parseVideoTime } from '@/utils/parse-video-time';

import RangeController from './ui/RangeController';

type Props = {
  currentTime: number;
  videoDuration: number;
  onProgressBarControl: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function VideoController({
  currentTime,
  videoDuration,
  onProgressBarControl,
}: Props) {
  return (
    <div className='flex w-full items-center space-x-4'>
      <RangeController
        onChange={onProgressBarControl}
        value={currentTime}
        min={0}
        max={Math.floor(videoDuration)}
        className='w-full basis-3/4'
      />
      <div className='flex basis-1/4 items-center text-center text-xs font-light text-white'>
        <div className='w-10'>{parseVideoTime(currentTime)}</div>
        <span>/</span>
        <div className='w-10'>
          {isNaN(videoDuration) ? '00:00' : parseVideoTime(videoDuration)}
        </div>
      </div>
    </div>
  );
}
