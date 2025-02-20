import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { fetchData } from "@/server/actions";
import { userStore } from "@/zustand/user";

export const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { setUser } = userStore();

  const { data: user, error } = useQuery({
    queryKey: [`/me`],
    queryFn: async ({ queryKey }) => {
      return await fetchData(queryKey[0]).then(({ data }) => data);
    },
    refetchInterval: 1000 * 60 * 5,
  });
  const userData = queryClient.getQueryData([`/me`]);

  const invalidate = () => {
    queryClient.resetQueries({ queryKey: [`/me`] });
    setUser(null);
    router.refresh();
  };

  const logout = async () => {
    await axios.delete(`/api/auth/logout`).then(() => invalidate());
  };

  useEffect(() => {
    if (userData && error) invalidate();
  }, [userData, error]);

  return { user, logout };
};
