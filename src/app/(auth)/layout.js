"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "../globals.css";
import { useAuth } from "@/hooks/auth";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
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

  return <>{children}</>;
}
