import useSWR from "swr";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    data: user,
    error,
    mutate,
  } = useSWR(
    "/api/me",
    () =>
      axios
        .get(`/api/me`)
        .then(({ data }) => data)
        .catch((error) => {
          if (error.response.status !== 409) throw error;
        }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const login = async (code) => {
    await axios.post(`/api/access-token`, { code }).then(() => {
      mutate();
    });
  };

  const logout = async () => {
    if (!error) {
      await axios.delete(`/api/auth/logout`).then(() => {
        mutate(null);
        axios.post(`/api/access-token`, { code: "" });
      });
    }

    router.push("/login");
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
    mutate,
  };
};
