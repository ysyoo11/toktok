type CreateCollectionProps = {
  uid: string;
  name: string;
  isPrivate: boolean;
};
export async function createCollection(arg: CreateCollectionProps) {
  return await fetch(`/api/collections`, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}
