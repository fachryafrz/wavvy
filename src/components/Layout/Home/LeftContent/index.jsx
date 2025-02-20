"use client";

import HomeTabs from "./Tabs";
import SliderPlaylist from "../../../Slider/Playlist";
import Link from "next/link";
import FavoriteArtists from "../../FavoriteArtists";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { userStore } from "@/zustand/user";

export default function LeftContent({ categories, categoriesPlaylists }) {
  // NOTE: Need to get user from zustand, otherwise it will get error hydration
  const { user } = userStore();

  const { data: recentlyPlayedData, isLoading: recentlyPlayedIsLoading } =
    useQuery({
      queryKey: [`/api/me/player/recently-played`],
      queryFn: async ({ queryKey }) => {
        return await axios.get(queryKey[0]).then(({ data }) => data);
      },
    });

  const handleFindCategory = (name) => {
    return categoriesPlaylists.find((cp) => cp?.message === name);
  };

  return (
    <div className={`flex flex-col gap-4 @container`}>
      {/* Categories */}
      {categories.items?.slice(0, 1).map((category, i) => {
        return (
          handleFindCategory(category.name) &&
          handleFindCategory(category.name).playlists.items.length > 0 && (
            <section key={category.id}>
              <SliderPlaylist
                id={`slider-${category.id}`}
                title={
                  <Link
                    href={`/section/${category.id}`}
                    prefetch={false}
                    className={`hocus:underline`}
                  >
                    {category.name}
                  </Link>
                }
                data={handleFindCategory(category.name).playlists.items}
              />
            </section>
          )
        );
      })}

      {/* Playlists, Artists, Albums, Streams */}
      {user && (
        <section className={`grid gap-4 @2xl:grid-cols-3`}>
          <div className={`@container @2xl:col-span-2`}>
            <HomeTabs />
          </div>

          <div>
            <div className={`sticky top-16`}>
              <FavoriteArtists />
            </div>
          </div>
        </section>
      )}

      {user && (
        <section>
          <SliderPlaylist
            id={`recently-played`}
            title={
              <Link
                href={`/me/recently-played`}
                prefetch={false}
                className={`hocus:underline`}
              >
                Recently Played
              </Link>
            }
            data={recentlyPlayedData?.items}
            isLoading={recentlyPlayedIsLoading}
          />
        </section>
      )}

      {categories.items?.slice(1).map((category, i) => {
        return (
          handleFindCategory(category.name) &&
          handleFindCategory(category.name).playlists.items.length > 0 && (
            <section key={category.id}>
              <SliderPlaylist
                id={`slider-${category.id}`}
                title={
                  <Link
                    href={`/section/${category.id}`}
                    prefetch={false}
                    className={`hocus:underline`}
                  >
                    {category.name}
                  </Link>
                }
                data={handleFindCategory(category.name).playlists.items}
              />
            </section>
          )
        );
      })}
    </div>
  );
}
