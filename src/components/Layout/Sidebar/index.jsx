"use client";

import Player from "../Player";
import Navbar from "../Navbar";
import { Menu } from "react-ionicons";
import React from "react";
import SidebarContent from "./SidebarContent";

export default function Sidebar({
  children,
  authorizationURL,
  client_id,
  redirect_uri,
}) {
  return (
    <div className="grid-rows-18 drawer h-screen grid-cols-12 lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content col-span-full col-start-1 row-[1/17] row-start-1 overflow-y-auto lg:col-span-9 lg:col-start-4 xl:col-span-10 xl:col-start-3">
        {/* Page content here */}
        <div className={`h-full`}>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-square btn-primary drawer-button fixed left-4 top-4 z-[60] rounded-2xl lg:hidden"
          >
            <Menu />
          </label>

          <div className={`flex h-full flex-col overflow-y-auto`}>
            <header className={`sticky top-0 z-50 pl-16 lg:pl-0`}>
              <Navbar
                authorizationURL={authorizationURL}
                client_id={client_id}
                redirect_uri={redirect_uri}
              />
            </header>

            {children}
          </div>
        </div>
      </div>

      {/* Left Sidebar */}
      <div className="drawer-side !static z-[100] col-span-full col-start-1 row-span-full row-start-1 h-full !overflow-y-hidden lg:col-span-3 lg:row-[1/17] xl:col-span-2">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        {/* Sidebar content here */}
        <div className="menu max-h-full w-80 flex-nowrap overflow-y-auto bg-base-200 p-4 text-base-content lg:w-full lg:bg-base-100">
          <SidebarContent />
        </div>
      </div>

      {/* Player */}
      <div
        className={`col-span-full row-[17/19] flex items-center bg-neutral px-4`}
      >
        <Player />
      </div>
    </div>
  );
}
