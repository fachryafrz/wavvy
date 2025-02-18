"use client";

import { usePathname } from "next/navigation";
import CardVertical from "../Card/CardVertical";
import SkeletonCard from "../Skeleton/Card";
import { useEffect, useMemo, useRef } from "react";
import { fetchData } from "@/server/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Item({ itemsData, itemsType }) {
  const pathname = usePathname();
  const loadMoreRef = useRef(null);

  const [origin, page, query, pluralType] = pathname.split("/");
  const isAllPage = !pluralType;
  const combinedType = pluralType || itemsType;
  const type = combinedType.slice(0, -1);

  // Fetcher function
  const fetcher = async (url) => {
    const { data } = await fetchData(url);

    return data[combinedType];
  };

  // Prepare query key
  const getKey = useMemo(() => {
    return `/search?q=${query}&type=${type}`;

    // NOTE: This is needed if using search params
    // if (isQueryParams) {
    // return `/search?q=${query}`;
    // } else {
    //   const params = new URLSearchParams({
    //     media_type: type,
    //     ...Object.fromEntries(searchParams),
    //   });
    //   if (searchParams.get("watch_providers") && location) {
    //     params.append("watch_region", location.country_code);
    //   }
    //   return `/api/search/filter?${params.toString()}`;
    // }
  }, []);

  // Query Client
  const queryClient = useQueryClient();

  // Use TanStack Query for data fetching
  const { data, isLoading, refetch } = useQuery({
    queryKey: [type, getKey],
    queryFn: async () => await fetcher(getKey),
    enabled: !isAllPage, // You can control when the query should run
    staleTime: Infinity, // Adjust as needed
    cacheTime: Infinity, // Adjust as needed
  });

  // Process data
  const items = useMemo(() => {
    if (!data) return itemsData;

    const combinedData = [...itemsData, ...data.items];

    const uniqueItems = combinedData.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id),
    );

    return uniqueItems;
  }, [data]);

  // Fetch more songs using mutation
  const fetchMoreSongs = useMutation({
    mutationFn: async () => {
      const newKey = `${getKey}&offset=${items.length}`;
      return fetcher(newKey);
    },
    onSuccess: (newData) => {
      queryClient.setQueryData([type, getKey], (prevData) => {
        if (!prevData) return newData;
        return {
          ...newData,
          items: [...prevData.items, ...newData.items],
        };
      });
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreSongs.mutate();
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
  }, []);

  return (
    <ul
      className={`grid grid-cols-2 @lg:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5 @6xl:grid-cols-6`}
    >
      {/* Items */}
      {items?.slice(0, !isAllPage ? items.length : 6).map((item) => {
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

      {/* Infinite Loading Skeleton */}
      {(isLoading || items?.length < data?.total) &&
        !isAllPage &&
        [...Array(20)].map((_, i) => (
          <li key={i} ref={i === 0 ? loadMoreRef : null}>
            <SkeletonCard type={type} />
          </li>
        ))}
    </ul>
  );
}
