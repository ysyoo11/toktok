type Props = {
  url: string;
};

export default function UrlCopyBox({ url }: Props) {
  // TODO:
  const copyLink = () => {};

  return (
    <div className='mt-2 flex items-center justify-between rounded-lg bg-gray-100 px-4 py-2'>
      <p className='truncate pr-4 text-sm text-gray-700'>{url}</p>
      <button
        onClick={copyLink}
        className='shrink-0 px-2 text-sm font-semibold hover:text-gray-500'
      >
        Copy link
      </button>
    </div>
  );
}
