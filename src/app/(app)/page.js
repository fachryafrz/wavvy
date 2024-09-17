import LeftContent from "@/components/Layout/Home/LeftContent";
import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
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

  // Left Content
  const {
    data: { categories },
  } = await axios.get(`${process.env.API_URL}/browse/categories`, {
    headers: headersAuth,
  });

  const categoriesPlaylists = [];

  for (const item of categories.items) {
    const { id } = item;

    const { data } = await axios.get(
      `${process.env.API_URL}/browse/categories/${id}/playlists`,
      { headers: headersAuth },
    );

    categoriesPlaylists.push(data);
  }

  return (
    <div className={`flex flex-col gap-4 lg:grid lg:grid-cols-12`}>
      {/* Left Content */}
      <div className={`col-span-full lg:row-start-1`}>
        <LeftContent
          categories={categories}
          categoriesPlaylists={categoriesPlaylists}
        />
      </div>
    </div>
  );
}
