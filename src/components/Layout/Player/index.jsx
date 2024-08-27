/* eslint-disable @next/next/no-img-element */
import { useAuth } from "@/hooks/auth";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TrackCard from "../../Track/Card";
import Playback from "./Playback";
import LoadingCard from "@/components/Loading/Card";
import PlaybackOptions from "./Options";

export default function Player() {
  const { user } = useAuth();

  const [track, setTrack] = useState();
  const [artists, setArtists] = useState();
  const [trackImage, setTrackImage] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchCurrentUserPlaybackState = async () => {
        setIsLoading(true);

        const { data } = await axios.get(`/api/me/player`);

        setIsLoading(false);

        console.log(data);
        setTrack(data);
        setArtists(data.item.artists.map((artist) => artist.name).join(", "));
        setTrackImage(
          data.item.album.images.find((image) => image.width === 64),
        );
      };

      fetchCurrentUserPlaybackState();
    } else {
      setTrack(null);
      setArtists(null);
      setTrackImage(null);
      setIsLoading(false);
    }
  }, [user]);

  return (
    <div
      className={`grid w-full grid-cols-6 items-center gap-4 md:grid-cols-12`}
    >
      {/* Track Info (Image, Title, Artist) */}
      <div className={`col-span-1 sm:col-span-2`}>
        {isLoading && <LoadingCard responsive={true} />}

        {!isLoading && (
          <TrackCard
            name={track?.item.name ?? "Nothing playing"}
            image={trackImage?.url ?? "/maskable/maskable_icon_x192.png"}
            responsive={true}
            info={
              <span
                className={`line-clamp-1 text-xs font-medium text-neutral-500`}
              >
                {artists}
              </span>
            }
          />
        )}
      </div>

      {/* Playback (Play, Pause, Next, Previous, Runtime) */}
      <div
        className={`col-span-4 sm:col-span-3 md:col-span-8 lg:col-span-7 xl:col-span-8`}
      >
        <Playback track={track} isLoading={isLoading} />
      </div>

      {/* Options (Volume, Shuffle, Repeat) */}
      <div className={`md:col-span-2 lg:col-span-3 xl:col-span-2`}>
        <PlaybackOptions track={track} isLoading={isLoading} />
      </div>
    </div>
  );
}
