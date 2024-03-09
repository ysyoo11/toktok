import { Collection } from '@/model/collection';

export async function getCollectionsByUsername(
  username: string,
  lastCollectionDate: string,
  onlyPublic: boolean,
): Promise<Collection[]> {
  return await fetch(
    `/api/collections?username=${username}&lastCollectionDate=${lastCollectionDate}&onlyPublic=${onlyPublic}`,
  ).then((res) => res.json());
}

export async function getCollectionById(
  collectionId: string,
): Promise<Collection> {
  return await fetch(`/api/collections/${collectionId}`).then((res) =>
    res.json(),
  );
}

export async function createCollection(name: string, isPrivate: boolean) {
  return await fetch(`/api/collections`, {
    method: 'POST',
    body: JSON.stringify({ name, isPrivate }),
  }).then((res) => res.json());
}

export async function addPostToCollection(postId: string, colId: string) {
  return fetch(`/api/collections/${colId}`, {
    method: 'PUT',
    body: JSON.stringify({ postId }),
  }).then((res) => res.json());
}
