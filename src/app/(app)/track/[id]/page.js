import CardLong from "@/components/Card/CardLong";
import DetailsHero from "@/components/Layout/Details/Hero";
import RetryAfter from "@/components/Modals/RetryAfter";
import SliderPlaylist from "@/components/Slider/Playlist";
import { siteConfig } from "@/config/site";
import { createSpotifyAxiosInstance } from "@/lib/axios";
import moment from "moment";
import Link from "next/link";
import pluralize from "pluralize";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const axios = await createSpotifyAxiosInstance();

    const { data: track } = await axios.get(`/tracks/${id}`);

    const { album } = track;
    const [image] = album.images;
    const [primaryArtist] = track.artists;

    return {
      title: `${track.name} by ${primaryArtist.name}`,
      description: `${track.name} by ${primaryArtist.name}. ${moment(album.release_date).format("YYYY")}`,
      openGraph: {
        title: `${track.name} - ${siteConfig.name}`,
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

    throw error;
  }
}

export default async function page({ params }) {
  const { id } = params;

  try {
    const axios = await createSpotifyAxiosInstance();

    const { data: track } = await axios.get(`/tracks/${id}`);

    const { album } = track;
    const [image] = album.images;
    const [primaryArtist] = track.artists;

    const [artistsDetails, artistsTopTracks, albums, relatedArtists] =
      await Promise.all([
        // Get artists
        Promise.all(
          track.artists.map(async ({ id }) => {
            const { data } = await axios.get(`/artists/${id}`);
            return data;
          }),
        ),

        // Get top tracks
        Promise.all(
          track.artists.map(async ({ id }) => {
            const { data } = await axios.get(`/artists/${id}/top-tracks`);
            return data;
          }),
        ),

        // Get albums
        axios
          .get(`/artists/${primaryArtist.id}/albums`)
          .then(({ data }) => data),

        // Get related artists
        axios
          .get(`/artists/${primaryArtist.id}/related-artists`)
          .then(({ data }) => data),
      ]);

    return (
      <div className={`flex flex-col gap-4`}>
        {/* Hero */}
        <section>
          <DetailsHero
            item={track}
            artists={artistsDetails}
            image={image?.url ?? "/maskable/maskable_icon_x192.png"}
            title={track.name}
            type={`Song`}
            secondInfo={
              <>
                <span>Album: </span>

                <Link
                  href={`/${album.type}/${album.id}`}
                  prefetch={false}
                  className={`flex w-fit font-medium text-white hocus:underline`}
                >
                  {album.name}
                </Link>
              </>
            }
          />
        </section>

        {/* Top Tracks */}
        {track.artists.slice(0, 1).map((artist, i) => {
          return (
            <section key={artist.id}>
              <SliderPlaylist
                id={`top-tracks-${artist.id}`}
                title={`Top Songs by ${artist.name}`}
                data={artistsTopTracks[i].tracks.filter(
                  (item) => item.id !== id,
                )}
              />
            </section>
          );
        })}

        {/* Popular Albums */}
        {primaryArtist.name && (
          <section>
            <div className={`flex flex-col @container`}>
              <header className={`@container`}>
                <div className={`-mx-1`}>
                  <CardLong
                    name={
                      <h2 className={`text-xl font-medium`}>
                        Popular Albums by {primaryArtist.name}
                      </h2>
                    }
                    // secondInfo={<div className={`mx-auto w-fit`}>Song Count</div>}
                    thirdInfo={
                      <div className={`mx-auto w-fit`}>Release Date</div>
                    }
                    cta={false}
                    hover={false}
                  />
                </div>
              </header>

              <span className={`divider my-0`}></span>

              <ul>
                {albums.items.map((album, i) => {
                  const [image] = album.images;

                  return (
                    <li key={album.id}>
                      <div className={`-mx-1`}>
                        <CardLong
                          item={album}
                          image={
                            image?.url ?? "/maskable/maskable_icon_x192.png"
                          }
                          link={`/${album.type}/${album.id}`}
                          // cta={false}
                          thirdInfo={
                            <div className={`mx-auto w-fit`}>
                              {moment(album.release_date).format(
                                "MMMM DD, YYYY",
                              )}
                            </div>
                          }
                          // secondInfo={
                          //   <div className={`mx-auto w-fit`}>
                          //     {album.total_tracks}{" "}
                          //     {pluralize(`Song`, album.total_tracks)}
                          //   </div>
                          // }
                          smallInfo={
                            <div className={``}>
                              {pluralize(`Song`, album.total_tracks, true)}
                            </div>
                          }
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        {/* Other Artists */}
        {track.artists.slice(1).map((artist, i) => {
          return (
            <section key={artist.id}>
              <SliderPlaylist
                id={`top-tracks-${artist.id}`}
                title={`Top Songs by ${artist.name}`}
                data={artistsTopTracks[i + 1].tracks.filter(
                  (item) => item.id !== id,
                )}
              />
            </section>
          );
        })}

        {relatedArtists.artists.length > 0 && (
          <section>
            <SliderPlaylist
              id={`related-artists`}
              title={`Fans also like`}
              data={relatedArtists.artists}
            />
          </section>
        )}
      </div>
    );
  } catch (error) {
    const retryAfter = error?.response.headers["retry-after"];
    if (retryAfter) return <RetryAfter retryAfter={retryAfter} />;

    throw error;
  }
}
