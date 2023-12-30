import clsx from 'clsx';
import Link from 'next/link';
import { MouseEvent, useEffect, useRef, useState } from 'react';

import { SimplePost } from '@/model/post';

type Props = {
  post: SimplePost;
};

export default function MobileVideoInfo({
  post: { authorUsername, authorName, caption },
}: Props) {
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [isCaptionClamped, setIsCaptionClamped] = useState(false);
  const captionRef = useRef<HTMLParagraphElement>(null);

  const toggleCaptionStatus = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.stopPropagation();
    setShowFullCaption((prev) => !prev);
  };

  useEffect(() => {
    const caption = captionRef.current;
    if (caption && caption.scrollHeight > caption.clientHeight) {
      setIsCaptionClamped(true);
    }
  }, []);

  return (
    <div className='basis-4/5'>
      <Link href={`/${authorUsername}`}>
        <span className='text-lg font-medium text-white'>{authorName}</span>
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
  );
}
