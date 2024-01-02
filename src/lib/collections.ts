export async function getCollectionsByUsername(
  username: string,
  lastCollectionDate: string,
  onlyPublic: boolean,
) {
  return await fetch(
    `/api/user/${username}/collections?lastCollectionDate=${lastCollectionDate}&onlyPublic=${onlyPublic}`,
  ).then((res) => res.json());
}

export async function createCollection(name: string, isPrivate: boolean) {
  return await fetch(`/api/collections`, {
    method: 'POST',
    body: JSON.stringify({ name, isPrivate }),
  }).then((res) => res.json());
}
