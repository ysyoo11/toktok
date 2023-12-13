import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import { parseVideoTime } from '@/utils/parse-video-time';
import { videoTimeStringToSec } from '@/utils/videoTimeStringToSec';

type Props = {
  videoUrl: string;
};

export default function VideoPlayer({ videoUrl }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('00:00');

  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
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

  // 3. volume control

  // 4. adjust video in the frame when it's landscape

  return (
    <div className='relative w-56 overflow-hidden rounded-lg xs:w-64'>
      <video
        ref={videoRef}
        src={videoUrl}
        className=''
        playsInline
        onTimeUpdate={onTimeUpdate}
        loop
      />
      <div className='absolute bottom-0 flex h-1/3 w-full items-end bg-gradient-to-b from-transparent to-black/30 pb-6 opacity-100 transition-opacity hover:opacity-100'>
        <div className='space-y-1.5 px-4'>
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
              {/* TODO: Make custom progress bar */}
              <input
                type='range'
                className='w-28 cursor-pointer accent-white xs:w-36'
                max={Math.floor(videoRef.current.duration)}
                min={0}
                value={currentTime}
                onChange={onProgressBarControl}
              />
              <span className='text-xxs font-light text-white'>
                {currentTimeStr}&nbsp;/&nbsp;
                {parseVideoTime(videoRef.current.duration)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
