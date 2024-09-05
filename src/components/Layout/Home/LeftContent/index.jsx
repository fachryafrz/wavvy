"use client";

import HomeTabs from "./Tabs";
import SliderPlaylist from "../../../Slider/Playlist";
import Link from "next/link";
import FavoriteArtists from "../../FavoriteArtists";
import { useFetch } from "@/helper/fetch";

export default function LeftContent({
  categories,
  categoriesPlaylists,
  favoriteArtists,
}) {
  const {
    data: recentlyPlayedData,
    error,
    loading: recentlyPlayedIsLoading,
  } = useFetch({
    endpoint: `/api/me/player/recently-played`,
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
              data={
                categoriesPlaylists.find((cp) => cp.message === category.name)
                  .playlists.items
              }
            />
          </section>
        );
      })}

      {/* Playlists, Artists, Albums, Streams */}
      <section className={`grid gap-4 @2xl:grid-cols-3`}>
        <div className={`@container @2xl:col-span-2`}>
          <HomeTabs />
        </div>

        <div className={``}>
          <FavoriteArtists data={favoriteArtists} />
        </div>
      </section>

      <section>
        <SliderPlaylist
          id={`recently-played`}
          title={
            <Link
              href={`/me/player/recently-played`}
              className={`hocus:underline`}
            >
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
