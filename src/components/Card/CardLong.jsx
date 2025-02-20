"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { EllipsisVertical, Play, Radio } from "react-ionicons";
import TrackCard from "../Track/Card";
import Link from "next/link";
import {
  useErrorState,
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";
import { useAuth } from "@/hooks/auth";
import AudioWave from "../Animation/AudioWave";
import { useErrorAlert } from "@/zustand/error-alert";
import { playSong, startRadio } from "@/lib/playback";

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
              <Link
                href={link}
                prefetch={false}
                className={`${hover ? `hocus:underline` : ``}`}
              >
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
          className={`col-span-2 col-start-5 flex items-center justify-end pr-1 @lg:col-start-12`}
        >
          {isPlaying ? (
            <AudioWave />
          ) : (
            <button
              onClick={() =>
                error
                  ? setErrorAlert(error)
                  : playSong({ user, device, uri: item.uri })
              }
              className={`btn btn-square btn-ghost btn-sm`}
            >
              <Play color={`#ffffff`} width={`20px`} height={`20px`} />
            </button>
          )}

          {!["album", "playlist"].includes(item.type) && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className={`btn btn-square btn-ghost btn-sm`}
              >
                <EllipsisVertical
                  color={`#ffffff`}
                  width={`20px`}
                  height={`20px`}
                />
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] rounded-lg bg-neutral-800 p-1 shadow-xl"
              >
                <li>
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
                  >
                    <Radio color={`#fff`} width={`16px`} height={`16px`} />
                    <span className={`whitespace-nowrap font-medium`}>
                      Start Radio
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
