import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";

export const useFetch = ({
  endpoint,
  params,
  method = "GET",
  immediate = true,
  ...props
}) => {
  const { mutate } = useAuth();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = async () => {
    setLoading(true);
    try {
      const response = await axios.request({
        method: method,
        baseURL: process.env.NEXT_PUBLIC_APP_URL,
        url: endpoint,
        params: params,
        data: props.body || {},
      });
      setData(response.data);
    } catch (error) {
      setError(error);
      console.error(error, error.response?.status);
      if (error.response?.status === 401) {
        mutate(null);
        router.push("/login");
      }
      if (error.response?.status === 403) {
        document.getElementById("premiumAlert").showModal();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return { data, error, loading, execute };
};
