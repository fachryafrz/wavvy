import CardVertical from "@/components/Card/CardVertical";
import { spotify_access_token } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({ params }) {
  const cookiesStore = cookies();

  if (!cookiesStore.has(spotify_access_token)) {
    return redirect(`/login`);
  }

  const headers = {
    Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
  };

  const { data: recentlyPlayed } = await axios.get(
    `${process.env.API_URL}/me/player/recently-played`,
    { headers: headers },
  );

  return (
    <div className={`@container`}>
      <header>
        <h2 className={`text-xl font-medium`}>Recently Played</h2>
      </header>

      <ul
        className={`-mx-2 grid grid-cols-2 @md:grid-cols-3 @2xl:grid-cols-4 @5xl:grid-cols-5`}
      >
        {recentlyPlayed.items.map((item, i) => {
          const [image] = item.track.album.images;

          return (
            <li key={item.id}>
              <Link
                href={`/${item.track.type}/${item.track.id}`}
                className={`block rounded-xl p-2 hocus:bg-neutral`}
              >
                <CardVertical
                  name={item.track.name}
                  image={image.url}
                  info={item.track.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
