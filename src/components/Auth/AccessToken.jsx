"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function AccessToken() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams.has("code")) {
      const fetchAccessToken = async () => {
        await axios.post(`/api/access-token`, { code: "" });
      };

      fetchAccessToken();
    }
  }, [searchParams]);
}
