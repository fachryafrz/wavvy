"use server";

import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
import axios from "axios";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const fetchData = async (url, options) => {
  const cookiesStore = cookies();
  let access_token;

  if (cookiesStore.has(SPOTIFY_ACCESS_TOKEN)) {
    access_token = cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value;
  } else {
    const { data } = await axios.post(
      process.env.ACCESS_TOKEN_URL,
      { grant_type: "client_credentials" },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    access_token = data.access_token;
  }

  try {
    const { data } = await axios.request({
      method: "GET",
      baseURL: process.env.API_URL,
      url,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      ...options,
    });

    return { data };
  } catch (error) {
    return { error };
  }
};
