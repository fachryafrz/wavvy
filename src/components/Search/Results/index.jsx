"use client";

import CardVertical from "@/components/Card/CardVertical";
import SkeletonCard from "@/components/Skeleton/Card";
import { fetchData } from "@/server/actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

export default function Results() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const loadMoreRef = useRef(null);

  // Fetcher function
  const fetcher = async (url) => {
    const { data } = await fetchData(url);

    return data;
  };

  // Prepare query key
  const getKey = () => {
    const params = new URLSearchParams({
      ...Object.fromEntries(current),
    });

    return `/search?type=track&q=Marshmello`;
    // return `/recommendations?${params.toString()}`; // NOTE: Uncomment this line when Retry-After is finished
  };

  // Query Client
  const queryClient = useQueryClient();

  // Use TanStack Query for data fetching
  const { data, isLoading, refetch } = useQuery({
    queryKey: getKey,
    queryFn: () => fetcher(getKey()),
    staleTime: Infinity, // Adjust as needed
    cacheTime: Infinity, // Adjust as needed
  });

  const songs = useMemo(() => {
    if (!data) return;

    // return data.tracks; // NOTE: Uncomment this line when Retry-After is finished
    return data.tracks.items;
  }, []);

  // Fetch more songs
  // const fetchMoreSongs = useMutation({
  //   mutationFn: async () => {
  //     const newKey = `${getKey()}&offset=${songs.length}`;
  //     return fetcher(newKey);
  //   },
  //   onSuccess: (newData) => {
  //     queryClient.setQueryData(getKey, (prevData) => {
  //       if (!prevData) return newData;
  //       return {
  //         ...newData,
  //         tracks: [...prevData.tracks, ...newData.tracks],
  //       };
  //     });
  //   },
  // });

  // Infinite load
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         fetchMoreSongs.mutate();
  //       }
  //     },
  //     { threshold: 0.5 },
  //   );

  //   if (loadMoreRef.current) {
  //     observer.observe(loadMoreRef.current);
  //   }

  //   return () => {
  //     if (loadMoreRef.current) {
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  //       observer.unobserve(loadMoreRef.current);
  //     }
  //   };
  // }, []);

  return (
    <div className={`flex-1 @container`}>
      <ul
        className={`-mx-2 grid grid-cols-2 @lg:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5 @6xl:grid-cols-6`}
      >
        {songs?.map((item) => {
          if (!item) return null;

          const [image] =
            item.images ?? item.album?.images ?? item.track?.album?.images;

          return (
            <li key={item.id}>
              <CardVertical
                item={item.track ?? item}
                image={image?.url ?? "/maskable/maskable_icon_x192.png"}
              />
            </li>
          );
        })}

        {isLoading &&
          [...Array(20)].map((_, i) => (
            <li key={i} ref={i === 0 ? loadMoreRef : null}>
              <SkeletonCard type={`track`} />
            </li>
          ))}
      </ul>
    </div>
  );
}
