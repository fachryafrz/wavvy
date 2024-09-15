import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const useHandleError = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleError = (error) => {
    const { status } = error.response;

    if (status === 401) {
      queryClient.resetQueries({ queryKey: `/api/me` });
      router.refresh();
    }
    if (status === 403) {
      document.getElementById("premiumAlert").showModal();
    }
  };

  return { handleError };
};
