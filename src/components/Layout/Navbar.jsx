"use client";

import { userStore } from "@/zustand/user";
import Login from "../Auth/Login";
import Logout from "../Auth/Logout";
import { Suspense, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Menu } from "react-ionicons";

export default function Navbar({ authorizationURL, client_id }) {
  const { user } = userStore();

  return (
    <nav className={`z-40 flex items-center justify-between gap-4 p-4 py-2`}>
      <label
        htmlFor="sidebar"
        className="btn btn-square btn-primary drawer-button fixed left-4 top-2 rounded-2xl lg:hidden"
      >
        <Menu />
      </label>

      <SearchBar />

      {user && <Logout />}
    </nav>
  );
}
