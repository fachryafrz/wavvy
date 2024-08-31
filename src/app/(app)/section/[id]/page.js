import CardVertical from "@/components/Card/CardVertical";
import { spotify_access_token } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export default async function page({ params }) {
  const { id } = params;
  const cookiesStore = cookies();

  const { data } = await axios.get(
    `${process.env.API_URL}/browse/categories/${id}/playlists`,
    {
      headers: {
        Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
      },
    },
  );

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
              <Link
                href={`/playlist/${item.id}`}
                className={`block rounded-xl p-2 hocus:bg-neutral`}
              >
                <CardVertical name={item.name} image={image.url} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
