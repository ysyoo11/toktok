export async function updateLike(postId: string, like: boolean) {
  return await fetch(`/api/posts/${postId}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ like }),
  }).then((res) => res.json());
}

export async function updateCommentLike(
  postId: string,
  commentKey: string,
  like: boolean,
) {
  return await fetch(`/api/posts/${postId}/comments/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ commentKey, like }),
  }).then((res) => res.json());
}
