type Props = {
  username: string;
};
// TODO:
export default function CreatorVideosSection({ username }: Props) {
  return (
    <div className='flex h-full w-full items-center justify-center bg-white'>
      {username}&apos;s videos
    </div>
  );
}
