import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { userStore } from "@/zustand/user";

export const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { setUser } = userStore();

  const { data: user, error } = useQuery({
    queryKey: [`/api/me`],
    queryFn: async ({ queryKey }) => {
      return await axios.get(queryKey[0]).then(({ data }) => data);
    },
    staleTime: 1000 * 60 * 60, // 1 jam
    retryOnMount: false,
  });
  const userData = queryClient.getQueryData([`/api/me`]);

  const invalidate = () => {
    queryClient.resetQueries({ queryKey: [`/api/me`] });
    setUser(null);
    router.refresh();
  };

  const logout = async () => {
    await axios.delete(`/api/auth/logout`).then(() => invalidate());
  };

  useEffect(() => {
    if (user) setUser(user);
    else setUser(null);
  }, [user]);

  return { user, logout };
};
