import { BookmarkIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';

import { SimpleCollection } from '@/model/collection';

type Props = {
  username: string;
  collection: SimpleCollection;
};

export default function CollectionCard({
  username,
  collection: { id, firstVideoUrl, name, isPrivate },
}: Props) {
  return (
    <Link href={`/${username}/collections/${id}`}>
      <div
        className={clsx(
          'relative aspect-[4/6] overflow-hidden rounded-lg bg-gray-100',
        )}
      >
        {firstVideoUrl && <video src={firstVideoUrl} muted />}
        <div className='absolute bottom-0 flex h-1/3 w-full items-end justify-between bg-gradient-to-t from-black/30 to-transparent p-2 text-white'>
          <div>
            <BookmarkIcon className='h-6 w-6' />
            <span className='line-clamp-1 font-medium'>{name}</span>
          </div>
          {isPrivate && <LockClosedIcon className='h-6 w-6' />}
        </div>
      </div>
    </Link>
  );
}
