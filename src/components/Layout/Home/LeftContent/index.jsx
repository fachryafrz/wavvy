"use client";

import { useAuth } from "@/hooks/auth";
import PlaylistOfTheDay from "../PlaylistOfTheDay";
import HomeTabs from "./Tabs";
import LoginBanner from "../../LoginBanner";

export default function LeftContent() {
  const { user } = useAuth();

  return (
    <div className={`flex flex-col gap-8 @container`}>
      {/* Playlist of the Day & Video */}
      <section className={`flex flex-col gap-4 @2xl:flex-row`}>
        {/* Playlist of the Day */}
        <div className={`flex justify-center md:justify-start`}>
          <PlaylistOfTheDay />
        </div>

        {/* Video */}
        <span>Video</span>
      </section>

      {/* Playlists, Artists, Albums, Streams */}
      <section>{!user && <LoginBanner />}</section>
      <section>{user && <HomeTabs />}</section>
    </div>
  );
}
