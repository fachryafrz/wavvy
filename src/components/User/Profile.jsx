"use client";

import { userStore } from "@/zustand/user";
import axios from "axios";
import { useEffect } from "react";

export default function Profile() {
  const { user } = userStore();

  return <div>{user?.display_name}</div>;
}
