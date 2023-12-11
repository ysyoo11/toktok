import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useMemo } from 'react';

import { useUser } from '@/hooks/use-user';

type Engagement = 'like' | 'comment' | 'save' | 'share';
type EngagementItem = {
  type: Engagement;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  onClick: () => void;
  number: number;
  isEngaged?: boolean;
};

type Props = {
  videoId: string;
  likesNum: number;
  commentsNum: number;
  savedNum: number;
};

export default function PostEngagementBar({
  videoId,
  likesNum,
  commentsNum,
  savedNum,
}: Props) {
  const { uid } = useUser();

  // TODO:
  const handleLike = () => {};
  const handleComment = () => {};
  const handleSave = () => {};

  const engagementList: EngagementItem[] = useMemo(
    () => [
      {
        type: 'like',
        icon: HeartIcon,
        onClick: handleLike,
        number: likesNum,
        isEngaged: false, // TODO:
      },
      {
        type: 'comment',
        icon: ChatBubbleOvalLeftEllipsisIcon,
        onClick: handleComment,
        number: commentsNum,
      },
      {
        type: 'save',
        icon: BookmarkIcon,
        onClick: handleSave,
        number: savedNum,
        isEngaged: false, // TODO:
      },
    ],
    [likesNum, commentsNum, savedNum],
  );

  return (
    <ul className='flex flex-col px-4'>
      {engagementList.map(
        ({ type, onClick, number, isEngaged, ...item }, idx) => (
          <li key={`${type}-${idx}`} className='flex flex-col items-center'>
            <button
              onClick={onClick}
              className='rounded-full bg-gray-100 p-1.5 sm:p-2.5'
            >
              <item.icon
                className={clsx('h-5 w-5 sm:h-7 sm:w-7', {
                  'text-red-500': isEngaged && type === 'like',
                  'text-yellow-500': isEngaged && type === 'save',
                })}
              />
            </button>
            <span className='text-sm font-semibold text-gray-600'>
              {number}
            </span>
          </li>
        ),
      )}
    </ul>
  );
}
