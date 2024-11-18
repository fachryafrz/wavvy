"use client";

import AudioWave from "@/components/Animation/AudioWave";
import { useAuth } from "@/hooks/auth";
import { playSong } from "@/lib/play-song";
import { fetchData } from "@/server/actions";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { HeartOutline } from "react-ionicons";
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";

export default function DetailsHero({
  item,
  artists,
  type,
  image,
  title,
  secondInfo,
}) {
  const { user } = useAuth();

  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
  const playback = usePlaybackState();

  const [fontSize, setFontSize] = useState(`2xl:text-7xl`);
  const [translateY, setTranslateY] = useState(`2xl:translate-y-7`);

  useEffect(() => {
    const { name } = item;

    if (name.length > 40) {
      setFontSize(`2xl:text-4xl`);
      setTranslateY(`2xl:translate-y-4`);
    } else if (name.length > 30) {
      setFontSize(`2xl:text-5xl`);
      setTranslateY(`2xl:translate-y-5`);
    } else if (name.length > 20) {
      setFontSize(`2xl:text-6xl`);
      setTranslateY(`2xl:translate-y-6`);
    } else if (name.length > 10) {
      setFontSize(`2xl:text-7xl`);
      setTranslateY(`2xl:translate-y-7`);
    }
  }, [item]);

  const isPlaying =
    (playback?.context?.uri === item?.uri ||
      playback?.track_window?.current_track?.id === item?.id) &&
    !playback?.paused;

  return (
    <div
      className={`relative -mx-4 flex flex-col-reverse items-center justify-between gap-4 overflow-clip p-4 md:mx-0 md:flex-row md:rounded-3xl md:p-8`}
    >
      <div
        className={`flex w-full flex-grow flex-col items-center gap-6 text-center md:items-start md:text-start`}
      >
        {/* Details */}
        <div className={`flex w-full flex-col gap-4 @container`}>
          {/* Type */}
          <span
            data-before-content={type}
            className={`before-content hidden translate-y-4 font-medium capitalize text-white md:block ${translateY}`}
          />

          {/* Title */}
          <h1
            className={`line-clamp-2 text-pretty text-2xl font-bold !leading-snug text-white @sm:text-4xl @2xl:text-5xl ${fontSize}`}
          >
            {title}
          </h1>

          {/* Album */}
          {secondInfo && (
            <div className={`flex justify-center gap-1 md:justify-start`}>
              {secondInfo}
            </div>
          )}

          {/* Artist */}
          {artists && (
            <div className={`text-white`}>
              <div
                className={`flex flex-wrap items-center justify-center gap-4 md:justify-start`}
              >
                {artists.map((artist) => {
                  const [image] = artist.images;

                  return (
                    <div key={artist.id} className={`flex items-center gap-2`}>
                      <figure
                        className={`aspect-square w-[40px] overflow-hidden rounded-full`}
                      >
                        <img
                          src={image?.url ?? "/maskable/maskable_icon_x192.png"}
                          alt={artist.name}
                          loading="lazy"
                          draggable="false"
                        />
                      </figure>

                      <Link
                        href={`/${artist.type}/${artist.id}`}
                        className={`font-medium hocus:underline`}
                      >
                        {artist.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className={`flex w-full items-center gap-4`}>
          {item.type !== "artist" && (
            <button
              onClick={() => playSong(user, device, item.type, item.uri)}
              className={`btn btn-primary flex-grow rounded-full disabled:cursor-not-allowed md:max-w-[150px]`}
            >
              {isPlaying && <AudioWave className={`[&_*]:!bg-white`} />}
              <span>{isPlaying ? "Playing" : "Listen Now"}</span>
            </button>
          )}

          {/* <button
            className={`btn btn-square btn-outline btn-primary flex items-center justify-center rounded-full`}
          >
            <HeartOutline color={`#ffffff`} />
          </button> */}
        </div>
      </div>

      <figure
        className={`aspect-square w-full max-w-[200px] overflow-hidden rounded-xl shadow-xl sm:max-w-[300px]`}
      >
        <img src={image} alt={item.name} loading="lazy" draggable="false" />
      </figure>

      <div className={`absolute inset-0 -z-10`}>
        <figure
          className={`h-full w-full opacity-40`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: `cover`,
            backgroundPosition: `center`,
            filter: `blur(30px)`,
          }}
        ></figure>
      </div>
    </div>
  );
}
