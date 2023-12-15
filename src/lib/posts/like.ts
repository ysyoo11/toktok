export async function updateLike(postId: string, like: boolean) {
  return await fetch(`/api/posts/${postId}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ like }),
  }).then((res) => res.json());
}
