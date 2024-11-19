"use server";

import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const fetchData = async (url, options) => {
  const cookiesStore = cookies();
  let access_token;

  const headers = {
    Authorization: `Basic ${Buffer.from(
      `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
    ).toString("base64")}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  if (cookiesStore.has(SPOTIFY_ACCESS_TOKEN)) {
    access_token = cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value;
  } else {
    const { data } = await axios.post(
      process.env.ACCESS_TOKEN_URL,
      { grant_type: "client_credentials" },
      { headers: headers },
    );

    access_token = data.access_token;
  }

  const headersAuth = {
    Authorization: `Bearer ${access_token}`,
  };

  try {
    const { data } = await axios.request({
      method: "GET",
      baseURL: process.env.API_URL,
      url,
      headers: headersAuth,
      ...options,
    });

    return { data };
  } catch (error) {
    redirect("/");
  }
};
