import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import {
  ChangeEvent,
  MouseEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import { parseVideoTime } from '@/utils/parse-video-time';
import { videoTimeStringToSec } from '@/utils/videoTimeStringToSec';

import MutedIcon from './icon/MutedIcon';
import SoundIcon from './icon/SoundIcon';
import RangeController from './ui/RangeController';

type Props = {
  videoUrl: string;
};

export default function VideoPlayer({ videoUrl }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('00:00');
  const [volume, setVolume] = useState(1);

  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayPause = (e: MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const onTimeUpdate = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    setCurrentTimeStr(parseVideoTime(e.currentTarget.currentTime));
  };

  const onProgressBarControl = (e: ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    setCurrentTime(+e.target.value);
    videoRef.current.currentTime = +e.target.value;
  };

  useEffect(() => {
    const currTime = videoTimeStringToSec(currentTimeStr);
    setCurrentTime(currTime);
  }, [currentTimeStr]);

  const toggleMute = (e: MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
    if (volume === 0) {
      setVolume(0.5);
    }
  };

  const controlVolume = (e: ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    setVolume(+e.currentTarget.value);
  };

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.volume = volume;
    if (volume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  }, [volume]);

  // 4. adjust video in the frame when it's landscape

  return (
    <div className='group relative w-56 overflow-hidden rounded-lg xs:w-64'>
      <video
        ref={videoRef}
        src={videoUrl}
        className=''
        playsInline
        onTimeUpdate={onTimeUpdate}
        muted={isMuted}
        loop
      />
      <div className='absolute bottom-0 flex h-1/3 w-full items-end bg-gradient-to-b from-transparent to-black/30 pb-4 opacity-0 transition-opacity group-hover:opacity-100'>
        <div className='relative space-y-1.5 px-4'>
          <button
            className='p-1'
            onClick={togglePlayPause}
            aria-label='play pause toggle'
          >
            {isPlaying ? (
              <PauseIcon className='h-6 w-6 text-white' />
            ) : (
              <PlayIcon className='h-6 w-6 text-white' />
            )}
          </button>
          {videoRef.current && (
            <div className='flex items-center space-x-4'>
              <RangeController
                onChange={onProgressBarControl}
                value={currentTime}
                min={0}
                max={Math.floor(videoRef.current.duration)}
                className='w-28 xs:w-36'
              />
              <span className='text-xxs font-light text-white'>
                {currentTimeStr}&nbsp;/&nbsp;
                {parseVideoTime(videoRef.current.duration)}
              </span>
            </div>
          )}
          <div className='group/sound justify-itemscenter absolute right-5 top-0 flex flex-col'>
            <div className='relative'>
              <div className='absolute -left-5 bottom-5 flex h-6 w-16 -rotate-90 items-center justify-center rounded-full bg-gray-900/40 px-2.5 opacity-0 transition-opacity group-hover/sound:opacity-100'>
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
        </div>
      </div>
    </div>
  );
}
