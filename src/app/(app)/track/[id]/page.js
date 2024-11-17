import CardLong from "@/components/Card/CardLong";
import DetailsHero from "@/components/Layout/Details/Hero";
import SliderPlaylist from "@/components/Slider/Playlist";
import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
import { isPlural } from "@/lib/isPlural";
import { fetchData } from "@/server/actions";
import moment from "moment";
import Link from "next/link";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = params;

  const { data: track } = await fetchData(`/tracks/${id}`);
  const { album } = track;
  const [image] = album.images;
  const [primaryArtist] = track.artists;

  return {
    title: `${track.name} by ${primaryArtist.name}`,
    description: `${track.name} by ${primaryArtist.name}. ${moment(album.release_date).format("YYYY")}`,
    openGraph: {
      title: `${track.name} - ${process.env.NEXT_PUBLIC_APP_NAME}`,
      images: [image?.url ?? "/maskable/maskable_icon_x192.png"],
    },
  };
}

export default async function page({ params }) {
  const { id } = params;

  const { data: track } = await fetchData(`/tracks/${id}`);
  const { album } = track;
  const [image] = album.images;
  const [primaryArtist] = track.artists;

  const artistsDetails = [];
  const artistsTopTracks = [];
  for (const item of track.artists) {
    const { id } = item;

    const { data: topTracks } = await fetchData(`/artists/${id}/top-tracks`);

    const { data: artist } = await fetchData(`/artists/${id}`);

    artistsDetails.push(artist);
    artistsTopTracks.push(topTracks);
  }

  const { data: albums } = await fetchData(
    `/artists/${primaryArtist.id}/albums`,
  );

  const { data: relatedArtists } = await fetchData(
    `/artists/${primaryArtist.id}/related-artists`,
  );

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
              data={artistsTopTracks[i].tracks.filter((item) => item.id !== id)}
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
                        image={image?.url ?? "/maskable/maskable_icon_x192.png"}
                        link={`/${album.type}/${album.id}`}
                        // cta={false}
                        thirdInfo={
                          <div className={`mx-auto w-fit`}>
                            {moment(album.release_date).format("MMMM DD, YYYY")}
                          </div>
                        }
                        // secondInfo={
                        //   <div className={`mx-auto w-fit`}>
                        //     {album.total_tracks}{" "}
                        //     {isPlural(album.total_tracks, `Song`, `Songs`)}
                        //   </div>
                        // }
                        smallInfo={
                          <div className={``}>
                            {album.total_tracks}{" "}
                            {isPlural(album.total_tracks, `Song`, `Songs`)}
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
}
