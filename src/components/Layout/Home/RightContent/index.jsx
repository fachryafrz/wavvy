"use client";

import { userStore } from "@/zustand/user";
import FavoriteArtists from "../../FavoriteArtists";
import ListenMoreOften from "../ListenMoreOften";
import NewReleases from "../NewReleases";
import LoginBanner from "../../LoginBanner";

export default function RightContent() {
  const { user } = userStore();

  if (user) {
    return (
      <div className={`flex flex-col gap-4`}>
        <NewReleases />

        <ListenMoreOften />

        <FavoriteArtists />
      </div>
    );
  }
}
