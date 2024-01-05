import { useEffect, useRef, useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import type { Key, SWRConfiguration } from 'swr';

type Props<Data = any, SWRKey extends Key = Key> = {
  fetchInput: RequestInfo;
  fetchLimit: number;
  swrOptions?: SWRConfiguration;
  initialCondition?: boolean;
};

export default function useInfiniteScroll<
  T extends { updatedAt: string; createdAt: string },
>({ fetchInput, fetchLimit, swrOptions, initialCondition = true }: Props) {
  const [index, setIndex] = useState(1);
  const [items, setItems] = useState<T[]>([]);

  const lastItemDateRef = useRef('0');

  const loadMore = () => setIndex((prev) => prev + 1);
  const isReachingEnd = items.length === 0 || items.length < index * fetchLimit;

  const { data, isLoading, mutate } = useSWRImmutable<T[]>(
    initialCondition && `${fetchInput}-${index}`,
    async () =>
      await fetch(`${fetchInput}?lastItemDate=${lastItemDateRef.current}`).then(
        (res) => res.json(),
      ),
    swrOptions,
  );

  useEffect(() => {
    if (items.length > 0) {
      lastItemDateRef.current = items[items.length - 1].createdAt;
    } else {
      lastItemDateRef.current = '0';
    }
  }, [items]);

  useEffect(() => {
    if (!data) return;
    setItems((prev) => [...prev, ...data]);
  }, [data]);

  return {
    items,
    loading: isLoading,
    mutate,
    loadMore,
    isReachingEnd,
  };
}
