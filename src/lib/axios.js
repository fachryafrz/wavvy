import Axios from "axios";
import { cookies } from "next/headers";
import { SPOTIFY_ACCESS_TOKEN } from "./constants";

export async function getSpotifyAccessToken() {
  const cookiesStore = cookies();
  let access_token;

  if (cookiesStore.has(SPOTIFY_ACCESS_TOKEN)) {
    access_token = cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value;
  } else {
    const { data } = await Axios.post(
      process.env.ACCESS_TOKEN_URL,
      { grant_type: "client_credentials" },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    access_token = data.access_token;
  }

  return access_token;
}

export async function createSpotifyAxiosInstance() {
  const access_token = await getSpotifyAccessToken();

  return Axios.create({
    baseURL: process.env.API_URL,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
}