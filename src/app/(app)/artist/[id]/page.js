import CardLong from "@/components/Card/CardLong";
import DetailsHero from "@/components/Layout/Details/Hero";
import RetryAfter from "@/components/Modals/RetryAfter";
import SliderPlaylist from "@/components/Slider/Playlist";
import { createSpotifyAxiosInstance } from "@/lib/axios";
import moment from "moment";
import Link from "next/link";
import numeral from "numeral";
import pluralize from "pluralize";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const axios = await createSpotifyAxiosInstance();

    const { data: artist } = await axios.get(`/artists/${id}`);

    const [image] = artist.images;

    return {
      title: `${artist.name}`,
      description: `Listen to ${artist.name}. ${numeral(artist.followers.total).format(`0a`)} followers`,
      openGraph: {
        title: `${artist.name} - ${process.env.NEXT_PUBLIC_APP_NAME}`,
        images: [image?.url ?? "/maskable/maskable_icon_x192.png"],
      },
    };
  } catch (error) {
    const retryAfter = error?.response.headers["retry-after"];
    if (retryAfter)
      return {
        title: "Sorry you can't access this page",
        description: `There was a problem with your request. Please try again after ${moment(retryAfter * 1000).format("mm [minutes] ss [seconds]")}.`,
      };

    throw error
  }
}

export default async function page({ params }) {
  const { id } = params;

  try {
    const axios = await createSpotifyAxiosInstance();

    const { data: artist } = await axios.get(`/artists/${id}`);

    const [image] = artist.images;

    const [topTracks, albums, appearsOn, relatedArtists, isFollowed] =
      await Promise.all([
        // Get top tracks
        axios.get(`/artists/${id}/top-tracks`).then(({ data }) => data),

        // Get albums
        axios.get(`/artists/${id}/albums`, {
          params: { include_groups: "album" },
        }).then(({ data }) => data),

        // Get appears on
        axios.get(`/artists/${id}/albums`, {
          params: { include_groups: "appears_on" },
        }).then(({ data }) => data),

        // Get related artists
        axios.get(`/artists/${id}/related-artists`).then(({ data }) => data),

        // Check if artist is followed
        axios.get(`/me/following/contains`, {
          params: { type: `artist`, ids: id },
        })
          .then(({ data }) => data[0])
          .catch(() => false),
      ]);

    const includeGroups = "single,album,appears_on,compilation";

    return (
      <div className={`flex flex-col gap-4`}>
        {/* Hero */}
        <section>
          <DetailsHero
            item={artist}
            image={image?.url ?? "/maskable/maskable_icon_x192.png"}
            title={artist.name}
            type={`Artist`}
            isFollowed={isFollowed}
            secondInfo={
              <div className={`flex gap-1 text-white`}>
                <span>
                  {numeral(artist.followers.total).format("0,0")}{" "}
                  {pluralize("follower", artist.followers.total)}
                </span>
              </div>
            }
          />
        </section>

        {/* Popular Tracks */}
        {topTracks.tracks.length > 0 && (
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
                              prefetch={false}
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
                                  prefetch={false}
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
        )}

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
  } catch (error) {
    const retryAfter = error?.response.headers["retry-after"];
    if (retryAfter) return <RetryAfter retryAfter={retryAfter} />;

    throw error
  }
}
