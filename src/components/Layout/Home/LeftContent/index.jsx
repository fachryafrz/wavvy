"use client";

import { userStore } from "@/zustand/user";
import PlaylistOfTheDay from "../PlaylistOfTheDay";
import HomeTabs from "./Tabs";
import LoginBanner from "../../LoginBanner";
import RecentlyPlayed from "./RecentlyPlayed";

export default function LeftContent() {
  const { user } = userStore();

  return (
    <div className={`flex flex-col gap-4 @container`}>
      {!user && <LoginBanner />}

      {/* Playlist of the Day & Video */}
      <section className={`flex flex-col gap-4 @2xl:flex-row`}>
        {/* Playlist of the Day */}
        {/* <div className={`flex justify-center md:justify-start`}>
          <PlaylistOfTheDay />
        </div> */}

        {/* Video */}
        {/* <span>Video</span> */}

        {user && <RecentlyPlayed />}
      </section>

      {/* Playlists, Artists, Albums, Streams */}
      <section>{user && <HomeTabs />}</section>
    </div>
  );
}
