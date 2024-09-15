import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { data: user, error } = useQuery({
    queryKey: `/api/me`,
    queryFn: async ({ queryKey }) => {
      return await axios.get(queryKey).then(({ data }) => data);
    },
  });

  return { user };
};
