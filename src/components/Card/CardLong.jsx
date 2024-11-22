"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Play } from "react-ionicons";
import TrackCard from "../Track/Card";
import Link from "next/link";
import { playSong } from "@/lib/play-song";
import {
  useErrorState,
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";
import { useAuth } from "@/hooks/auth";
import AudioWave from "../Animation/AudioWave";
import { useErrorAlert } from "@/zustand/error-alert";

export default function CardLong({
  item,
  link,
  image,
  name,
  secondInfo,
  thirdInfo,
  smallInfo,
  cta = true,
  hover = true,
}) {
  const { user } = useAuth();

  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
  const playback = usePlaybackState();
  const error = useErrorState();
  const { setErrorAlert } = useErrorAlert();

  const isPlaying =
    (playback?.context?.uri === item?.uri ||
      playback?.track_window?.current_track?.id === item?.id) &&
    !playback?.paused;

  return (
    <div
      className={`grid grid-cols-6 items-center gap-2 @lg:grid-cols-12 ${hover ? `hocus:rounded-lg hocus:bg-neutral` : ``}`}
    >
      {/* Image, Title */}
      <div
        className={`col-span-4 ${secondInfo && thirdInfo ? `@lg:col-span-5` : secondInfo || thirdInfo ? `@lg:col-span-8` : ``} ${cta ? `@lg:col-span-10` : `col-span-6 @lg:col-span-12`}`}
      >
        <TrackCard
          name={
            name ?? (
              <Link href={link} className={`${hover ? `hocus:underline` : ``}`}>
                {item.name}
              </Link>
            )
          }
          image={image}
          info={smallInfo}
        />
      </div>

      {/* Second Info */}
      {secondInfo && (
        <div
          className={`col-span-2 hidden justify-center @lg:col-span-3 @lg:flex`}
        >
          <span className={`line-clamp-1 w-full text-sm font-medium`}>
            {secondInfo}
          </span>
        </div>
      )}

      {/* Third Info */}
      {thirdInfo && (
        <div className={`col-span-2 hidden justify-center @lg:flex`}>
          <span className={`line-clamp-1 w-full text-sm font-medium`}>
            {thirdInfo}
          </span>
        </div>
      )}

      {/* Play, Options */}
      {cta && item.type !== "artist" && (
        <div
          className={`col-span-2 col-start-5 flex justify-end pr-1 @lg:col-start-12`}
        >
          {isPlaying ? (
            <AudioWave />
          ) : (
            <button
              onClick={async () =>
                error
                  ? setErrorAlert(error)
                  : playback
                    ? playback.paused
                      ? await player.resume()
                      : await player.pause()
                    : playSong(user, device, item.uri)
              }
              className={`btn btn-square btn-ghost btn-sm`}
            >
              <Play color={`#ffffff`} width={`20px`} height={`20px`} />
            </button>
          )}

          {/* <button className={`btn btn-square btn-ghost btn-sm`}>
            <EllipsisVertical
              color={`#ffffff`}
              width={`20px`}
              height={`20px`}
            />
          </button> */}
        </div>
      )}
    </div>
  );
}
