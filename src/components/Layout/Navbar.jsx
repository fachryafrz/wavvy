"use client";

import Logout from "../Auth/Logout";
import SearchBar from "./SearchBar";
import { Menu, Options } from "react-ionicons";
import Login from "../Auth/Login";
import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFilterToggle } from "@/zustand/filterToggle";
import { useEffect } from "react";

export default function Navbar({ authorizationURL, client_id }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const { setFilterToggle } = useFilterToggle();

  useEffect(() => {
    if (window.innerWidth >= 1280) {
      setFilterToggle(true);
    } else {
      setFilterToggle(false);
    }
  }, []);

  return (
    <nav className={`z-40 flex items-center justify-between gap-2 p-4 py-2`}>
      <label
        htmlFor="sidebar"
        className="btn btn-square btn-primary drawer-button rounded-full lg:hidden"
      >
        <Menu color={`#ffffff`} />
      </label>

      {/* Search bar */}
      <SearchBar className={`hidden sm:block`} />
      <SearchBar placeholder="Tap to search" className={`sm:hidden`} />

      {!user ? (
        <Login authorizationURL={authorizationURL} client_id={client_id} />
      ) : (
        <Logout user={user} />
      )}
    </nav>
  );
}
