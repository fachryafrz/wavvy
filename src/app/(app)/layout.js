"use client";

import { useAuth } from "@/hooks/auth";
import "../globals.css";
import Sidebar from "@/components/Layout/Sidebar";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function RootLayout({ children }) {
  const { user } = useAuth({
    middleware: "auth",
  });

  return <Sidebar>{children}</Sidebar>;
}
