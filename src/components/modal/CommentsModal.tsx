import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Fragment, useRef, useState } from 'react';
import { InView } from 'react-intersection-observer';

import useComments from '@/hooks/useComments';
import { SimplePost } from '@/model/post';

import CommentForm from '../CommentForm';
import PostComment from '../PostComment';
import Loading from '../ui/Loading';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  post: SimplePost;
  totalComments: number;
};

export default function CommentsModal({
  isOpen,
  onClose,
  post,
  totalComments,
}: Props) {
  const { comments, loading, loadMore, isReachingEnd, setLike, addComment } =
    useComments(post);
  const [mode, setMode] = useState<'comment' | 'reply'>('comment');
  const [replyTarget, setReplyTarget] = useState<{
    username: string;
    commentId: string;
  }>({ username: '', commentId: '' });
  const commentsListRef = useRef<HTMLUListElement>(null);

  const scrollToBottom = () => {
    commentsListRef.current?.scrollTo({
      behavior: 'smooth',
      top: commentsListRef.current.scrollHeight,
    });
  };

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
                  <ul
                    className='h-max max-h-96 w-full space-y-4 overflow-y-auto px-4'
                    onClick={() => setMode('comment')}
                    ref={commentsListRef}
                  >
                    {comments.map((comment) => (
                      <li key={comment.id}>
                        <PostComment
                          comment={comment}
                          postId={post.id}
                          setLike={setLike}
                          setMode={setMode}
                          setReplyTarget={setReplyTarget}
                        />
                      </li>
                    ))}
                    {loading && <Loading className='w-12' />}
                    {!isReachingEnd && (
                      <div className='py-2'>
                        <InView
                          as='div'
                          rootMargin='24px'
                          onChange={(inView) => {
                            if (inView) loadMore();
                          }}
                        />
                      </div>
                    )}
                  </ul>
                )}
                <CommentForm
                  postId={post.id}
                  mode={mode}
                  replyTarget={replyTarget}
                  addComment={addComment}
                  scrollToBottom={scrollToBottom}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
