export async function likeVideo(videoId: string, uid: string) {
  return await fetch(`/api/posts/${videoId}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid }),
  }).then((res) => res.json());
}

export async function unlikeVideo(videoId: string, uid: string) {
  return await fetch(`/api/posts/${videoId}/likes`, {
    method: 'DELETE',
    headers: {
      uid,
    },
  }).then((res) => res.json());
}
