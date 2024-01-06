import { useEffect, useRef, useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import type { ItemWithTimestamp } from '@/model/base';
import type { SWRConfiguration } from 'swr';

type SortOrder = keyof ItemWithTimestamp;

type Props = {
  fetchInput: RequestInfo;
  fetchLimit: number;
  sortOrder: SortOrder;
  swrOptions?: SWRConfiguration;
  initialCondition?: boolean;
};

export default function useInfiniteScroll<T extends ItemWithTimestamp>({
  fetchInput,
  fetchLimit,
  sortOrder,
  swrOptions,
  initialCondition = true,
}: Props) {
  const [index, setIndex] = useState(1);
  const [items, setItems] = useState<T[]>([]);

  const lastItemSortIndex = useRef('0');

  const loadMore = () => setIndex((prev) => prev + 1);
  const isReachingEnd = items.length === 0 || items.length < index * fetchLimit;

  const { data, isLoading, mutate } = useSWRImmutable<T[]>(
    initialCondition && `${fetchInput}-${index}`,
    async () =>
      await fetch(
        `${fetchInput}?lastItemSortIndex=${lastItemSortIndex.current}`,
      ).then((res) => res.json()),
    swrOptions,
  );

  useEffect(() => {
    if (items.length > 0) {
      switch (sortOrder) {
        case 'createdAt':
          lastItemSortIndex.current = items[items.length - 1].createdAt;
          break;
        case 'updatedAt':
          lastItemSortIndex.current = items[items.length - 1].updatedAt;
          break;
        case 'id':
          lastItemSortIndex.current = items[items.length - 1].id;
          break;
        default:
          throw new Error('No such index for sorting items');
      }
    } else {
      lastItemSortIndex.current = '0';
    }
  }, [items, sortOrder]);

  useEffect(() => {
    if (!data) return;
    if (data.length > 0) {
      setItems((prev) => [...prev, ...data]);
    }
  }, [data]);

  return {
    items,
    loading: isLoading,
    mutate,
    loadMore,
    isReachingEnd,
  };
}
