import CardVertical from "@/components/Card/CardVertical";
import { createSpotifyAxiosInstance } from "@/lib/axios";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = params;

  const axios = await createSpotifyAxiosInstance();

  const { data } = await axios.get(`/browse/categories/${id}/playlists`);

  return {
    title: `${data.message}`,
  };
}

export default async function page({ params }) {
  const { id } = params;

  const axios = await createSpotifyAxiosInstance();

  const { data } = await axios.get(`/browse/categories/${id}/playlists`);

  return (
    <div className={`@container`}>
      <header>
        <h2 className={`text-xl font-medium`}>{data.message}</h2>
      </header>

      <ul
        className={`-mx-2 grid grid-cols-2 @md:grid-cols-3 @2xl:grid-cols-4 @5xl:grid-cols-5`}
      >
        {data.playlists.items.map((item, i) => {
          const [image] = item.images;

          return (
            <li key={item.id}>
              <CardVertical
                item={item}
                image={image?.url ?? "/maskable/maskable_icon_x192.png"}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
