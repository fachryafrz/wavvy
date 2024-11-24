"use client";

import { useAuth } from "@/hooks/auth";
import { playSong } from "@/lib/play-song";
import { useErrorAlert } from "@/zustand/error-alert";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Pause, Play } from "react-ionicons";
import {
  useErrorState,
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";

export default function CardVertical({ name, link, image, info, uri }) {
  const { user } = useAuth();
  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
  const playback = usePlaybackState();
  const error = useErrorState();
  const { setErrorAlert } = useErrorAlert();

  const [, type, id] = uri.split(":");

  const isPlaying =
    (playback?.context?.uri === uri ||
      playback?.track_window?.current_track?.id === id) &&
    !playback?.paused;

  return (
    <article
      className={`group flex flex-col gap-2 rounded-xl p-2 hocus:bg-neutral`}
    >
      <figure
        className={`relative aspect-square overflow-hidden ${type === `artist` ? `rounded-full` : `rounded-lg`}`}
      >
        <div
          className={`pointer-events-none absolute inset-0 flex translate-y-2 items-end justify-end p-3 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 [&_*]:pointer-events-auto`}
        >
          {type !== `artist` && (
            <button
              onClick={async () =>
                error
                  ? setErrorAlert(error)
                  : await playSong(user, device, uri)
              }
              className={`btn btn-circle btn-primary btn-lg grid border-none bg-opacity-50 outline-none backdrop-blur hocus:bg-opacity-100`}
            >
              {isPlaying ? (
                <Pause color={`#ffffff`} width={`2rem`} height={`2rem`} />
              ) : (
                <Play color={`#ffffff`} width={`2rem`} height={`2rem`} />
              )}
            </button>
          )}
        </div>

        {link ? (
          <Link
            href={link}
            className={`pointer-events-none lg:pointer-events-auto`}
          >
            <img src={image} alt={name} loading="lazy" draggable="false" />
          </Link>
        ) : (
          <img src={image} alt={name} loading="lazy" draggable="false" />
        )}
      </figure>

      <div className={`flex flex-col gap-1`}>
        <h3
          className={`line-clamp-1 font-medium hocus:underline ${type === `artist` ? `text-center` : `text-start`}`}
        >
          <Link href={link}>{name}</Link>
        </h3>

        {info && (
          <span className={`line-clamp-2 text-sm font-medium text-neutral-500`}>
            {info}
          </span>
        )}
      </div>
    </article>
  );
}
