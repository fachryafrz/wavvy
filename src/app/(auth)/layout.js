"use client";

import "../globals.css";
import { useAuth } from "@/hooks/auth";

export default function RootLayout({ children }) {
  const { user } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  return <>{children}</>;
}
