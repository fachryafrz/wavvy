"use client";

import axios from "axios";
import { useEffect } from "react";

export default function AccessToken() {
  useEffect(() => {
    const fetchAccessToken = async () => {
      const { data } = await axios.get(`/api/access-token`);

      console.log(data);
    };

    fetchAccessToken();
  }, []);
}
