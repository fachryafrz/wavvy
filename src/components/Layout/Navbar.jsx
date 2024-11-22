"use client";

import Logout from "../Auth/Logout";
import SearchBar from "./SearchBar";
import { Menu } from "react-ionicons";
import Login from "../Auth/Login";
import { useAuth } from "@/hooks/auth";

export default function Navbar({ authorizationURL, client_id }) {
  const { user } = useAuth();

  return (
    <nav className={`z-40 flex items-center justify-between gap-2 p-4 py-2`}>
      <label
        htmlFor="sidebar"
        className="btn btn-square btn-primary drawer-button rounded-full lg:hidden"
      >
        <Menu color={`#ffffff`} />
      </label>

      <div className={`flex-1`}>
        <SearchBar />
      </div>

      {!user ? (
        <Login authorizationURL={authorizationURL} client_id={client_id} />
      ) : (
        <Logout user={user} />
      )}
    </nav>
  );
}
