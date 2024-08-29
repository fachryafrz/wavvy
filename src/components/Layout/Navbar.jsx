"use client";

import { useAuth } from "@/hooks/auth";
import Login from "../Auth/Login";
import Logout from "../Auth/Logout";
import { Suspense, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Menu } from "react-ionicons";

export default function Navbar({ authorizationURL, client_id, redirect_uri }) {
  const { user } = useAuth();

  return (
    <nav className={`z-40 flex items-center justify-between gap-4 p-4`}>
      <label
        htmlFor="sidebar"
        className="btn btn-square btn-primary drawer-button fixed left-4 top-4 rounded-2xl lg:hidden"
      >
        <Menu />
      </label>

      <SearchBar />

      {!user && (
        <Suspense>
          <Login
            authorizationURL={authorizationURL}
            client_id={client_id}
            redirect_uri={redirect_uri}
          />
        </Suspense>
      )}

      {user && <Logout />}
    </nav>
  );
}
