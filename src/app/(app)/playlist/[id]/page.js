import { spotify_access_token } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import React from "react";

export default async function page({ params }) {
  const { id } = params;
  const cookiesStore = cookies();

  if (!cookiesStore.has(spotify_access_token)) {
    return redirect(`/login`);
  }

  const headers = {
    Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
  };

  const { data } = await axios.get(`${process.env.API_URL}/playlists/${id}`, {
    headers: headers,
  });

  return (
    <div>
      <div>{data.name}</div>
    </div>
  );
}
