"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function AccessToken() {
  const searchParams = useSearchParams();
  const current = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  useEffect(() => {
    if (!current.has("code")) {
      const fetchAccessToken = async () => {
        await axios.post(`/api/access-token`, { code: "" });
      };

      fetchAccessToken();
    }
  }, [current]);
}
