"use client";

import Link from "next/link";
import { ChevronForward } from "react-ionicons";
import ArtistCard from "../Artist/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingCard from "../Loading/Card";
import { fetchData } from "@/server/actions";

export default function FavoriteArtists() {
  const showLimit = 5;

  const {
    data,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: [`/me/following?type=artist`],
    queryFn: async ({ queryKey }) => {
      return await fetchData(queryKey[0]).then(({ data }) => data.artists);
    },
  });

  return (
    <div className={`flex flex-col gap-2`}>
      {/* Header */}
      <div className={`flex items-center justify-between`}>
        <h2 className={`section-title`}>Favorite Artists</h2>

        <Link
          href={`/`}
          prefetch={false}
          className={`text-xs font-medium text-primary`}
        >
          See all
        </Link>
      </div>

      {loading && (
        <div className={`-mx-1 flex flex-col`}>
          {[...Array(showLimit)].map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      )}

      {/* Cards */}
      {data?.items.length > 0 && (
        <ul className={`-mx-1 flex flex-col`}>
          {data.items.slice(0, showLimit).map((item, i) => {
            return (
              <li key={item.id}>
                <Link
                  href={`/${item.type}/${item.id}`}
                  prefetch={false}
                  className={`flex items-center justify-between`}
                >
                  <ArtistCard artist={item} index={i} />

                  <ChevronForward
                    color={`#ffffff`}
                    width={`16px`}
                    height={`16px`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
