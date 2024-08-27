"use client";

import { useAuth } from "@/hooks/auth";
import Login from "../Auth/Login";
import Logout from "../Auth/Logout";
import { Suspense } from "react";
import SearchBar from "./SearchBar";

export default function Navbar({ authorizationURL, client_id, redirect_uri }) {
  const { user } = useAuth();

  return (
    <header className={`flex items-center gap-4 justify-between p-4 sticky`}>
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
    </header>
  );
}
