"use client";

import Logout from "../Auth/Logout";
import SearchBar from "./SearchBar";
import { Menu, Options } from "react-ionicons";
import Login from "../Auth/Login";
import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ authorizationURL, client_id }) {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <nav className={`z-40 flex items-center justify-between gap-2 p-4 py-2`}>
      <label
        htmlFor="sidebar"
        className="btn btn-square btn-primary drawer-button rounded-full lg:hidden"
      >
        <Menu color={`#ffffff`} />
      </label>

      <div className={`flex flex-1 items-center gap-2`}>
        {/* Search bar */}
        <SearchBar className={`hidden sm:block`} />
        <SearchBar placeholder="Tap to search" className={`sm:hidden`} />

        {/* Search filter */}
        {pathname !== `/search` && (
          <Link href={`/search`} className={`btn btn-circle btn-primary`}>
            <Options color={`#ffffff`} />
          </Link>
        )}
      </div>

      {!user ? (
        <Login authorizationURL={authorizationURL} client_id={client_id} />
      ) : (
        <Logout user={user} />
      )}
    </nav>
  );
}
