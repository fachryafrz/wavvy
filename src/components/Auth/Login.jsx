"use client";

import { useAuth } from "@/hooks/auth";
import { spotify_show_dialog } from "@/lib/constants";
import { generateRandomString } from "@/lib/randomString";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PersonCircle } from "react-ionicons";

export default function Login({ authorizationURL, client_id, redirect_uri }) {
  const { login } = useAuth();

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

  const handleLogin = () => {
    current.set("client_id", client_id);
    current.set("response_type", "code");
    current.set("redirect_uri", redirect_uri);
    current.set("scope", scope);
    current.set("state", state);
    current.set("show_dialog", true);

    router.push(`${authorizationURL}?${current.toString()}`);
  };

  useEffect(() => {
    if (searchParams.has("code")) {
      const code = searchParams.get("code");

      login(code);
    }

    if (searchParams.has("error")) {
      router.replace(pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className={`aspect-square min-w-12`}>
      <button
        id="login"
        onClick={handleLogin}
        className={`btn btn-ghost btn-sm flex h-full max-h-12 w-full rounded-full p-0`}
      >
        <PersonCircle color={"#808080"} height="40px" width="40px" />
      </button>
    </div>
  );
}
