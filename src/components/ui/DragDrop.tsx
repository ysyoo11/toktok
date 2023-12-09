'use client';

import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { DragEvent, useState } from 'react';

import validateFileSize from '@/utils/validate-file-size';

type Props = {
  className?: string;
  id?: string;
  validFileTypes: string[];
  onDropFile: (file: File) => void | Promise<void>;
  maximumSize?: number; // MB
};

function eventPreventDefaultPropagation(e: DragEvent<HTMLDivElement>) {
  e.preventDefault();
  e.stopPropagation();
}

export default function DragDrop({
  className,
  id = 'file-upload',
  validFileTypes,
  onDropFile,
  maximumSize = 1000,
}: Props) {
  const [dragOverStatus, setDragOverStatus] = useState(false);

  const acceptableFileTypes = validFileTypes.join(', ');

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    eventPreventDefaultPropagation(e);
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
    setDragOverStatus(true);
  };
  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    eventPreventDefaultPropagation(e);
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
    setDragOverStatus(false);
  };
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    eventPreventDefaultPropagation(e);
    setDragOverStatus(false);
    const droppedFile = e.dataTransfer.files[0];
    if (!validFileTypes.includes(droppedFile.type)) {
      throw new Error(`Invalid file type: ${droppedFile.type ?? 'Unknown'}`);
    }
    if (!validateFileSize(droppedFile, maximumSize)) {
      throw new Error(`File size should not exceed ${maximumSize}MB`);
    }
    onDropFile(droppedFile);
  };

  return (
    <div
      className={clsx(
        'flex h-[440px] w-full items-center rounded-md border border-dashed',
        className,
        dragOverStatus ? 'border-gray-700 bg-gray-200' : 'border-gray-400',
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {dragOverStatus ? (
        <p className='w-full text-center text-2xl font-medium'>
          Drop a file here
        </p>
      ) : (
        <div className='mx-auto flex max-w-sm flex-col items-center'>
          <CloudArrowUpIcon className='h-10 w-10 text-gray-400' />
          <div className='mt-6 flex flex-col items-center'>
            <p className='text-lg font-medium'>Select video to upload</p>
            <p className='text-center text-sm text-gray-600'>
              Or drag and drop a file
              <br />
              MP4 or WebM
            </p>
            <div className='mt-2 flex flex-col space-y-1 text-center text-sm text-gray-400'>
              <span>720x1280 resolution or higher</span>
              <span>Up to 1 minutes</span>
              <span>Less than 1 GB</span>
            </div>
          </div>
          <label htmlFor={id} className='mt-8 w-full'>
            <span className='block w-full cursor-pointer rounded-md bg-theme-pink-100 py-2 text-center text-white hover:bg-theme-pink-200'>
              Select file
            </span>
            <input
              type='file'
              id={id}
              name='file-upload'
              className='sr-only'
              accept={acceptableFileTypes}
              onChange={(e) => {
                if (!e.target.files || !e.target.files[0]) return;

                const file = e.target.files[0];

                if (!validateFileSize(file, maximumSize)) {
                  throw new Error(
                    `File size should not exceed ${maximumSize}MB`,
                  );
                }

                onDropFile(file);
              }}
            />
          </label>
        </div>
      )}
    </div>
  );
}
