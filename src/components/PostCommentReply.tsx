import { useUser } from '@/hooks/useUser';

import Avatar from './Avatar';

import type { Reply } from '@/model/post';

type Props = {
  reply: Reply;
};

export default function PostCommentReply({
  reply: { authorImage, authorUsername, text },
}: Props) {
  const { user } = useUser();
  return (
    <div className='flex'>
      <Avatar size='xs' image={authorImage} name={authorUsername} />
      <div className='ml-2'>
        <span className='font-medium text-gray-500'>{authorUsername}</span>
        {authorUsername === user?.username && (
          <span>
            &nbsp;&middot;&nbsp;
            <span className='text-theme-pink-100'>Author</span>
          </span>
        )}
        <p>{text}</p>
      </div>
    </div>
  );
}
