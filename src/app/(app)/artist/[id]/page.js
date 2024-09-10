import CardLong from "@/components/Card/CardLong";
import DetailsHero from "@/components/Layout/Details/Hero";
import SliderPlaylist from "@/components/Slider/Playlist";
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

  const { data } = await axios.get(`${process.env.API_URL}/artists/${id}`, {
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

  const { data: artist } = await axios.get(
    `${process.env.API_URL}/artists/${id}`,
    { headers: headers },
  );
  const [image] = artist.images;

  const { data: topTracks } = await axios.get(
    `${process.env.API_URL}/artists/${id}/top-tracks`,
    { headers: headers },
  );

  const includeGroups = "single,album,appears_on,compilation";
  const { data: albums } = await axios.get(
    `${process.env.API_URL}/artists/${id}/albums`,
    {
      headers: headers,
      params: { include_groups: "album" },
    },
  );

  const { data: appearsOn } = await axios.get(
    `${process.env.API_URL}/artists/${id}/albums`,
    {
      headers: headers,
      params: { include_groups: "appears_on" },
    },
  );

  const { data: relatedArtists } = await axios.get(
    `${process.env.API_URL}/artists/${id}/related-artists`,
    { headers: headers },
  );

  return (
    <div className={`flex flex-col gap-4`}>
      {/* Hero */}
      <section>
        <DetailsHero
          item={artist}
          image={image.url}
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
          <header className={`flex items-center gap-4`}>
            <h2 className={`text-xl font-medium`}>Popular</h2>
          </header>

          <span className={`divider my-0`}></span>

          <ul>
            {topTracks.tracks.slice(0, 5).map((item, j) => {
              return (
                <li key={item.id} className={`flex items-center gap-4`}>
                  <span className={`flex w-5 justify-center`}>{j + 1}</span>

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
