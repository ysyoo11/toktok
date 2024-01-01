export async function createCollection(name: string, isPrivate: boolean) {
  return await fetch(`/api/collections`, {
    method: 'POST',
    body: JSON.stringify({ name, isPrivate }),
  }).then((res) => res.json());
}
