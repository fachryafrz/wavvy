"use client"

import Player from "./Player";
import Navbar from "./Navbar";
import { Menu } from "react-ionicons";

export default function Sidebar({
  children,
  authorizationURL,
  client_id,
  redirect_uri,
}) {
  return (
    <div className="drawer h-screen grid-cols-12 grid-rows-12 lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content col-span-full col-start-1 row-start-1 row-span-11 overflow-y-auto lg:col-span-10 lg:col-start-3">
        {/* Page content here */}
        <div className={`h-[200dvh]`}>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary btn-square drawer-button fixed left-4 top-4 lg:hidden rounded-2xl"
          >
            <Menu />
          </label>

          <div className={`flex flex-col lg:grid lg:grid-cols-10`}>
            <div className={`col-span-full pl-16 lg:pl-0`}>
              <Navbar
                authorizationURL={authorizationURL}
                client_id={client_id}
                redirect_uri={redirect_uri}
              />
            </div>

            <div className={`lg:col-span-8 lg:row-start-2`}>{children}</div>

            {/* Right Sidebar */}
            <div className={`bg-base-100 p-4 lg:col-span-2 lg:col-start-9`}>Right</div>
          </div>
        </div>
      </div>

      {/* Left Sidebar */}
      <div className="drawer-side !static col-span-full col-start-1 row-start-1 row-span-full h-full lg:col-span-2 lg:row-span-11">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-80 bg-base-200 lg:bg-base-100 p-4 text-base-content lg:w-full">
          {/* Sidebar content here */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>

      {/* Player */}
      <div className={`col-span-full row-start-12 bg-neutral p-4`}>
        <Player />
      </div>
    </div>
  );
}
