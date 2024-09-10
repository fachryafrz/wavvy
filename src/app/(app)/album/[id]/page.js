import AlbumDetailsTracks from "@/components/Album/Details/Tracks";
import DetailsHero from "@/components/Layout/Details/Hero";
import SliderPlaylist from "@/components/Slider/Playlist";
import { spotify_access_token } from "@/lib/constants";
import { isPlural } from "@/lib/isPlural";
import axios from "axios";
import moment from "moment";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = params;
  const cookiesStore = cookies();
  const headers = {
    Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
  };

  const { data } = await axios.get(`${process.env.API_URL}/albums/${id}`, {
    headers: headers,
  });

  return {
    title: `${data.name} Album by ${data.artists[0].name}`,
  };
}

export default async function page({ params }) {
  const { id } = params;
  const cookiesStore = cookies();

  const headers = {
    Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
  };

  const { data: album } = await axios.get(
    `${process.env.API_URL}/albums/${id}`,
    { headers: headers },
  );
  const [image] = album.images;
  const artistsDetails = [];
  for (const item of album.artists) {
    const { id } = item;

    const { data: artist } = await axios.get(
      `${process.env.API_URL}/artists/${id}`,
      { headers: headers },
    );

    artistsDetails.push(artist);
  }
  const maxDiscNumber = Math.max(
    ...album.tracks.items.map((item) => item.disc_number),
  );

  const [primaryArtist] = album.artists;
  const { data: moreAlbums } = await axios.get(
    `${process.env.API_URL}/artists/${primaryArtist.id}/albums
  `,
    { headers: headers },
  );

  return (
    <div className={`flex flex-col gap-4`}>
      {/* Hero */}
      <section>
        <DetailsHero
          item={album}
          artists={artistsDetails}
          image={image.url}
          title={album.name}
          type={`Album`}
          secondInfo={
            <span className={`mx-auto md:mx-0`}>
              {album.total_tracks}{" "}
              {isPlural(album.total_tracks.length, `Song`, `Songs`)} &bull;{" "}
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
