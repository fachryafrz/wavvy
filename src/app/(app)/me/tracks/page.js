import CardVertical from "@/components/Card/CardVertical";
import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export async function generateMetadata() {
  return {
    title: `Saved Songs`,
  };
}

export default async function page({ params }) {
  const cookiesStore = cookies();

  const headers = {
    Authorization: `Bearer ${cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value}`,
  };

  const { data: savedTracks } = await axios
    .get(`${process.env.API_URL}/me/tracks`, { headers: headers })
    .catch((error) => redirect("/"));

  return (
    <div className={`@container`}>
      <header>
        <h2 className={`text-xl font-medium`}>Saved Songs</h2>
      </header>

      <ul
        className={`-mx-2 grid grid-cols-2 @md:grid-cols-3 @2xl:grid-cols-4 @5xl:grid-cols-5`}
      >
        {savedTracks.items.map((item, i) => {
          const [image] = item.track.album.images;

          return (
            <li key={item.id}>
              <div className={`block rounded-xl p-2 hocus:bg-neutral`}>
                <CardVertical
                  name={
                    <Link href={`/${item.track.type}/${item.track.id}`}>
                      {item.track.name}
                    </Link>
                  }
                  link={`/${item.track.type}/${item.track.id}`}
                  image={image.url}
                  info={item.track.artists.map((artist) => {
                    return (
                      <>
                        <Link
                          key={artist.id}
                          href={`/${artist.type}/${artist.id}`}
                          className={`hocus:underline`}
                        >
                          {artist.name}
                        </Link>

                        <span className={`last:hidden`}>, </span>
                      </>
                    );
                  })}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
