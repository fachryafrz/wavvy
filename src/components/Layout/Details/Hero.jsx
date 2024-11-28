"use client";

/* eslint-disable @next/next/no-img-element */

import AudioWave from "@/components/Animation/AudioWave";
import { useAuth } from "@/hooks/auth";
import { fetchData, playSong, startRadio } from "@/server/actions";
import { useErrorAlert } from "@/zustand/error-alert";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AddCircleOutline, CheckmarkCircle, Radio } from "react-ionicons";
import {
  useErrorState,
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
  isSaved,
  isFollowed,
  secondInfo,
}) {
  // Hooks
  const { user } = useAuth();
  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
  const playback = usePlaybackState();
  const error = useErrorState();
  const { setErrorAlert } = useErrorAlert();
  const queryClient = useQueryClient();

  // State
  const [fontSize, setFontSize] = useState(`2xl:text-7xl`);
  const [translateY, setTranslateY] = useState(`2xl:translate-y-7`);
  const [isSavedState, setIsSavedState] = useState(isSaved);
  const [isFollowedState, setIsFollowedState] = useState(isFollowed);

  // Functions
  const { refetch: saveTrackRefetch } = useQuery({
    enabled: false,
    queryKey:
      item.type === "playlist"
        ? `/playlists/${item.id}/followers`
        : `/me/${item.type}s?ids=${item.id}`,
    queryFn: async ({ queryKey }) => {
      await fetchData(queryKey, { method: isSavedState ? "DELETE" : "PUT" });
      setIsSavedState(!isSavedState);

      const { data } = await fetchData(`/me/playlists`);
      queryClient.setQueryData(`/me/playlists`, data);
    },
  });
  const { refetch: followArtistRefetch } = useQuery({
    enabled: false,
    queryKey: `/me/following`,
    queryFn: async ({ queryKey }) => {
      await fetchData(queryKey, {
        method: isFollowedState ? "DELETE" : "PUT",
        params: { type: `artist`, ids: item.id },
      });
      setIsFollowedState(!isFollowedState);
    },
  });

  // NOTE: Buat play from artist dari popular songs

  // Lifecycle
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

  // Helpers
  const isPlaying =
    (playback?.context?.uri === item?.uri ||
      playback?.track_window?.current_track?.id === item?.id) &&
    !playback?.paused;

  return (
    <div
      className={`relative -mx-4 flex flex-col-reverse items-center justify-between gap-4 overflow-clip px-4 py-12 md:mx-0 md:flex-row md:rounded-3xl md:p-8`}
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
                      <Link href={`/${artist.type}/${artist.id}`}>
                        <figure
                          className={`aspect-square w-[40px] overflow-hidden rounded-full`}
                        >
                          <img
                            src={
                              image?.url ?? "/maskable/maskable_icon_x192.png"
                            }
                            alt={artist.name}
                            draggable="false"
                          />
                        </figure>
                      </Link>

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
        <div className={`flex w-full items-center gap-2`}>
          {item.type !== "artist" ? (
            <>
              <button
                onClick={() =>
                  error
                    ? setErrorAlert(error)
                    : playSong({ user, device, uri: item.uri })
                }
                className={`btn btn-primary flex-grow rounded-full disabled:cursor-not-allowed md:max-w-[150px]`}
              >
                {isPlaying && <AudioWave className={`[&_*]:!bg-white`} />}
                <span>{isPlaying ? "Playing" : "Listen Now"}</span>
              </button>

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
                  className={`btn btn-circle btn-ghost rounded-full bg-white text-black disabled:cursor-not-allowed hocus:!bg-white hocus:!bg-opacity-80 sm:max-w-fit sm:flex-grow sm:px-4`}
                >
                  <Radio color={`#000`} />
                  <span className={`hidden sm:inline`}>Radio</span>
                </button>
              )}

              <button
                onClick={() =>
                  error ? setErrorAlert(error) : saveTrackRefetch()
                }
                className={`btn btn-circle btn-ghost transition-all focus-visible:outline-none hocus:scale-110 hocus:!bg-transparent`}
              >
                {isSavedState ? (
                  <CheckmarkCircle
                    color={`#ff6337`}
                    width={`2rem`}
                    height={`2rem`}
                  />
                ) : (
                  <AddCircleOutline
                    color={`#ffffff`}
                    width={`2rem`}
                    height={`2rem`}
                  />
                )}
              </button>
            </>
          ) : (
            <button
              onClick={() =>
                error ? setErrorAlert(error) : followArtistRefetch()
              }
              className={`btn btn-primary flex-grow rounded-full disabled:cursor-not-allowed md:max-w-[150px]`}
            >
              <span>{isFollowedState ? "Following" : "Follow"}</span>
            </button>
          )}
        </div>
      </div>

      <figure
        className={`aspect-square w-full max-w-[200px] overflow-hidden rounded-xl shadow-xl md:max-w-[300px]`}
      >
        <img src={image} alt={item.name} draggable="false" />
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
