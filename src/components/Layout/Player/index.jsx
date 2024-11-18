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
  const [volumeState, setVolumeState] = useState(100);

  // Hooks
  const playback = usePlaybackState();

  const { data: recentlyPlayed } = useQuery({
    queryKey: `/me/player/recently-played`,
    queryFn: async ({ queryKey }) => {
      return await fetchData(queryKey).then(({ data }) => data.items[0].track);
    },
  });

  useEffect(() => {
    const getPlaybackState = async () => {
      const { data } = await fetchData(`/me/player`);
      setVolumeState(data.device?.volume_percent);
    };

    if (playback) getPlaybackState();
  }, [playback]);

  return (
    <div
      id="player"
      className={`grid w-full grid-cols-3 items-center gap-2 sm:gap-4`}
    >
      {/* Track Info (Image, Title, Artist) */}
      <div className={`col-span-2 sm:col-span-1`}>
        <PlayerInfo
          track={playback?.track_window?.current_track ?? recentlyPlayed}
        />
      </div>

      {/* Playback (Play, Pause, Next, Previous, Runtime) */}
      <div className={``}>
        <Playback
          track={playback?.track_window?.current_track ?? recentlyPlayed}
        />
      </div>

      {/* Options (Volume, Shuffle, Repeat) */}
      <div className={`hidden sm:block`}>
        <PlaybackOptions
          track={playback?.track_window?.current_track ?? recentlyPlayed}
          volumeState={volumeState}
          setVolumeState={setVolumeState}
        />
      </div>
    </div>
  );
}
