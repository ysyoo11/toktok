import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';

import useComments from '@/hooks/useComments';

import PostComment from '../PostComment';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  totalComments: number;
};

export default function CommentsModal({
  isOpen,
  onClose,
  postId,
  totalComments,
}: Props) {
  const { comments, loading } = useComments(postId);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='fixed inset-0 z-10' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>

        <div className='fixed bottom-0 left-0 right-0 '>
          <div className='flex min-h-full items-center justify-center text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-200'
              enterFrom='opacity-0 translate-y-12'
              enterTo='opacity-100 translate-y-0'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-12'
            >
              <Dialog.Panel className='w-full transform overflow-hidden rounded-t-lg bg-white pb-4 text-left align-middle shadow-xl transition-all'>
                <div className='px-4 pb-4 pt-6'>
                  <p className='text-center font-medium leading-6 text-gray-700'>
                    {totalComments}{' '}
                    {totalComments === 1 ? 'comment' : 'comments'}
                  </p>
                  <button onClick={onClose} className='absolute right-4 top-5'>
                    <XMarkIcon className='h-5 w-5 stroke-2' />
                  </button>
                </div>
                {loading && <p className='text-center'>Loading comments...</p>}
                {comments && (
                  <ul className='h-max max-h-80 w-full space-y-4 overflow-y-auto px-4'>
                    {comments.map((comment) => (
                      <li key={comment.key}>
                        <PostComment comment={comment} postId={postId} />
                      </li>
                    ))}
                  </ul>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
