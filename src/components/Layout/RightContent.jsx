"use client";

import { useAuth } from "@/hooks/auth";
import FavoriteArtists from "./FavoriteArtists";
import ListenMoreOften from "./ListenMoreOften";
import NewReleases from "./NewReleases";

export default function RightContent() {
  const { user } = useAuth();

  return (
    <div
      className={`flex flex-col gap-8 bg-base-100 p-4 lg:col-span-4 lg:col-start-9 xl:col-span-3 xl:col-start-10`}
    >
      <NewReleases />

      {user && <ListenMoreOften />}

      {user && <FavoriteArtists />}
    </div>
  );
}
