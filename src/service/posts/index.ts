import { VideoPostForm } from '@/app/upload/page';
import { Video } from '@/types';
import { baseUrl } from '@/utils/env';

// TODO: Make a logic for infinite scroll
export async function getAllVideos(username?: string): Promise<Video[]> {
  const { videos } = await fetch(baseUrl + `/api/posts?username=${username}`) //
    .then((res) => res.json());

  return videos;
}

export async function getVideoById(videoId: string): Promise<Video> {
  const { video } = await fetch(`/api/posts/${videoId}`) //
    .then((res) => res.json());
  return video;
}

export async function createVideo(form: VideoPostForm) {
  const formData = new FormData();
  Object.entries(form) //
    .forEach((item) => formData.append(item[0], item[1]!));

  return await fetch('/api/posts', {
    method: 'POST',
    cache: 'no-cache',
    body: formData,
  }).then((res) => res.json());
}
