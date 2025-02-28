"use client";

import CardVertical from "@/components/Card/CardVertical";
import SkeletonCard from "@/components/Skeleton/Card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function SavedTracks() {
  const queryClient = useQueryClient();
  const loadMoreRef = useRef(null);

  const [isFinished, setIsFinished] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    enabled: false,
    queryKey: [`/api/me/tracks`],
    queryFn: async ({ queryKey }) =>
      await axios.get(queryKey).then(({ data }) => data),
  });

  const savedTracks = useMemo(() => {
    if (!data) return [];

    return data.items;
  }, [data]);

  useEffect(() => {
    const fetchData = async () => await refetch();
    fetchData();
  }, []);

  // Fetch more songs
  const fetchMoreSongs = useCallback(async () => {
    const newKey = `/api/me/tracks?offset=${savedTracks.length}`;
    const newData = await axios.get(newKey).then(({ data }) => data);

    if (newData.items.length === 0) setIsFinished(true);

    queryClient.setQueryData([`/api/me/tracks`], (prevData) => {
      if (!prevData) return newData;
      return {
        ...newData,
        items: [...prevData.items, ...newData.items],
      };
    });
  }, [queryClient, savedTracks.length]);

  // Infinite load
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreSongs();
        }
      },
      { threshold: 0.5 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchMoreSongs]);

  return (
    <div className={`@container`}>
      <header>
        <h2 className={`text-xl font-medium`}>Saved Songs</h2>
      </header>

      <ul
        className={`-mx-2 grid grid-cols-2 @md:grid-cols-3 @2xl:grid-cols-4 @5xl:grid-cols-5`}
      >
        {isLoading &&
          [...Array(20)].map((_, i) => (
            <li key={i}>
              <SkeletonCard type={`track`} />
            </li>
          ))}

        {savedTracks?.map((item, i) => {
          const [image] = item.track.album.images;

          return (
            <li key={item.id}>
              <CardVertical
                item={item.track}
                image={image?.url ?? "/maskable/maskable_icon_x192.png"}
                info={item.track.artists.map((artist) => {
                  return (
                    <>
                      <Link
                        key={artist.id}
                        href={`/${artist.type}/${artist.id}`}
                        prefetch={false}
                        className={`hocus:underline`}
                      >
                        {artist.name}
                      </Link>

                      <span className={`last:hidden`}>, </span>
                    </>
                  );
                })}
              />
            </li>
          );
        })}

        {savedTracks?.length > 0 && !isFinished &&
          [...Array(20)].map((_, i) => (
            <li key={i} ref={i === 0 ? loadMoreRef : null}>
              <SkeletonCard type={`track`} />
            </li>
          ))}
      </ul>
    </div>
  );
}
