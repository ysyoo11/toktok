import { format } from 'timeago.js';

import { useUser } from '@/hooks/useUser';
import { SimplePost } from '@/model/post';

import Avatar from './Avatar';
import FollowButton from './FollowButton';

type Props = {
  post: SimplePost;
};

export default function PostInfo({ post }: Props) {
  const { authorImage, authorUsername, authorName, caption, createdAt } = post;
  const { user } = useUser();

  return (
    <div className='rounded-lg bg-gray-50 p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center'>
            <Avatar image={authorImage} name={authorUsername} size='sm' />
            <div className='ml-3 flex flex-col'>
              <span className='font-semibold'>{authorUsername}</span>
              <span className='text-sm text-gray-700'>
                {authorName}&nbsp;&middot;&nbsp;
                {format(createdAt)}
              </span>
            </div>
          </div>
          <FollowButton user={user} targetUsername={authorUsername} />
        </div>
      </div>
      <p className='mt-4 leading-snug text-gray-600'>{caption}</p>
    </div>
  );
}
