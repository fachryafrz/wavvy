"use client";

import { userStore } from "@/zustand/user";
import SavedTracks from "../SavedTracks";
import NewReleases from "../Old_NewReleases";

export default function RightContent({
  newReleases,
  savedTracks,
}) {
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
