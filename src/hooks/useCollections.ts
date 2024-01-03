import { useEffect, useRef, useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import { createCollection, getCollectionsByUsername } from '@/lib/collections';
import { SimpleCollection } from '@/model/collection';
import { POLICY } from '@/policy';
import { USER_SWR_KEY } from '@/swr';

import { useUser } from './useUser';

export default function useCollections(username: string) {
  const { user, isLoading: userLoading } = useUser();
  const [index, setIndex] = useState(1);
  const [collections, setCollections] = useState<SimpleCollection[]>([]);
  const lastCollectionDateRef = useRef('0');

  const onlyPublic = user && user.username === username ? false : true;
  const loadMore = () => setIndex((prev) => prev + 1);
  const isReachingEnd =
    collections.length === 0 ||
    collections.length < index * POLICY.COLLECTION_FETCH_LIMIT;

  const { data, isLoading, mutate } = useSWRImmutable<SimpleCollection[]>(
    !userLoading &&
      `${USER_SWR_KEY.GET_COLLECTION_BY_USERNAME}-${username}-${index}`,
    async () =>
      await getCollectionsByUsername(
        username,
        lastCollectionDateRef.current,
        onlyPublic,
      ),
  );

  const createNewCollection = async (name: string, isPrivate: boolean) => {
    if (!user) return;
    await createCollection(name, isPrivate) //
      .then(() => mutate());
  };

  useEffect(() => {
    if (collections.length > 0) {
      lastCollectionDateRef.current =
        collections[collections.length - 1].createdAt;
    }
  }, [collections]);

  useEffect(() => {
    if (data) {
      setCollections((prev) => [...prev, ...data]);
    }
  }, [data]);

  return {
    collections,
    loading: isLoading,
    loadMore,
    isReachingEnd,
    createNewCollection,
  };
}
