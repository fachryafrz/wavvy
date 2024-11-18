"use client";

/* eslint-disable @next/next/no-img-element */

import axios from "axios";
import React, { useEffect, useState } from "react";
import TrackCard from "../../Track/Card";
import Playback from "./Playback";
import LoadingCard from "@/components/Loading/Card";
import PlaybackOptions from "./Options";
import { usePlayback } from "@/zustand/playback";
import { useQueue } from "@/zustand/queue";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
  useWebPlaybackSDKReady,
} from "react-spotify-web-playback-sdk";
import { fetchData } from "@/server/actions";
import { useAuth } from "@/hooks/auth";
import PlayerInfo from "./Info";

export default function Player() {
  // Hooks
  const playback = usePlaybackState();

  const { data: recentlyPlayed } = useQuery({
    queryKey: `/me/player/recently-played`,
    queryFn: async ({ queryKey }) => {
      return await fetchData(queryKey).then(({ data }) => data.items[0].track);
    },
  });

  return (
    <div
      id="player"
      className={`grid w-full grid-cols-6 items-center gap-2 sm:gap-4 md:grid-cols-12`}
    >
      {/* Track Info (Image, Title, Artist) */}
      <div className={`col-span-3 sm:col-span-2 md:col-span-4 lg:col-span-3`}>
        <PlayerInfo
          track={playback?.track_window?.current_track ?? recentlyPlayed}
        />
      </div>

      {/* Playback (Play, Pause, Next, Previous, Runtime) */}
      <div className={`col-span-2 sm:col-span-3 md:col-span-6`}>
        <Playback
          track={playback?.track_window?.current_track ?? recentlyPlayed}
        />
      </div>

      {/* Options (Volume, Shuffle, Repeat) */}
      <div className={`md:col-span-2 lg:col-span-3`}>
        <PlaybackOptions
          track={playback?.track_window?.current_track ?? recentlyPlayed}
        />
      </div>
    </div>
  );
}
