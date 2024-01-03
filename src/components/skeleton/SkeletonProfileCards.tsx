import SkeletonRectangle from './SkeletonRectangle';

export default function SkeletonProfileCards() {
  return (
    <section className='mt-2 lg:mt-4'>
      <ul className='grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
        {[...new Array(6)].map((_, idx) => (
          <li key={`skeleton-box-${idx}`}>
            <SkeletonRectangle className='aspect-[4/6]' />
          </li>
        ))}
      </ul>
    </section>
  );
}
