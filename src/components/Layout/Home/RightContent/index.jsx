"use client";

import { useAuth } from "@/hooks/auth";
import FavoriteArtists from "../../FavoriteArtists";
import ListenMoreOften from "../ListenMoreOften";
import NewReleases from "../NewReleases";

export default function RightContent() {
  const { user } = useAuth();

  return (
    <div className={`flex flex-col gap-8`}>
      <NewReleases />

      {user && <ListenMoreOften />}

      {user && <FavoriteArtists />}
    </div>
  );
}
