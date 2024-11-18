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

export default function Player() {
  // Hooks
  const { user } = useAuth();
  const webPlaybackSDKReady = useWebPlaybackSDKReady();
  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
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
        {!webPlaybackSDKReady && <LoadingCard />}

        {webPlaybackSDKReady && (
          <TrackCard
            id={playback?.track_window?.current_track?.id ?? recentlyPlayed?.id}
            type={playback?.track_window?.current_track?.type ?? "track"}
            name={
              !user ? (
                "Nothing Playing"
              ) : (
                <Link
                  href={`/${playback?.track_window?.current_track?.type ?? "track"}/${playback?.track_window?.current_track?.id ?? recentlyPlayed?.id}`}
                  className={`hocus:underline`}
                >
                  {playback?.track_window?.current_track?.name ??
                    recentlyPlayed?.name}
                </Link>
              )
            }
            image={
              !user
                ? "/maskable/maskable_icon_x192.png"
                : (playback?.track_window?.current_track?.album.images[0].url ??
                  recentlyPlayed?.album.images[0].url)
            }
            info={
              !user
                ? null
                : (playback?.track_window?.current_track?.artists.map(
                    (artist) => {
                      const [app, type, id] = artist.uri.split(":");

                      return (
                        <>
                          <Link
                            href={`/artist/${id}`}
                            className={`hocus:underline`}
                          >
                            {artist.name}
                          </Link>

                          <span className={`last:hidden`}>, </span>
                        </>
                      );
                    },
                  ) ??
                  recentlyPlayed?.artists.map((artist) => {
                    const [app, type, id] = artist.uri.split(":");

                    return (
                      <>
                        <Link
                          href={`/artist/${id}`}
                          className={`hocus:underline`}
                        >
                          {artist.name}
                        </Link>

                        <span className={`last:hidden`}>, </span>
                      </>
                    );
                  }))
            }
          />
        )}
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
