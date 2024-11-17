"use client";

import Player from "../Player";
import Navbar from "../Navbar";
import React, { useCallback, useEffect, useState } from "react";
import SidebarContent from "./Content";
import { useAuth } from "@/hooks/auth";
import { userStore } from "@/zustand/user";
import SpotifyPlayer from "../Player/SpotifyPlayer";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";

export default function Sidebar({
  children,
  authorizationURL,
  client_id,
  AUTH_TOKEN,
}) {
  const { user } = useAuth();
  const { setUser } = userStore();

  const [playerHeight, setPlayerHeight] = useState(84);

  const getOAuthToken = useCallback((callback) => callback(AUTH_TOKEN), []);

  useEffect(() => {
    // NOTE: user dari useAuth dimasukkan ke userStore agar tidak terjadi hydration error
    if (user) setUser(user);
    else setUser(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const player = document.getElementById("player");

    const handleClientHeight = () => {
      setPlayerHeight(player?.parentElement.clientHeight);
    };

    handleClientHeight();

    window.addEventListener("resize", handleClientHeight);
  }, []);

  return (
    <WebPlaybackSDK
      deviceName={process.env.NEXT_PUBLIC_APP_NAME}
      getOAuthToken={getOAuthToken}
      volume={0.5}
    >
      <div className={`flex h-dvh flex-col justify-between`}>
        <div className="drawer flex-grow lg:drawer-open">
          <input id="sidebar" type="checkbox" className="drawer-toggle" />
          <div
            className={`drawer-content overflow-y-auto`}
            style={{
              maxHeight: `calc(100dvh - ${playerHeight}px)`,
            }}
          >
            {/* Page content here */}
            <div className={`flex min-h-full flex-col`}>
              <header
                id="header"
                className={`sticky top-0 z-50 bg-base-100 bg-opacity-90 pl-16 backdrop-blur lg:pl-0`}
              >
                <Navbar
                  authorizationURL={authorizationURL}
                  client_id={client_id}
                />
              </header>

              {/* Center */}
              <main className={`flex-grow p-4 pt-2`}>{children}</main>
            </div>
          </div>

          {/* Left Sidebar */}
          <div
            className={`drawer-side z-50`}
            style={{
              maxHeight: `calc(100dvh - ${playerHeight}px)`,
            }}
          >
            <label
              htmlFor="sidebar"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            {/* Sidebar content here */}
            <div className="menu h-full min-w-64 max-w-64 flex-nowrap overflow-y-auto bg-base-200 p-4 pt-2 text-base-content lg:bg-base-100">
              <SidebarContent />
            </div>
          </div>
        </div>

        {/* Player */}
        <div className={`relative flex items-center bg-neutral p-2`}>
          <Player AUTH_TOKEN={AUTH_TOKEN} />
        </div>
      </div>
    </WebPlaybackSDK>
  );
}
