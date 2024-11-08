"use client";

import { fetchData } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";
import { isPlural } from "@/lib/isPlural";
import Link from "next/link";
import CardVertical from "../Card/CardVertical";

export default function Search({ query }) {
  const types = [
    "album",
    "artist",
    "playlist",
    "track",
    "show",
    "episode",
    "audiobook",
  ];

  const {
    data,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: `/search?${new URLSearchParams({
      q: query,
    }).toString()}`,
    queryFn: async ({ queryKey }) => {
      return await fetchData(queryKey, {
        params: {
          type: types.join(","),
        },
      }).then(({ data }) => data);
    },
  });

  // console.log(data);

  return (
    <div className={`flex flex-col gap-4 @container`}>
      <section>
        <div className={`text-xl font-medium`}>
          {isPlural(data?.tracks?.items.length, "Song", "Songs")}
        </div>
        <div className={`-mx-2`}>
          {loading && <SkeletonItem />}
          <Item items={data?.tracks?.items.slice(0, 6)} />
        </div>
      </section>

      <section>
        <div className={`text-xl font-medium`}>
          {isPlural(data?.artists?.items.length, "Artist", "Artists")}
        </div>
        <div className={`-mx-2`}>
          {loading && <SkeletonItem type={`artist`} />}
          <Item items={data?.artists?.items.slice(0, 6)} />
        </div>
      </section>

      <section>
        <div className={`text-xl font-medium`}>
          {isPlural(data?.albums?.items.length, "Album", "Albums")}
        </div>
        <div className={`-mx-2`}>
          {loading && <SkeletonItem />}
          <Item items={data?.albums?.items.slice(0, 6)} />
        </div>
      </section>
    </div>
  );
}

function Item({ items }) {
  return (
    <ul
      className={`grid grid-cols-2 @lg:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5 @6xl:grid-cols-6`}
    >
      {items?.map((item) => {
        const [image] =
          item.images ?? item.album?.images ?? item.track?.album?.images;

        return (
          <li key={item.id}>
            <Link
              href={`/${item.type}/${item.id}`}
              className={`block rounded-xl p-2 hocus:bg-neutral`}
            >
              <CardVertical
                name={item.name ?? item.track.name}
                image={image?.url ?? "/maskable/maskable_icon_x192.png"}
                type={item.type ?? item.track.type}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function SkeletonItem({ type }) {
  const ITEM_COUNT = 6;

  const loadingClass = `animate-pulse bg-neutral-400 bg-opacity-50`;

  return (
    <ul
      className={`grid grid-cols-2 @lg:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5 @6xl:grid-cols-6`}
    >
      {Array(ITEM_COUNT)
        .fill(0)
        .map((_, i) => (
          <li key={i}>
            <div className={`flex flex-col gap-2 p-2`}>
              {/* Poster */}
              <span
                className={`block aspect-square ${type === `artist` ? `rounded-full` : `rounded-lg`} ${loadingClass}`}
              ></span>

              {/* Info */}
              <span
                className={`block h-6 w-2/3 rounded ${type === `artist` ? `mx-auto` : ``} ${loadingClass}`}
              ></span>
            </div>
          </li>
        ))}
    </ul>
  );
}
