"use client";

import { useAuth } from "@/hooks/auth";
import "../globals.css";
import Sidebar from "@/components/Layout/Sidebar";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function RootLayout({ children }) {
  const { user, login } = useAuth({
    middleware: "auth",
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("code")) {
      const code = searchParams.get("code");

      login(code);
    }

    if (searchParams.has("error")) {
      router.replace(pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return <Sidebar>{children}</Sidebar>;
}
