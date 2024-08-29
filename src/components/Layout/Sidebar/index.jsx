"use client";

import Player from "../Player";
import Navbar from "../Navbar";
import { Menu } from "react-ionicons";
import React, { useEffect } from "react";
import SidebarContent from "./SidebarContent";
import { userStore } from "@/zustand/user";
import { useAuth } from "@/hooks/auth";

export default function Sidebar({
  children,
  authorizationURL,
  client_id,
  redirect_uri,
}) {
  const { user } = useAuth();
  const { setUser } = userStore();

  useEffect(() => {
    if (user) {
      setUser(user);
      console.log(user)
    } else {
      setUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className={`flex h-screen flex-col`}>
      <div className="drawer lg:drawer-open">
        <input id="sidebar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content max-h-[calc(100dvh-80px)] overflow-y-auto sm:max-h-[calc(100dvh-72px)]">
          {/* Page content here */}
          <div className={`flex flex-col`}>
            <header
              className={`sticky top-0 z-50 bg-base-100 bg-opacity-90 pl-16 backdrop-blur lg:pl-0`}
            >
              <Navbar
                authorizationURL={authorizationURL}
                client_id={client_id}
                redirect_uri={redirect_uri}
              />
            </header>

            {children}
          </div>
        </div>

        {/* Left Sidebar */}
        <div className="drawer-side z-50 max-h-[calc(100dvh-80px)] sm:max-h-[calc(100dvh-72px)]">
          <label
            htmlFor="sidebar"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          {/* Sidebar content here */}
          <div className="menu max-h-full min-w-60 max-w-60 flex-nowrap overflow-y-auto bg-base-200 p-4 text-base-content lg:bg-base-100">
            <SidebarContent />
          </div>
        </div>
      </div>

      {/* Player */}
      <div className={`flex items-center bg-neutral p-2 px-4`}>
        <Player />
      </div>
    </div>
  );
}
