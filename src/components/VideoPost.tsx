'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { SimplePost } from '@/model/post';

import Avatar from './Avatar';
import PostEngagementBar from './PostEngagementBar';
import Button from './ui/Button';
import VideoPlayer from './VideoPlayer';

type Props = {
  post: SimplePost;
  className?: string;
};

export default function VideoPost({ post, className }: Props) {
  const {
    authorName,
    authorUsername,
    authorImage,
    caption,
    music,
    videoUrl,
    id,
  } = post;

  const [isCaptionClamped, setIsCaptionClamped] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);

  const captionRef = useRef<HTMLParagraphElement>(null);

  const toggleCaptionStatus = () => {
    setShowFullCaption((prev) => !prev);
  };

  useEffect(() => {
    const caption = captionRef.current;
    if (caption && caption.scrollHeight > caption.clientHeight) {
      setIsCaptionClamped(true);
    }
  }, []);

  return (
    <div
      className={clsx(
        'mx-auto flex w-full max-w-md py-4 sm:mx-auto sm:max-w-lg sm:py-8',
        className,
      )}
    >
      <Avatar
        image={authorImage}
        name={authorUsername}
        className='hidden xs:block'
      />
      <div className='flex w-full xs:pl-3'>
        <div className='w-full'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <Avatar
                image={authorImage}
                name={authorName}
                className='xs:hidden'
                size='sm'
              />
              <div className='flex flex-col pl-2 xs:pl-0'>
                <span className='font-semibold'>{authorUsername}</span>
                <span className='text-xs text-gray-600 xs:text-sm'>
                  {authorName}
                </span>
              </div>
            </div>
            <Button color='white-theme' size='xs' className='xs:hidden'>
              Follow
            </Button>
          </div>
          <div className='mt-2 xs:mt-1'>
            <div className='flex items-end pr-10 text-sm xs:pr-0 xs:text-base'>
              <p
                ref={captionRef}
                className={clsx(
                  showFullCaption ? 'line-clamp-none' : 'line-clamp-2',
                )}
              >
                {caption}
              </p>
              {isCaptionClamped && (
                <button onClick={toggleCaptionStatus} className='font-medium'>
                  {showFullCaption ? 'hide' : 'more'}
                </button>
              )}
            </div>
            {/* TODO: */}
            {/* <p>{music}</p> */}
            <div className='mt-2 flex items-end'>
              <VideoPlayer videoUrl={videoUrl} id={id} />
              <PostEngagementBar post={post} />
            </div>
          </div>
        </div>
        <div className='pr-4'>
          <Button color='white-theme' size='sm' className='hidden xs:block'>
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
}
