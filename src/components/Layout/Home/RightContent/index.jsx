"use client";

import { userStore } from "@/zustand/user";
import FavoriteArtists from "../../FavoriteArtists";
import ListenMoreOften from "../ListenMoreOften";
import NewReleases from "../NewReleases";
import LoginBanner from "../../LoginBanner";
import { useCallback, useEffect, useRef, useState } from "react";
import useDetectScroll from "@smakss/react-scroll-direction";

export default function RightContent({
  newReleases,
  listenMoreOften,
  favoriteArtists,
}) {
  const { user } = userStore();

  if (user) {
    return (
      <div className={`right-content sticky flex flex-col gap-4`}>
        <NewReleases data={newReleases} />

        <ListenMoreOften data={listenMoreOften} />

        <FavoriteArtists data={favoriteArtists} />
      </div>
    );
  }
}
