import useSWR from "swr";
import { useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Axios from "axios";
import { spotify_show_dialog } from "@/lib/constants";
import { generateRandomString } from "@/lib/randomString";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const {
    data: user,
    error,
    mutate,
  } = useSWR(
    "/api/me",
    () =>
      Axios.get(`/api/me`)
        .then(({ data }) => data)
        .catch((error) => {
          if (error.response.status !== 409) throw error;
        }),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    },
  );

  const login = async ({ code }) => {
    await Axios.post(`/api/access-token`, { code }).then(() => {
      localStorage.setItem(spotify_show_dialog, "false");
      mutate();
      router.push(pathname);
    });
  };

  const logout = async () => {
    if (!error) {
      await Axios.delete(`/api/auth/logout`).then(() => {
        mutate(null);
        Axios.post(`/api/access-token`, { code: "" });
      });
    }

    if (pathname === "/profile") {
      router.replace("/login");
    }
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      router.replace(redirectIfAuthenticated);
    if (window.location.pathname === "/verify-email" && user?.email_verified_at)
      router.replace(redirectIfAuthenticated);
    if (middleware === "auth" && error) logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, error]);

  return {
    user,
    login,
    logout,
  };
};
