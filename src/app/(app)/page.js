import LeftContent from "@/components/Layout/Home/LeftContent";
import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  const cookiesStore = cookies();
  const headers = {
    Authorization: `Bearer ${cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value}`,
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
