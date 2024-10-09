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

export default function Player() {
  const { playback, setPlayback } = usePlayback();
  const { queue, setQueue } = useQueue();

  const [trackImage, setTrackImage] = useState();
  const [loading, setLoading] = useState(true);

  const {
    data: playbackData,
    error: playbackError,
    refetch: fetchPlayback,
  } = useQuery({
    queryKey: `/api/me/player`,
    queryFn: async ({ queryKey }) => {
      return await axios.get(queryKey).then(({ data }) => data);
    },
  });

  const {
    data: queueData,
    error: queueError,
    refetch: fetchQueue,
  } = useQuery({
    queryKey: `/api/me/player/queue`,
    queryFn: async ({ queryKey }) => {
      return await axios.get(queryKey).then(({ data }) => data);
    },
    enabled: false,
  });

  useEffect(() => {
    if (playbackData) {
      setPlayback(playbackData);
    } else {
      // fetchQueue();
    }
  }, [playbackData]);

  useEffect(() => {
    if (queueData) {
      setPlayback(queueData.currently_playing);
      setQueue(queueData.queue);
    }
  }, [queueData]);

  useEffect(() => {
    setTrackImage(
      playback?.item?.album.images.find((image) => image.width === 64),
    );
    setLoading(false);
  }, [playback]);

  return (
    <div
      id="player"
      className={`grid w-full grid-cols-6 items-center gap-2 sm:gap-4 md:grid-cols-12`}
    >
      {/* Track Info (Image, Title, Artist) */}
      <div className={`col-span-1 sm:col-span-2`}>
        {loading && <LoadingCard responsive={true} />}

        {!loading && (
          <TrackCard
            name={
              playback?.item?.name ? (
                <Link
                  href={`/${playback.item?.type}/${playback.item?.id}`}
                  prefetch={true}
                  className={`hocus:underline`}
                >
                  {playback.item?.name}
                </Link>
              ) : (
                "Nothing Playing"
              )
            }
            image={trackImage?.url ?? "/maskable/maskable_icon_x192.png"}
            responsive={true}
            info={playback?.item?.artists.map((artist) => {
              return (
                <>
                  <Link
                    href={`/${artist.type}/${artist.id}`}
                    prefetch={true}
                    className={`hocus:underline`}
                  >
                    {artist.name}
                  </Link>

                  <span className={`last:hidden`}>, </span>
                </>
              );
            })}
          />
        )}
      </div>

      {/* Playback (Play, Pause, Next, Previous, Runtime) */}
      <div
        className={`col-span-4 sm:col-span-3 md:col-span-8 lg:col-span-7 xl:col-span-8`}
      >
        <Playback track={playback} loading={loading} />
      </div>

      {/* Options (Volume, Shuffle, Repeat) */}
      <div className={`md:col-span-2 lg:col-span-3 xl:col-span-2`}>
        <PlaybackOptions track={playback} loading={loading} />
      </div>
    </div>
  );
}
