"use client";

import { useAuth } from "@/hooks/auth";
import axios from "axios";
import { useEffect } from "react";

export default function Profile() {
  const { user } = useAuth();

  return <div>{user?.display_name}</div>;
}
