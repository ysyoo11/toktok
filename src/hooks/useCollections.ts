import { useEffect, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';
import useSWRImmutable from 'swr/immutable';

import { createCollection, getCollectionsByUsername } from '@/lib/collections';
import { Collection } from '@/model/collection';
import { POLICY } from '@/policy';
import { USER_SWR_KEY } from '@/swr';

import { useUser } from './useUser';

export default function useCollections(username: string) {
  const COLLECTIONS_SWR_BASE_KEY = `${USER_SWR_KEY.GET_COLLECTION_BY_USERNAME}-${username}`;
  const { user, isLoading: userLoading } = useUser();
  const { mutate, cache } = useSWRConfig();
  const [index, setIndex] = useState(1);
  const [collections, setCollections] = useState<Collection[]>([]);

  const lastCollectionDateRef = useRef('0');
  const addCollectionFlagRef = useRef(false);

  const loadMore = () => setIndex((prev) => prev + 1);
  const onlyPublic = user && user.username === username ? false : true;
  const isReachingEnd =
    collections.length === 0 ||
    collections.length < index * POLICY.COLLECTION_FETCH_LIMIT;

  const { data, isLoading } = useSWRImmutable<Collection[]>(
    !userLoading && `${COLLECTIONS_SWR_BASE_KEY}-${index}`,
    async () =>
      await getCollectionsByUsername(
        username,
        lastCollectionDateRef.current,
        onlyPublic,
      ),
  );

  const createNewCollection = async (name: string, isPrivate: boolean) => {
    if (!user) return;
    addCollectionFlagRef.current = true;
    lastCollectionDateRef.current = '0';
    await createCollection(name, isPrivate) //
      .then(() => {
        for (let i = 0; i <= index; i++) {
          cache.delete(`${COLLECTIONS_SWR_BASE_KEY}-${i}`);
        }
        setIndex(1);
        mutate(
          (key) =>
            typeof key === 'string' && key.startsWith(COLLECTIONS_SWR_BASE_KEY),
          undefined,
          {
            revalidate: true,
            populateCache: false,
            rollbackOnError: true,
          },
        );
      });
  };

  useEffect(() => {
    if (collections.length > 0) {
      lastCollectionDateRef.current =
        collections[collections.length - 1].createdAt;
    } else {
      lastCollectionDateRef.current = '0';
    }
  }, [collections]);

  useEffect(() => {
    if (!data) return;
    if (addCollectionFlagRef.current === true) {
      setCollections(data);
    } else {
      setCollections((prev) => [...prev, ...data]);
    }
    addCollectionFlagRef.current = false;
  }, [data]);

  return {
    collections,
    loading: isLoading || userLoading,
    loadMore,
    isReachingEnd,
    createNewCollection,
  };
}
