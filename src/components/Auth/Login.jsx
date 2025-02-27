/* eslint-disable @next/next/no-img-element */
"use client";

import { generateRandomString } from "@/lib/randomString";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PersonCircle } from "react-ionicons";
import LoginWarning from "../Modals/LoginWarning";

export default function Login({ authorizationURL, client_id }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const state = generateRandomString(16);
  const scope = [
    "ugc-image-upload",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "app-remote-control",
    "streaming",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
    "user-follow-modify",
    "user-follow-read",
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played",
    "user-library-modify",
    "user-library-read",
    "user-read-email",
    "user-read-private",
    // "user-soa-link",
    // "user-soa-unlink",
    // "soa-manage-entitlements",
    // "soa-manage-partner",
    // "soa-create-partner",
  ].join(" ");

  const handleLogin = async () => {
    current.set("client_id", client_id);
    current.set("response_type", "code");
    current.set("redirect_uri", `${window.location.origin}`);
    current.set("scope", scope);
    current.set("state", state);
    current.set("show_dialog", false);

    await axios.get(`/api/redirect`, {
      params: { path: `${pathname}?${searchParams.toString()}` },
    });

    router.push(`${authorizationURL}?${current.toString()}`);
  };

  return (
    <>
      <button
        id="login"
        onClick={() => document.getElementById("loginWarning").showModal()}
        className={`btn btn-primary aspect-square rounded-full px-0 sm:aspect-auto sm:px-2 sm:pr-4`}
      >
        <img
          src="/icons/spotify-white-icon.png"
          alt=""
          draggable={false}
          className={`w-8 object-contain`}
        />

        <div className={`hidden sm:block`}>
          Login <span className={`hidden md:inline`}>with Spotify</span>
        </div>
      </button>

      <LoginWarning onLogin={handleLogin} />
    </>
  );
}
