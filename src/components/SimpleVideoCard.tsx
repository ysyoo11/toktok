import { HeartIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { format } from 'timeago.js';

import { SimplePost } from '@/model/post';

type Props = {
  post: SimplePost;
};

export default function SimpleVideoCard({
  post: { videoUrl, id, authorUsername, likes, createdAt, caption },
}: Props) {
  const router = useRouter();

  const onClick = () => {
    router.push(`/post/${id}`, { scroll: false });
  };

  return (
    <div onClick={onClick} className='cursor-pointer'>
      <div className='relative w-full overflow-hidden rounded-md'>
        <video src={videoUrl} className=' object-fill object-center' />
      </div>
      <p className='mt-1.5 line-clamp-3 text-sm font-semibold'>{caption}</p>
      <span className='text-xs text-gray-500'>{authorUsername}</span>
      <div className='flex items-center text-xs text-gray-500'>
        <span>{format(createdAt)}</span>
        <div className='ml-2 flex items-center'>
          <HeartIcon className='h-4 w-4 stroke-2' />
          <span className='ml-0.5'>{likes.length}</span>
        </div>
      </div>
    </div>
  );
}
