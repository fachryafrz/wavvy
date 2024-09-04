"use client";

import { userStore } from "@/zustand/user";
import HomeTabs from "./Tabs";
import SliderPlaylist from "../../../Slider/Playlist";
import Link from "next/link";
import FavoriteArtists from "../../FavoriteArtists";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";

export default function LeftContent({
  categories,
  categoriesPlaylists,
  favoriteArtists,
}) {
  const { user } = userStore();
  const { mutate } = useAuth();
  const router = useRouter();

  const [recentlyPlayedData, setRecentlyPlayedData] = useState();
  const [recentlyPlayedIsLoading, setRecentlyPlayedIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchRecentlyPlayed = async () => {
      try {
        setRecentlyPlayedIsLoading(true);
        const { data } = await axios.get(`/api/me/player/recently-played`);
        setRecentlyPlayedIsLoading(false);

        setRecentlyPlayedData(data);
      } catch ({ response }) {
        if (response.status === 401) {
          mutate(null);
          router.push("/login");
        }
      }
    };

    fetchRecentlyPlayed();
  }, [user]);

  return (
    <div className={`flex flex-col gap-4 @container`}>
      {/* Categories */}
      {categories.items?.slice(0, 1).map((category, i) => {
        return (
          <section key={category.id}>
            <SliderPlaylist
              id={category.id}
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
                  .playlists
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
          id={`recentlyPlayed`}
          title={
            <Link
              href={`/me/player/recently-played`}
              className={`hocus:underline`}
            >
              Recently Played
            </Link>
          }
          data={recentlyPlayedData}
          isLoading={recentlyPlayedIsLoading}
        />
      </section>

      {categories.items?.slice(1, categories.length).map((category, i) => {
        return (
          <section key={category.id}>
            <SliderPlaylist
              id={category.id}
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
                  .playlists
              }
            />
          </section>
        );
      })}
    </div>
  );
}
