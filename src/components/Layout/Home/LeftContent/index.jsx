"use client";

import { userStore } from "@/zustand/user";
import HomeTabs from "./Tabs";
import RecentlyPlayed from "./RecentlyPlayed";
import SliderPlaylist from "../../../Slider/Playlist";
import Link from "next/link";

export default function LeftContent({ categories, categoriesPlaylists }) {
  const { user } = userStore();

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
      <section>
        <HomeTabs />
      </section>

      <section>
        <RecentlyPlayed />
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
