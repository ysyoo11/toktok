export async function likeVideo(videoId: string, like: boolean) {
  return await fetch(`/api/posts/${videoId}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ like }),
  }).then((res) => res.json());
}
