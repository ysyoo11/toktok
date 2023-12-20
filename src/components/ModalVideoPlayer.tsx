import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Link from 'next/link';
import {
  ChangeEvent,
  MouseEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import { SimplePost } from '@/model/post';
import { parseVideoTime } from '@/utils/parse-video-time';
import { videoTimeStringToSec } from '@/utils/videoTimeStringToSec';

import MutedIcon from './icon/MutedIcon';
import SoundIcon from './icon/SoundIcon';
import PostDetailMobileEngagementBar from './PostDetailMobileEngagementBar';
import RangeController from './ui/RangeController';

type Props = {
  post: SimplePost;
};

// TODO: Refactor - reduce JS bundle size
export default function ModalVideoPlayer({ post }: Props) {
  const { videoUrl, authorImage, authorName, authorUsername, caption } = post;
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('00:00');
  const [volume, setVolume] = useState(1);
  const [isCaptionClamped, setIsCaptionClamped] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

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
  const toggleCaptionStatus = (e: MouseEvent) => {
    e.stopPropagation();
    setShowFullCaption((prev) => !prev);
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

  useEffect(() => {
    const caption = captionRef.current;
    if (caption && caption.scrollHeight > caption.clientHeight) {
      setIsCaptionClamped(true);
    }
  }, []);

  return (
    <div
      onClick={togglePlayPause}
      className='group relative w-full cursor-pointer overflow-hidden'
    >
      <div className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        {isPlaying ? (
          <PlayIcon className='h-32 w-32 animate-fade-out text-white' />
        ) : (
          <PauseIcon className='h-32 w-32 animate-fade-out text-white' />
        )}
      </div>
      <video
        ref={videoRef}
        src={videoUrl}
        playsInline
        onTimeUpdate={onTimeUpdate}
        // autoPlay
        muted={isMuted}
        loop
      />
      <div className='absolute bottom-0 flex h-max w-full items-end bg-gradient-to-b from-transparent to-black/50 pb-4'>
        <div className='relative w-full space-y-1.5 px-4'>
          <div className='flex items-end justify-between'>
            <div className='basis-4/5'>
              <Link href={`/${authorUsername}`}>
                <span className='text-lg font-medium text-white'>
                  {authorName}
                </span>
              </Link>
              <div className='mt-2 flex items-end'>
                <p
                  ref={captionRef}
                  className={clsx(
                    'text-gray-100/80',
                    showFullCaption ? 'line-clamp-none' : 'line-clamp-2',
                  )}
                >
                  {caption}
                </p>
                <button
                  onClick={toggleCaptionStatus}
                  className='ml-0.5 font-medium text-gray-100/90'
                >
                  {showFullCaption ? 'hide' : 'more'}
                </button>
              </div>
            </div>
            <div className='pb-2'>
              <PostDetailMobileEngagementBar post={post} />
            </div>
          </div>
          <button
            className='hidden p-1 md:block'
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
            <>
              <div className='flex w-full items-center space-x-4'>
                <RangeController
                  onChange={onProgressBarControl}
                  value={currentTime}
                  min={0}
                  max={Math.floor(videoRef.current.duration)}
                  className='w-full basis-3/4'
                />
                <div className='flex basis-1/4 items-center text-center text-xs font-light text-white'>
                  <div className='w-10'>{currentTimeStr}</div>
                  <span>/</span>
                  <div className='w-10'>
                    {isNaN(videoRef.current.duration)
                      ? '00:00'
                      : parseVideoTime(videoRef.current.duration)}
                  </div>
                </div>
              </div>

              <div className='group/sound justify-itemscenter absolute right-5 top-0 hidden flex-col md:flex'>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
