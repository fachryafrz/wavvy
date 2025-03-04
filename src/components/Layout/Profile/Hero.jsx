"use client";

import { useAuth } from "@/hooks/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import numeral from "numeral";
import pluralize from "pluralize";
import { useEffect, useState } from "react";
import { ExitOutline } from "react-ionicons";
import { useSpotifyPlayer } from "react-spotify-web-playback-sdk";

export function ProfileHero({ user }) {
  const { user: currentUser, logout } = useAuth();
  const player = useSpotifyPlayer();
  const queryClient = useQueryClient();

  const [spotify, type, id] = user.uri.split(":");
  const image = user.images?.find((image) => image.width === 300).url;

  // State
  const [fontSize, setFontSize] = useState(`2xl:text-7xl`);
  const [translateY, setTranslateY] = useState(`2xl:translate-y-7`);
  const [isFollowedState, setIsFollowedState] = useState();

  // Functions
  const { refetch: isFollowedRefetch } = useQuery({
    enabled: false,
    queryKey: [`/api/me/following/contains`],
    queryFn: async ({ queryKey }) => {
      const { data } = await axios.get(queryKey, {
        params: { type: `user`, ids: id },
      });

      setIsFollowedState(data[0]);
    },
  });
  const { refetch: followUserRefetch, error } = useQuery({
    enabled: false,
    queryKey: [`/api/me/following`],
    queryFn: async ({ queryKey }) => {
      await axios.request({
        method: isFollowedState ? "DELETE" : "PUT",
        url: queryKey[0],
        params: { type: `user`, ids: user.id },
      });
      setIsFollowedState(!isFollowedState);
    },
  });

  // Lifecycle
  useEffect(() => {
    const name = user.display_name;

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
  }, [user]);

  useEffect(() => {
    if (!currentUser) return;
    if (user.id === currentUser.id) return;

    isFollowedRefetch();
  }, [currentUser, user]);

  useEffect(() => {
    if (!error) return;

    if (error.status === 401) document.getElementById("loginAlert").showModal();
  }, [error]);

  return (
    <div
      className={`relative -mx-4 flex flex-col-reverse items-center justify-between gap-4 px-4 py-12 md:mx-0 md:flex-row-reverse md:rounded-3xl md:p-8`}
    >
      <div
        className={`flex w-full flex-grow flex-col items-center gap-6 text-center md:items-start md:text-start`}
      >
        {/* Details */}
        <div className={`flex w-full flex-col gap-4 @container`}>
          {/* Type */}
          <span
            data-before-content={`profile`}
            className={`before-content hidden translate-y-4 font-medium capitalize text-white md:block ${translateY}`}
          />

          {/* Title */}
          <h1
            className={`line-clamp-2 text-pretty text-2xl font-bold !leading-snug text-white @sm:text-4xl @2xl:text-5xl ${fontSize}`}
          >
            {user.display_name}
          </h1>

          {/* Second Info */}
          <div className={`flex justify-center gap-1 md:justify-start`}>
            <div className={`flex gap-1 text-white`}>
              <span>
                {numeral(user.followers.total).format("0,0")}{" "}
                {pluralize("follower", user.followers.total)}
              </span>
            </div>
          </div>

          {/* CTA */}
          {user.id !== currentUser?.id ? (
            <>
              <button
                onClick={() => followUserRefetch()}
                className={`btn btn-primary flex-grow rounded-full disabled:cursor-not-allowed md:max-w-[150px]`}
              >
                <span>{isFollowedState ? "Following" : "Follow"}</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                player.disconnect();
                logout();
              }}
              className={`btn btn-error btn-sm mx-auto w-fit md:absolute md:right-4 md:top-4`}
            >
              <ExitOutline color={"#fff"} height="24px" width="24px" />

              <span>Logout</span>
            </button>
          )}
        </div>
      </div>

      <figure
        className={`aspect-square w-full max-w-[200px] overflow-hidden rounded-full shadow-xl md:max-w-[300px]`}
      >
        <img
          src={image}
          alt={user.name}
          width={300}
          height={300}
          draggable="false"
        />
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
