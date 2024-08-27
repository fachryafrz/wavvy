"use client";

import { useAuth } from "@/hooks/auth";
import Login from "../Auth/Login";
import Logout from "../Auth/Logout";
import { Suspense } from "react";

export default function Navbar({ authorizationURL, client_id, redirect_uri }) {
  const { user } = useAuth();

  return (
    <div className={`flex items-center justify-between p-2`}>
      <span>Navbar</span>

      {!user && (
        <Suspense>
          <Login
            authorizationURL={authorizationURL}
            client_id={client_id}
            redirect_uri={redirect_uri}
          />
        </Suspense>
      )}

      {user && (
        <Suspense>
          <Logout />
        </Suspense>
      )}
    </div>
  );
}
