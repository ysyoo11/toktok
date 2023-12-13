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
    isLikedByUser,
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
      <Avatar image={imageUrl} name={username} className='hidden xs:block' />
      <div className='flex w-full xs:pl-3'>
        <div className='w-full'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <Avatar
                image={imageUrl}
                name={username}
                className='xs:hidden'
                size='sm'
              />
              <div className='flex flex-col pl-2 xs:pl-0'>
                <span className='font-semibold'>{username}</span>
                <span className='text-xs text-gray-600 xs:text-sm'>{name}</span>
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
              <VideoPlayer videoUrl={videoUrl} />
              <PostEngagementBar
                videoId={_id}
                likesNum={likes ? likes.length : 0}
                commentsNum={totalCommentNum}
                savedNum={saved}
                isLikedByUser={isLikedByUser}
              />
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
