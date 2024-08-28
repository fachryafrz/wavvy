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

  const [showDialog, setShowDialog] = useState();

  const state = generateRandomString(16);
  const scope = [
    "user-read-email",
    "user-read-private",
    "user-top-read",
    "user-follow-read",
    "user-library-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "playlist-read-private",
  ].join(" ");

  const handleLogin = () => {
    current.set("client_id", client_id);
    current.set("response_type", "code");
    current.set("redirect_uri", redirect_uri);
    current.set("scope", scope);
    current.set("state", state);
    current.set("show_dialog", showDialog);

    router.push(`${authorizationURL}?${current.toString()}`);
  };

  useEffect(() => {
    if (localStorage.getItem(spotify_show_dialog)) {
      const showDialog = localStorage.getItem(spotify_show_dialog);

      setShowDialog(showDialog);
    } else {
      localStorage.setItem(spotify_show_dialog, true);
      setShowDialog(true);
    }
  }, []);

  useEffect(() => {
    if (searchParams.has("code")) {
      const code = searchParams.get("code");

      login(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className={`aspect-square min-w-12`}>
      <button
        onClick={handleLogin}
        className={`btn btn-ghost btn-sm flex h-full max-h-12 w-full rounded-full p-0`}
      >
        <PersonCircle color={"#808080"} height="40px" width="40px" />
      </button>
    </div>
  );
}
