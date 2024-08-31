"use client";

import { userStore } from "@/zustand/user";
import FavoriteArtists from "../../FavoriteArtists";
import SavedTracks from "../SavedTracks";
import NewReleases from "../NewReleases";

export default function RightContent({
  newReleases,
  savedTracks,
  favoriteArtists,
}) {
  const { user } = userStore();

  if (user) {
    return (
      <div className={`right-content sticky flex flex-col gap-4`}>
        <NewReleases data={newReleases} />

        <SavedTracks data={savedTracks} />

        <FavoriteArtists data={favoriteArtists} />
      </div>
    );
  }
}
