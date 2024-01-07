export async function updateFollow(
  targetUsername: string,
  type: 'follow' | 'unfollow',
) {
  return await fetch(`/api/user/${targetUsername}/follows`, {
    method: 'PUT',
    body: JSON.stringify({ type }),
  }).then((res) => res.json());
}
