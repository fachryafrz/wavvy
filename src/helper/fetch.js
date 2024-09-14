import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";

export const useFetch = (endpoint, options = {}) => {
  const { mutate, user } = useAuth();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const execute = async () => {
    setLoading(true);
    try {
      const response = await axios.request({
        method: options.method || "GET",
        baseURL: process.env.NEXT_PUBLIC_APP_URL,
        url: endpoint,
        params: options.params,
        data: options.body || {},
      });
      setData(response.data);
    } catch (error) {
      setError(error);
      console.error(error, error.response?.status);
      if (error.response?.status === 401) {
        mutate(null);
        router.refresh();
      }
      if (error.response?.status === 403) {
        document.getElementById("premiumAlert").showModal();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setLoading(true);
      return;
    }

    if (options.immediate !== false) {
      execute();
    }
  }, [user]);

  return { data, error, loading, execute };
};
