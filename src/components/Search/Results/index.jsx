"use client";

import CardVertical from "@/components/Card/CardVertical";
import RetryAfter from "@/components/Modals/RetryAfter";
import SkeletonCard from "@/components/Skeleton/Card";
import { fetchData } from "@/server/actions";
import { useRequiredFilter } from "@/zustand/isRequiredFilter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

export default function Results() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const loadMoreRef = useRef(null);
  const { isRequired } = useRequiredFilter();

  // Fetcher function
  // const fetcher = async (url) => {
  //   const { data } = await fetchData(url);

  //   console.log(data);
  //   return data;
  // };

  // Prepare query key
  // const getKey = `/recommendations?${searchParams.toString()}`;

  // Query Client
  const queryClient = useQueryClient();

  // Use TanStack Query for data fetching
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [`/api/recommendations?${searchParams.toString()}`],
    queryFn: async ({ queryKey }) =>
      await axios.get(queryKey[0]).then(({ data }) => data),
    enabled: !isRequired,
    // staleTime: Infinity, // Adjust as needed
    // cacheTime: Infinity, // Adjust as needed
  });

  // const songs = useMemo(() => {
  //   if (!data) return [];

  //   return data.tracks; // NOTE: Uncomment this line when Retry-After is finished
  //   // return data.tracks.items;
  // }, [data]);

  // Fetch more songs
  // const fetchMoreSongs = useMutation({
  //   mutationFn: async () => {
  //     const newKey = `${getKey}&offset=${songs.length}`;
  //     return fetcher(newKey);
  //   },
  //   onSuccess: (newData) => {
  //     queryClient.setQueryData([getKey], (prevData) => {
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
        {/* {songs?.length > 0 &&
          songs.map((item) => {
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
          })} */}

        {isLoading &&
          [...Array(20)].map((_, i) => (
            <li key={i} ref={i === 0 ? loadMoreRef : null}>
              <SkeletonCard type={`track`} />
            </li>
          ))}
      </ul>

      {/* {error && error.response.status === 429 && (
        <RetryAfter retryAfter={error.response.headers["retry-after"]} />
      )} */}
    </div>
  );
}
