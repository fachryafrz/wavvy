"use client";

import Player from "../Player";
import Navbar from "../Navbar";
import React, { useEffect, useState } from "react";
import SidebarContent from "./Content";

export default function Sidebar({ children, authorizationURL, client_id }) {
  const [playerHeight, setPlayerHeight] = useState(0);

  useEffect(() => {
    const player = document.getElementById("player");

    const handleClientHeight = () => {
      setPlayerHeight(player?.parentElement.clientHeight);
    };

    handleClientHeight();

    window.addEventListener("resize", handleClientHeight);
  }, []);

  return (
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
      <div className={`flex items-center bg-neutral p-2`}>
        <Player />
      </div>
    </div>
  );
}
