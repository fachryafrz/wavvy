"use client";

import SavedTracks from "../Old_SavedTracks";
import NewReleases from "../Old_NewReleases";
import { userStore } from "@/zustand/user";

export default function RightContent({ newReleases, savedTracks }) {
  const { user } = userStore();

  if (user) {
    return (
      <div className={`right-content sticky flex flex-col gap-4`}>
        <NewReleases data={newReleases} />

        <SavedTracks data={savedTracks} />
      </div>
    );
  }
}
