"use client";

import HomeTabs from "./Tabs";
import SliderPlaylist from "../../../Slider/Playlist";
import Link from "next/link";
import FavoriteArtists from "../../FavoriteArtists";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function LeftContent({
  categories,
  categoriesPlaylists,
  favoriteArtists,
}) {
  const {
    data: recentlyPlayedData,
    error,
    isLoading: recentlyPlayedIsLoading,
  } = useQuery({
    queryKey: `/api/me/player/recently-played`,
    queryFn: async ({ queryKey }) => {
      return await axios.get(queryKey).then(({ data }) => data);
    },
  });

  return (
    <div className={`flex flex-col gap-4 @container`}>
      {/* Categories */}
      {categories.items?.slice(0, 1).map((category, i) => {
        return (
          <section key={category.id}>
            <SliderPlaylist
              id={`slider-${category.id}`}
              title={
                <Link
                  href={`/section/${category.id}`}
                  className={`hocus:underline`}
                >
                  {category.name}
                </Link>
              }
              data={categoriesPlaylists
                .find((cp) => cp.message === category.name)
                .playlists.items.slice(4)}
            />
          </section>
        );
      })}

      {/* Playlists, Artists, Albums, Streams */}
      <section className={`grid gap-4 @2xl:grid-cols-3`}>
        <div className={`@container @2xl:col-span-2`}>
          <HomeTabs />
        </div>

        <div>
          <div className={`sticky top-16`}>
            <FavoriteArtists data={favoriteArtists} />
          </div>
        </div>
      </section>

      <section>
        <SliderPlaylist
          id={`recently-played`}
          title={
            <Link href={`/me/recently-played`} className={`hocus:underline`}>
              Recently Played
            </Link>
          }
          data={recentlyPlayedData?.items}
          isLoading={recentlyPlayedIsLoading}
        />
      </section>

      {categories.items?.slice(1, categories.length).map((category, i) => {
        return (
          <section key={category.id}>
            <SliderPlaylist
              id={`slider-${category.id}`}
              title={
                <Link
                  href={`/section/${category.id}`}
                  className={`hocus:underline`}
                >
                  {category.name}
                </Link>
              }
              data={
                categoriesPlaylists.find((cp) => cp.message === category.name)
                  .playlists.items
              }
            />
          </section>
        );
      })}
    </div>
  );
}
