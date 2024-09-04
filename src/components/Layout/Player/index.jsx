"use client";

/* eslint-disable @next/next/no-img-element */

import { userStore } from "@/zustand/user";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TrackCard from "../../Track/Card";
import Playback from "./Playback";
import LoadingCard from "@/components/Loading/Card";
import PlaybackOptions from "./Options";
import { usePlayback } from "@/zustand/playback";
import { fetchCurrentUserPlaybackState } from "@/helper/fetch";
import { useRouter } from "next/navigation";
import { useQueue } from "@/zustand/queue";
import { useAuth } from "@/hooks/auth";

export default function Player() {
  const { user } = userStore();
  const { mutate } = useAuth();
  const { playback, setPlayback } = usePlayback();
  const { queue, setQueue } = useQueue();

  const router = useRouter();

  const [artists, setArtists] = useState();
  const [trackImage, setTrackImage] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setPlayback(null);
      setArtists(null);
      setTrackImage(null);
      setIsLoading(false);
      return;
    }

    const fetchCurrentUserPlaybackState = async () => {
      setIsLoading(true);
      const { data } = await axios.get(`/api/me/player`);
      setIsLoading(false);

      if (typeof data === "object") {
        setPlayback(data);
      } else {
        fetchQueue();
      }
    };

    const fetchQueue = async () => {
      try {
        const { data } = await axios.get("/api/me/player/queue");

        setPlayback(data.currently_playing);
        setQueue(data.queue);
      } catch ({ response }) {
        setPlayback(null);
        setQueue([]);
        if (response.status === 401) {
          mutate(null);
          router.push("/login");
        }
      }
    };

    fetchCurrentUserPlaybackState();
  }, [user]);

  useEffect(() => {
    setArtists(playback?.item?.artists.map((artist) => artist.name).join(", "));
    setTrackImage(
      playback?.item?.album.images.find((image) => image.width === 64),
    );
  }, [playback]);

  return (
    <div
      className={`grid w-full grid-cols-6 items-center gap-2 sm:gap-4 md:grid-cols-12`}
    >
      {/* Track Info (Image, Title, Artist) */}
      <div className={`col-span-1 sm:col-span-2`}>
        {isLoading && <LoadingCard responsive={true} />}

        {!isLoading && (
          <TrackCard
            name={playback?.item?.name ?? "Nothing playing"}
            image={trackImage?.url ?? "/maskable/maskable_icon_x192.png"}
            responsive={true}
            info={artists}
          />
        )}
      </div>

      {/* Playback (Play, Pause, Next, Previous, Runtime) */}
      <div
        className={`col-span-4 sm:col-span-3 md:col-span-8 lg:col-span-7 xl:col-span-8`}
      >
        <Playback track={playback} isLoading={isLoading} />
      </div>

      {/* Options (Volume, Shuffle, Repeat) */}
      <div className={`md:col-span-2 lg:col-span-3 xl:col-span-2`}>
        <PlaybackOptions track={playback} isLoading={isLoading} />
      </div>
    </div>
  );
}
