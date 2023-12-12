'use client';

import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Video } from '@/types';

import Avatar from './Avatar';
import PostEngagementBar from './PostEngagementBar';
import Button from './ui/Button';
import VideoPlayer from './VideoPlayer';

type Props = {
  video: Video;
  className?: string;
};

export default function VideoPost({ video, className }: Props) {
  const {
    author: { imageUrl, username, name },
    caption,
    music,
    videoUrl,
    likes,
    comments,
    saved,
    _id,
  } = video;

  const [isCaptionClamped, setIsCaptionClamped] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);

  const captionRef = useRef<HTMLParagraphElement>(null);

  const totalCommentNum = useMemo(() => {
    const repliesNum = comments.reduce(
      (partialSum, currComment) => partialSum + currComment.replies.length,
      0,
    );
    return repliesNum + comments.length;
  }, [comments]);

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
      className={clsx('mx-auto flex w-full max-w-lg py-4 sm:py-8', className)}
    >
      <Avatar image={imageUrl} name={username} className='xs:block hidden' />
      <div className='xs:pl-3 flex w-full'>
        <div className='w-full'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <Avatar
                image={imageUrl}
                name={username}
                className='xs:hidden'
                size='sm'
              />
              <div className='xs:pl-0 flex flex-col pl-2'>
                <span className='font-semibold'>{username}</span>
                <span className='text-xs text-gray-600'>{name}</span>
              </div>
            </div>
            <Button color='white-theme' size='xs' className='xs:hidden'>
              Follow
            </Button>
          </div>
          <div className='xs:mt-1 mt-2'>
            <div className='xs:pr-0 xs:text-base flex items-end pr-10 text-sm'>
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
              <VideoPlayer videoUrl={videoUrl} />
              <PostEngagementBar
                videoId={_id}
                likesNum={likes.length}
                commentsNum={totalCommentNum}
                savedNum={saved}
              />
            </div>
          </div>
        </div>
        <div className='pr-4'>
          <Button color='white-theme' size='sm' className='xs:block hidden'>
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
}
