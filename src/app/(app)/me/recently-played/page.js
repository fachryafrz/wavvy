import CardVertical from "@/components/Card/CardVertical";
import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
import { fetchData } from "@/server/actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export async function generateMetadata() {
  return {
    title: `Recently Played`,
  };
}

export default async function page({ params }) {
  const { data: recentlyPlayed } = await fetchData(
    `/me/player/recently-played`,
  ).catch((error) => redirect("/"));

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
              <CardVertical
                name={item.track.name}
                uri={item.track.uri}
                link={`/${item.track.type}/${item.track.id}`}
                image={image?.url ?? "/maskable/maskable_icon_x192.png"}
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}
