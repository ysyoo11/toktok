import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { SimplePost } from '@/model/post';
import { baseUrl } from '@/utils/env';

import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import CreatorVideosSection from './CreatorVideosSection';
import PostEngagementBar from './PostEngagementBar';
import PostInfo from './PostInfo';
import UrlCopyBox from './UrlCopyBox';

type Tab = 'comments' | 'videos';

type Props = {
  post: SimplePost;
};

export default function PostDetailSidebar({ post }: Props) {
  const { comments: commentsNum, authorUsername } = post;
  const [view, setView] = useState<Tab>('comments');

  const pathname = usePathname();
  const currentUrl = baseUrl + pathname;

  return (
    <div className='hidden h-full w-full max-w-lg bg-white xs:block'>
      <div className='flex h-full w-full flex-col'>
        <div className='p-4'>
          <PostInfo post={post} />
          <PostEngagementBar post={post} horizontal className='mt-2' />
          <UrlCopyBox url={currentUrl} />
        </div>

        <div>
          <div className='sticky top-0 z-[1] flex w-full items-center border-b bg-white px-6 pt-4'>
            <button
              onClick={() => setView('comments')}
              className={clsx('w-full pb-3 text-center text-sm font-semibold', {
                'border-b border-b-black text-black': view === 'comments',
                'text-gray-400': view !== 'comments',
              })}
            >
              Comments ({commentsNum})
            </button>
            <button
              onClick={() => setView('videos')}
              className={clsx('w-full pb-2 text-center text-sm font-semibold', {
                'border-b border-b-black text-black': view === 'videos',
                'text-gray-400': view !== 'videos',
              })}
            >
              Creator videos
            </button>
          </div>
          {view === 'comments' && (
            <>
              <CommentsList
                post={post}
                location='mobile-sidebar'
                className='px-6 pt-1'
              />
              <CommentForm className='sticky bottom-0' />
            </>
          )}
          {view === 'videos' && (
            <CreatorVideosSection username={authorUsername} />
          )}
        </div>
      </div>
    </div>
  );
}
