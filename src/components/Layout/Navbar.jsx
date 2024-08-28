"use client";

import { useAuth } from "@/hooks/auth";
import Login from "../Auth/Login";
import Logout from "../Auth/Logout";
import { Suspense, useEffect, useState } from "react";
import SearchBar from "./SearchBar";

export default function Navbar({ authorizationURL, client_id, redirect_uri }) {
  const { user } = useAuth();

  return (
    <nav className={`sticky z-50 flex items-center justify-between gap-4 p-4`}>
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
