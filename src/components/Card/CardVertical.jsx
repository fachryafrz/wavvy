"use client";

import { useAuth } from "@/hooks/auth";
import { playSong, startRadio } from "@/server/actions";
import { useErrorAlert } from "@/zustand/error-alert";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { EllipsisVertical, Pause, Play, Radio } from "react-ionicons";
import {
  useErrorState,
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";

export default function CardVertical({ item, image, info }) {
  const { user } = useAuth();
  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
  const playback = usePlaybackState();
  const error = useErrorState();
  const { setErrorAlert } = useErrorAlert();

  const [, type, id] = item.uri.split(":");

  const isPlaying =
    (playback?.context?.uri === item.uri ||
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
          className={`pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-end gap-1 p-3 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 [&_*]:pointer-events-auto`}
        >
          {type !== `artist` && (
            <>
              {!["album", "playlist"].includes(item.type) && (
                <button
                  onClick={() =>
                    error
                      ? setErrorAlert(error)
                      : startRadio({
                          user,
                          device,
                          uri: item.uri,
                          artists: item.artists,
                        })
                  }
                  className={`btn btn-circle btn-ghost btn-sm grid border-none bg-white bg-opacity-50 outline-none backdrop-blur hocus:!bg-white hocus:bg-opacity-100`}
                >
                  <Radio color={`#000`} />
                </button>
              )}

              <button
                onClick={() =>
                  error
                    ? setErrorAlert(error)
                    : playback &&
                        (playback.track_window.current_track.album.uri.split(
                          ":",
                        )[2] === id ||
                          playback.track_window.current_track.id === id)
                      ? playback.paused
                        ? player.resume()
                        : player.pause()
                      : playSong({ user, device, uri: item.uri })
                }
                className={`btn btn-circle btn-primary btn-lg grid border-none bg-opacity-50 outline-none backdrop-blur hocus:bg-opacity-100`}
              >
                {isPlaying ? (
                  <Pause color={`#ffffff`} width={`2rem`} height={`2rem`} />
                ) : (
                  <Play color={`#ffffff`} width={`2rem`} height={`2rem`} />
                )}
              </button>
            </>
          )}
        </div>

        <Link
          href={`/${item.type}/${item.id}`}
          prefetch={false}
          className={`pointer-events-none lg:pointer-events-auto`}
        >
          <img src={image} alt={item.name} draggable="false" />
        </Link>
      </figure>

      <div
        className={`flex flex-col gap-1 ${type === `artist` ? `items-center` : `items-start`}`}
      >
        <h3 className={`line-clamp-1 max-w-fit font-medium hocus:underline`}>
          <Link href={`/${item.type}/${item.id}`} prefetch={false}>
            {item.name}
          </Link>
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
