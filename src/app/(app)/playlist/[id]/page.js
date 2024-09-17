import CardLong from "@/components/Card/CardLong";
import DetailsHero from "@/components/Layout/Details/Hero";
import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
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

  const { data: playlist } = await axios.get(
    `${process.env.API_URL}/playlists/${id}`,
    { headers: headersAuth },
  );
  const [image] = playlist.images;

  return {
    title: playlist.name,
    description: playlist.description,
    openGraph: {
      title: `${playlist.name} - ${process.env.NEXT_PUBLIC_APP_NAME}`,
      images: [image?.url ?? "/maskable/maskable_icon_x192.png"],
    },
  };
}

export default async function page({ params }) {
  const { id } = params;
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

  const { data: playlist } = await axios.get(
    `${process.env.API_URL}/playlists/${id}`,
    { headers: headersAuth },
  );
  const [image] = playlist.images;

  return (
    <div className={`flex flex-col gap-4`}>
      {/* Hero */}
      <section>
        <DetailsHero
          item={playlist}
          image={image?.url ?? "/maskable/maskable_icon_x192.png"}
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

            <div className={`flex-grow @container`}>
              <CardLong
                name={
                  <h2 className={`text-xl font-medium`}>
                    {isPlural(playlist.tracks.items.length, `Song`, `Songs`)}
                  </h2>
                }
                secondInfo={<div className={`mx-auto w-fit`}>Duration</div>}
                thirdInfo={` `}
                cta={false}
                hover={false}
              />
            </div>
          </header>

          <span className={`divider my-0`}></span>

          <ul>
            {playlist.tracks.items.map((item, j) => {
              return (
                <li key={item.id} className={`flex items-center gap-4`}>
                  <span className={`flex w-5 justify-center`}>{j + 1}</span>

                  <div className={`flex-grow @container`}>
                    <CardLong
                      item={item.track}
                      image={item.track.album.images[0]?.url}
                      link={`/${item.track.type}/${item.track.id}`}
                      secondInfo={
                        <div className={`mx-auto w-fit`}>
                          {moment(item.track.duration_ms).format("m:ss")}
                        </div>
                      }
                      thirdInfo={` `}
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
