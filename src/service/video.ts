import { VideoPostForm } from '@/app/upload/page';
import { Video } from '@/types';
import { baseUrl } from '@/utils/env';

// TODO: Make a logic for infinite scroll
export async function getAllVideos(): Promise<Video[]> {
  const { videos } = await fetch(baseUrl + '/api/videos') //
    .then((res) => res.json());

  return videos;
}

export async function createVideo(form: VideoPostForm) {
  const formData = new FormData();
  Object.entries(form) //
    .forEach((item) => formData.append(item[0], item[1]!));

  return await fetch('/api/videos', {
    method: 'POST',
    cache: 'no-cache',
    body: formData,
  }).then((res) => res.json());
}
