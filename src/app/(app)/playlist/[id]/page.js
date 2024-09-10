import CardLong from "@/components/Card/CardLong";
import DetailsHero from "@/components/Layout/Details/Hero";
import { spotify_access_token } from "@/lib/constants";
import { isPlural } from "@/lib/isPlural";
import axios from "axios";
import moment from "moment";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import numeral from "numeral";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = params;
  const cookiesStore = cookies();
  const headers = {
    Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
  };

  const { data } = await axios.get(`${process.env.API_URL}/playlists/${id}`, {
    headers: headers,
  });

  return {
    title: `${data.name}`,
  };
}

export default async function page({ params }) {
  const { id } = params;
  const cookiesStore = cookies();

  const headers = {
    Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
  };

  const { data: playlist } = await axios.get(
    `${process.env.API_URL}/playlists/${id}`,
    {
      headers: headers,
    },
  );
  const [image] = playlist.images;

  return (
    <div className={`flex flex-col gap-4`}>
      {/* Hero */}
      <section>
        <DetailsHero
          item={playlist}
          image={image.url}
          title={playlist.name}
          type={`Playlist`}
          secondInfo={
            <div className={`flex flex-col`}>
              <div>
                <span>By: </span>

                <Link
                  href={`/user/${playlist.owner.id}`}
                  className={`font-medium hocus:underline`}
                >
                  {playlist.owner.display_name}
                </Link>
              </div>

              {playlist.followers.total > 0 && (
                <div>
                  <span>
                    {numeral(playlist.followers.total).format(`0,0`)}{" "}
                    {isPlural(
                      playlist.followers.total,
                      `follower`,
                      `followers`,
                    )}
                  </span>
                </div>
              )}
            </div>
          }
        />
      </section>

      {/* Tracks */}
      <section>
        <div>
          <header className={`flex items-center gap-4`}>
            <span className={`w-5 text-center`}>#</span>

            <h2 className={`text-xl font-medium`}>Songs</h2>
          </header>

          <span className={`divider my-0`}></span>

          <ul>
            {playlist.tracks.items.map((item, j) => {
              return (
                <li key={item.id} className={`flex items-center gap-4`}>
                  <span className={`flex w-5 justify-center`}>{j + 1}</span>

                  <div className={`-mx-1 flex-grow @container`}>
                    <CardLong
                      item={item.track}
                      image={item.track.album.images[0].url}
                      link={`/${item.track.type}/${item.track.id}`}
                      secondInfo={moment(item.track.duration_ms).format("m:ss")}
                      smallInfo={item.track.artists.map((artist) => {
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
      </section>
    </div>
  );
}
