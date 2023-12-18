'use client';

import { FormEvent, useEffect, useState } from 'react';

import Button from '@/components/ui/Button';
import DragDrop from '@/components/ui/DragDrop';
import Dropdown, { Option } from '@/components/ui/Dropdown';
import Input from '@/components/ui/Input';
import VideoPreview from '@/components/VideoPreview';
import { useUser } from '@/hooks/useUser';
import { createPost } from '@/lib/posts';

const VALID_FILE_TYPES = ['video/mp4', 'video/webm'];

type Visibility = 'public' | 'friends' | 'private';

export type VideoPostForm = {
  caption: string;
  file: Blob | null;
  authorId?: string;
  visibility: Visibility;
};

const initialState: VideoPostForm = {
  caption: '',
  file: null,
  authorId: undefined,
  visibility: 'public',
};

const visibilityOptions: Option<Visibility>[] = [
  {
    title: 'Public',
    value: 'public',
  },
  {
    title: 'Friends only',
    value: 'friends',
  },
  {
    title: 'Private',
    value: 'private',
  },
];

export default function UploadPage() {
  const [previewUrl, setPreviewUrl] = useState('');
  const [form, setForm] = useState<VideoPostForm>(initialState);
  const [loading, setLoading] = useState(false);

  const { uid } = useUser();

  const initialise = () => {
    setPreviewUrl('');
    setForm(initialState);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!uid || !form.file) return;
    setLoading(true);
    await createPost(form)
      .then(() => {
        initialise();
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const isDisabled =
    Object.values(form).includes('' && null && undefined) || loading;

  useEffect(() => {
    if (uid) {
      setForm((prev) => ({ ...prev, authorId: uid }));
    }
  }, [uid]);

  return (
    <main className='py-4'>
      {form.file ? (
        <div className='flex flex-col'>
          <h1 className='text-xl font-semibold'>Upload video</h1>
          <VideoPreview src={previewUrl} className='mt-6' />
          <form action='submit' onSubmit={onSubmit} className='mt-8 space-y-4'>
            <Input
              label='caption'
              maxLength={2000}
              value={form.caption}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, caption: e.target.value }))
              }
            />
            <Dropdown
              options={visibilityOptions}
              label='visibility'
              selected={{
                title: visibilityOptions.find(
                  (o) => o.value === form.visibility,
                )!.title,
                value: form.visibility,
              }}
              onChange={(option: Option<Visibility>) =>
                setForm((prev) => ({ ...prev, visibility: option.value }))
              }
            />
            <div className='mt-8 flex space-x-2'>
              <Button type='reset' color='white' onClick={initialise}>
                Reset
              </Button>
              <Button type='submit' disabled={isDisabled}>
                Post
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <DragDrop
          onDropFile={(file) => {
            setForm((prev) => ({ ...prev, file }));
            setPreviewUrl(URL.createObjectURL(file));
          }}
          validFileTypes={VALID_FILE_TYPES}
        />
      )}
    </main>
  );
}
