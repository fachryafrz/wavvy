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

  return { user, mutate };
};
