import { groq } from 'next-sanity';

import { VideoPostForm } from '@/app/upload/page';
import { Video } from '@/types';

import { client } from './sanity';

export async function getAllVideos(): Promise<Video[]> {
  return await client.fetch(
    groq`*[_type == 'video']{
      _id,
      _createdAt,
      videoUrl,
      author,
      caption,
      visibility,
      music,
      comment,
      view,
      likes,
      tag
    }`,
  );
}

async function uploadVideo(file: File) {
  return await client.assets.upload('file', file, {
    contentType: file.type,
    filename: file.name,
  });
}

export async function createVideo(form: VideoPostForm) {
  const { file, authorId, caption } = form;

  if (!file || !authorId) return;

  const { url: videoUrl } = await uploadVideo(file);

  const videoData = {
    _type: 'video',
    videoUrl,
    author: {
      _type: 'reference',
      _ref: authorId,
    },
    caption,
    visibility: 'public',
  };

  return await client.create(videoData).catch(console.error);
}
