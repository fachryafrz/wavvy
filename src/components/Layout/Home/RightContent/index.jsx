"use client";

import { userStore } from "@/zustand/user";
import FavoriteArtists from "../../FavoriteArtists";
import ListenMoreOften from "../ListenMoreOften";
import NewReleases from "../NewReleases";
import LoginBanner from "../../LoginBanner";

export default function RightContent() {
  const { user } = userStore();

  return (
    <div className={`flex flex-col gap-4`}>
      <NewReleases />

      {!user && <LoginBanner />}

      {user && <ListenMoreOften />}

      {user && <FavoriteArtists />}
    </div>
  );
}
