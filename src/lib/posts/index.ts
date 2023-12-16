import { VideoPostForm } from '@/app/(auth)/upload/page';
import { Post, SimplePost } from '@/model/post';

export async function getAllPosts(): Promise<SimplePost[]> {
  const { videos } = await fetch(`/api/posts`) //
    .then((res) => res.json());

  return videos;
}

export async function getPostById(videoId: string): Promise<Post> {
  const { video } = await fetch(`/api/posts/${videoId}`) //
    .then((res) => res.json());
  return video;
}

export async function createPost(form: VideoPostForm) {
  const formData = new FormData();
  Object.entries(form) //
    .forEach((item) => formData.append(item[0], item[1]!));

  return await fetch('/api/posts', {
    method: 'POST',
    cache: 'no-cache',
    body: formData,
  }).then((res) => res.json());
}
