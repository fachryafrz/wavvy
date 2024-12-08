"use server";

import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import genresSeed from "@/data/genre-seeds.json";

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

const checkUser = (user) => {
  if (!user) {
    document.getElementById("loginAlert").showModal();
    return;
  }
};

export const playSong = async ({ user, device, uri, uris = [] }) => {
  checkUser(user);

  const types = ["album", "playlist"];

  const [spotify, type, id] = uri.split(":");

  await fetchData(`/me/player/play`, {
    params: {
      device_id: device.device_id,
    },
    method: "PUT",
    data: JSON.stringify(
      types.includes(type) ? { context_uri: uri } : { uris: [uri, ...uris] },
    ),
  });
};

export const startRadio = async ({ user, device, uri, artists }) => {
  checkUser(user);

  const [artist] = artists;
  const [spotify, type, id] = uri.split(":");

  const [genres] = await Promise.all([
    fetchData(`/artists/${artist.id}`).then(({ data: { genres } }) => genres),
  ]);

  // Get Recommendations
  const {
    data: { tracks: queues },
  } = await fetchData(`/recommendations`, {
    params: {
      seed_tracks: id,
      seed_artists: artists.map(({ id }) => id).join(","),
      seed_genres: genres.filter((genre) => genresSeed.includes(genre)),
    },
  });

  // Play Song
  playSong({ user, device, uri, uris: queues.map(({ uri }) => uri) });
};
