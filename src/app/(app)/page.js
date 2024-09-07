import LeftContent from "@/components/Layout/Home/LeftContent";
import { spotify_access_token } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  const cookiesStore = cookies();

  const headers = {
    Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
  };

  // Left Content
  const {
    data: { categories },
  } = await axios.get(`${process.env.API_URL}/browse/categories`, {
    headers: headers,
  });

  const categoriesPlaylists = [];

  for (const item of categories.items) {
    const { id } = item;

    const { data } = await axios.get(
      `${process.env.API_URL}/browse/categories/${id}/playlists`,
      { headers: headers },
    );

    categoriesPlaylists.push(data);
  }

  // Right Content
  const { data: newReleases } = await axios.get(
    `${process.env.API_URL}/browse/new-releases`,
    { headers: headers },
  );
  const { data: savedTracks } = await axios.get(
    `${process.env.API_URL}/me/tracks`,
    { headers: headers },
  );
  const { data: favoriteArtists } = await axios.get(
    `${process.env.API_URL}/me/following`,
    {
      headers: headers,
      params: { type: `artist` },
    },
  );

  return (
    <div className={`flex flex-col gap-4 lg:grid lg:grid-cols-12`}>
      {/* Left Content */}
      <div className={`col-span-full lg:row-start-1`}>
        <LeftContent
          categories={categories}
          categoriesPlaylists={categoriesPlaylists}
          favoriteArtists={favoriteArtists}
        />
      </div>

      {/* Right Content */}
      {/* <div
        className={`flex bg-base-100 lg:col-span-4 lg:col-start-9 xl:col-span-3 xl:col-start-10`}
      >
        <RightContent
          newReleases={newReleases}
          savedTracks={savedTracks}
        />
      </div> */}
    </div>
  );
}
