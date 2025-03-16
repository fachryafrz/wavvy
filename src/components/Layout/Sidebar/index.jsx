"use client";

import Player from "../Player";
import Navbar from "../Navbar";
import { useCallback } from "react";
import SidebarContent from "./Content";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import MobilePlayer from "@/components/Modals/MobilePlayer";
import PremiumAlert from "@/components/Modals/PremiumAlert";
import LoginAlert from "@/components/Modals/LoginAlert";
import ErrorAlert from "@/components/Modals/ErrorAlert";
import { useDrawerOpen } from "@/zustand/drawerOpen";
import { siteConfig } from "@/config/site";

export default function Sidebar({
  children,
  authorizationURL,
  client_id,
  AUTH_TOKEN,
}) {
  const getOAuthToken = useCallback((callback) => callback(AUTH_TOKEN), []);

  const { drawerOpen } = useDrawerOpen();

  return (
    <WebPlaybackSDK
      initialDeviceName={siteConfig.name}
      getOAuthToken={getOAuthToken}
      initialVolume={0}
    >
      <div className={`flex h-dvh flex-col justify-between`}>
        <div
          className={`drawer flex-1 overflow-hidden ${drawerOpen ? "lg:drawer-open" : ""}`}
        >
          <input id="sidebar" type="checkbox" className="drawer-toggle" />
          <div className={`drawer-content flex min-h-0 flex-col`}>
            {/* Page content here */}
            <header id="header" className={`bg-base-100`}>
              <Navbar
                authorizationURL={authorizationURL}
                client_id={client_id}
              />
            </header>

            <div className={`flex flex-1 flex-col overflow-y-auto`}>
              <main className={`flex-1 p-4 pt-0`}>{children}</main>
            </div>
          </div>

          {/* Left Sidebar */}
          <div className={`drawer-side absolute inset-y-0 z-50 h-auto`}>
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
          <Player />
        </div>
      </div>

      {/* Modals */}
      <PremiumAlert />
      <LoginAlert />
      <ErrorAlert />
      <MobilePlayer />
    </WebPlaybackSDK>
  );
}
