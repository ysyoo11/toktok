export async function getCollectionsByUsername(
  username: string,
  lastCollectionDate: string,
  onlyPublic: boolean,
) {
  return await fetch(
    `/api/collections?username=${username}&lastCollectionDate=${lastCollectionDate}&onlyPublic=${onlyPublic}`,
  ).then((res) => res.json());
}

export async function getCollectionById(
  collectionId: string,
  lastPostDate: string,
) {
  return await fetch(
    `/api/collections/${collectionId}?lastPostDate=${lastPostDate}`,
  ).then((res) => res.json());
}

export async function createCollection(name: string, isPrivate: boolean) {
  return await fetch(`/api/collections`, {
    method: 'POST',
    body: JSON.stringify({ name, isPrivate }),
  }).then((res) => res.json());
}
