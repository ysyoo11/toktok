export async function urlToObject(url: string) {
  const file = await fetch(url)
    .then((res) => res.blob())
    .then((blob) => new File([blob], 'image.jpg', { type: blob.type }))
    .catch(console.error);
  return file;
}
