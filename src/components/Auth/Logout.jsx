"use client";

import { useAuth } from "@/hooks/auth";
import axios from "axios";

export default function Logout() {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <div>
        <button onClick={logout} className={`btn btn-sm`}>
          {user.display_name}
        </button>
      </div>
    );
  }
}
