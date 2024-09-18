import CardLong from "@/components/Card/CardLong";
import DetailsHero from "@/components/Layout/Details/Hero";
import SliderPlaylist from "@/components/Slider/Playlist";
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

  const { data: artist } = await axios.get(
    `${process.env.API_URL}/artists/${id}`,
    { headers: headersAuth },
  );
  const [image] = artist.images;

  return {
    title: `${artist.name}`,
    description: `Listen to ${artist.name}. ${numeral(artist.followers.total).format(`0a`)} followers`,
    openGraph: {
      title: `${artist.name} - ${process.env.NEXT_PUBLIC_APP_NAME}`,
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

  const { data: artist } = await axios.get(
    `${process.env.API_URL}/artists/${id}`,
    { headers: headersAuth },
  );
  const [image] = artist.images;

  const { data: topTracks } = await axios.get(
    `${process.env.API_URL}/artists/${id}/top-tracks`,
    { headers: headersAuth },
  );

  const includeGroups = "single,album,appears_on,compilation";
  const { data: albums } = await axios.get(
    `${process.env.API_URL}/artists/${id}/albums`,
    {
      headers: headersAuth,
      params: { include_groups: "album" },
    },
  );

  const { data: appearsOn } = await axios.get(
    `${process.env.API_URL}/artists/${id}/albums`,
    {
      headers: headersAuth,
      params: { include_groups: "appears_on" },
    },
  );

  const { data: relatedArtists } = await axios.get(
    `${process.env.API_URL}/artists/${id}/related-artists`,
    { headers: headersAuth },
  );

  return (
    <div className={`flex flex-col gap-4`}>
      {/* Hero */}
      <section>
        <DetailsHero
          item={artist}
          image={image?.url ?? "/maskable/maskable_icon_x192.png"}
          title={artist.name}
          type={`Artist`}
          secondInfo={
            <div className={`flex gap-1 text-white`}>
              <span>
                {numeral(artist.followers.total).format("0,0")}{" "}
                {isPlural(artist.followers.total, `follower`, `followers`)}
              </span>
            </div>
          }
        />
      </section>

      {/* Popular Tracks */}
      <section>
        <div>
          <header className={`@container`}>
            <div className={`-mx-1`}>
              <CardLong
                name={<h2 className={`text-xl font-medium`}>Popular</h2>}
                secondInfo={`Album`}
                thirdInfo={<div className={`mx-auto w-fit`}>Duration</div>}
                cta={false}
                hover={false}
              />
            </div>
          </header>

          <span className={`divider my-0`}></span>

          <ul>
            {topTracks.tracks.map((item, j) => {
              return (
                <li key={item.id} className={`flex items-center gap-4`}>
                  <div className={`-mx-1 flex-grow @container`}>
                    <CardLong
                      item={item}
                      image={item.album.images[0].url}
                      link={`/${item.type}/${item.id}`}
                      secondInfo={
                        <Link
                          href={`/${item.album.type}/${item.album.id}`}
                          className={`hocus:underline`}
                        >
                          {item.album.name}
                        </Link>
                      }
                      thirdInfo={
                        <div className={`mx-auto w-fit`}>
                          {moment(item.duration_ms).format("m:ss")}
                        </div>
                      }
                      smallInfo={item.artists.map((artist) => {
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

      {/* Albums */}
      {albums.items.length > 0 && (
        <section>
          <SliderPlaylist
            id={`album-${id}`}
            title={`Albums`}
            data={albums.items}
          />
        </section>
      )}

      {/* Other Artists */}
      {relatedArtists.artists.length > 0 && (
        <section>
          <SliderPlaylist
            id={`related-artists`}
            title={`Fans also like`}
            data={relatedArtists.artists}
          />
        </section>
      )}

      {/* Appears On */}
      {appearsOn.items.length > 0 && (
        <section>
          <SliderPlaylist
            id={`appears-on-${id}`}
            title={`Appears On`}
            data={appearsOn.items}
          />
        </section>
      )}
    </div>
  );
}
