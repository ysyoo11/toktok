type Props = {
  videoUrl: string;
};

export default function VideoPlayer({ videoUrl }: Props) {
  return (
    <div className='xs:w-64 relative w-56'>
      <video src={videoUrl} className='rounded-lg' playsInline />
    </div>
  );
}
