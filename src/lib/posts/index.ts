import { VideoPostForm } from '@/app/(auth)/upload/page';
import { Post, SimplePost, UserPost } from '@/model/post';

export async function getAllPosts(): Promise<SimplePost[]> {
  const { videos } = await fetch(`/api/posts`) //
    .then((res) => res.json());

  return videos;
}

export async function getPostById(postId: string): Promise<Post> {
  const { video } = await fetch(`/api/posts/${postId}`, { cache: 'no-store' }) //
    .then((res) => res.json());
  return video;
}

export async function getPostsByUsername(
  username: string,
  lastPostDate: string,
): Promise<UserPost[]> {
  return await fetch(`/api/user/${username}/posts?lastPostDate=${lastPostDate}`) //
    .then((res) => res.json());
}

export async function getPostsByCollectionId(
  id: string,
  lastPostDate: string,
): Promise<UserPost[]> {
  return await fetch(
    `/api/collections/${id}/posts?lastPostDate=${lastPostDate}`,
  ).then((res) => res.json());
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
