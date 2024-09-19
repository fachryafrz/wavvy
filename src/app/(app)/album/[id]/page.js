import AlbumDetailsTracks from "@/components/Album/Details/Tracks";
import DetailsHero from "@/components/Layout/Details/Hero";
import SliderPlaylist from "@/components/Slider/Playlist";
import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
import { isPlural } from "@/lib/isPlural";
import { fetchData } from "@/server/actions";
import moment from "moment";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = params;
  const { data: album } = await fetchData(`/albums/${id}`);
  const [image] = album.images;
  const [primaryArtist] = album.artists;

  return {
    title: `${album.name} album by ${primaryArtist.name}`,
    description: `album by ${primaryArtist.name}. ${album.total_tracks} ${isPlural(album.total_tracks, `Song`, `Songs`)}. ${moment(album.release_date).format(`MMM DD, YYYY`)}`,
    openGraph: {
      title: `${album.name} - ${process.env.NEXT_PUBLIC_APP_NAME}`,
      images: [image?.url ?? "/maskable/maskable_icon_x192.png"],
    },
  };
}

export default async function page({ params }) {
  const { id } = params;

  const { data: album } = await fetchData(`/albums/${id}`);
  const [image] = album.images;

  const artistsDetails = [];
  for (const item of album.artists) {
    const { id } = item;

    const { data: artist } = await fetchData(`/artists/${id}`);

    artistsDetails.push(artist);
  }
  const maxDiscNumber = Math.max(
    ...album.tracks.items.map((item) => item.disc_number),
  );

  const [primaryArtist] = album.artists;
  const { data: moreAlbums } = await fetchData(
    `/artists/${primaryArtist.id}/albums`,
  );

  return (
    <div className={`flex flex-col gap-4`}>
      {/* Hero */}
      <section>
        <DetailsHero
          item={album}
          artists={artistsDetails}
          image={image?.url ?? "/maskable/maskable_icon_x192.png"}
          title={album.name}
          type={`Album`}
          secondInfo={
            <span className={`mx-auto md:mx-0`}>
              {album.total_tracks}{" "}
              {isPlural(album.total_tracks, `Song`, `Songs`)} &bull;{" "}
              {moment(album.release_date).format("MMM DD, YYYY")}
            </span>
          }
        />
      </section>

      {/* Tracks */}
      <section className={`flex flex-col gap-4`}>
        {[...Array(maxDiscNumber)].map((_, i) => {
          const disc = i + 1;

          return (
            <div key={i}>
              <AlbumDetailsTracks album={album} disc={disc} />
            </div>
          );
        })}
      </section>

      {/* More Albums from Primary Artist */}
      {moreAlbums.items.length > 0 && (
        <section>
          <SliderPlaylist
            id={`more-albums-${primaryArtist.id}`}
            title={`More by ${primaryArtist.name}`}
            data={moreAlbums.items.filter((item) => item.id !== album.id)}
          />
        </section>
      )}
    </div>
  );
}
