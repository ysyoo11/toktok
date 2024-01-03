import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import {
  ChangeEvent,
  MouseEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import { SimplePost } from '@/model/post';

import MobileVideoInfo from './MobileVideoInfo';
import PostDetailMobileEngagementBar from './PostDetailMobileEngagementBar';
import SoundController from './SoundController';
import VideoController from './VideoController';

type Props = {
  post: SimplePost;
  location: 'modal' | 'page';
};

export default function DetailVideoPlayer({ post, location }: Props) {
  const { videoUrl } = post;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  const videoRef = useRef<HTMLVideoElement>(null);

  const videoDuration = videoRef.current?.duration ?? 0;

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
    setCurrentTime(e.currentTarget.currentTime);
  };

  const controlVolume = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    setVolume(+e.currentTarget.value);
  };

  const onProgressBarControl = (e: ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    setCurrentTime(+e.target.value);
    videoRef.current.currentTime = +e.target.value;
  };

  const toggleMute = (e: MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
    if (volume === 0) {
      setVolume(0.5);
    }
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

  return (
    <div
      className={clsx(
        'group relative flex w-full cursor-pointer items-center overflow-hidden',
        {
          'h-full xs:min-w-[512px]': location === 'modal',
        },
      )}
      onClick={togglePlayPause}
    >
      <div className='pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2'>
        {isPlaying ? (
          <PlayIcon className='h-32 w-32 animate-fade-out text-white' />
        ) : (
          <PauseIcon className='h-32 w-32 animate-fade-out text-white' />
        )}
      </div>
      <div
        className={clsx('relative flex w-full', {
          'h-full bg-gray-50/90 backdrop-blur-lg': location === 'page',
          'h-full': location === 'modal',
        })}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          playsInline
          onTimeUpdate={onTimeUpdate}
          autoPlay
          muted={isMuted}
          loop
          className='mx-auto'
        />
        <div className='absolute bottom-0 flex h-max w-full items-end bg-gradient-to-b from-transparent to-black/50 pb-4 transition-opacity group-hover:opacity-100 xs:opacity-0'>
          <div className='relative w-full space-y-1.5 px-4'>
            <div className='flex items-end justify-between xs:hidden'>
              <MobileVideoInfo post={post} />
              <PostDetailMobileEngagementBar post={post} />
            </div>
            <VideoController
              currentTime={currentTime}
              videoDuration={videoDuration}
              onProgressBarControl={onProgressBarControl}
            />

            <SoundController
              isMuted={isMuted}
              volume={volume}
              controlVolume={controlVolume}
              toggleMute={toggleMute}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
