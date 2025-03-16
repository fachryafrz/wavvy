import AlbumDetailsTracks from "@/components/Album/Details/Tracks";
import DetailsHero from "@/components/Layout/Details/Hero";
import RetryAfter from "@/components/Modals/RetryAfter";
import SliderPlaylist from "@/components/Slider/Playlist";
import { siteConfig } from "@/config/site";
import { createSpotifyAxiosInstance } from "@/lib/axios";
import moment from "moment";
import pluralize from "pluralize";

export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const axios = await createSpotifyAxiosInstance();

    const { data: album } = await axios.get(`/albums/${id}`);

    const [image] = album.images;
    const [primaryArtist] = album.artists;

    return {
      title: `${album.name} album by ${primaryArtist.name}`,
      description: `album by ${primaryArtist.name}. ${pluralize("Song", album.total_tracks, true)}. ${moment(album.release_date).format(`MMM DD, YYYY`)}`,
      openGraph: {
        title: `${album.name} - ${siteConfig.name}`,
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

    const { data: album } = await axios.get(`/albums/${id}`);

    const maxDiscNumber = Math.max(
      ...album.tracks.items.map((item) => item.disc_number),
    );

    const [image] = album.images;
    const [primaryArtist] = album.artists;

    const [artistsDetails, moreAlbums, isSaved] = await Promise.all([
      // Get artists
      Promise.all(
        album.artists.map(async ({ id }) => {
          const { data } = await axios.get(`/artists/${id}`);
          return data;
        }),
      ),

      // Get more albums
      axios.get(`/artists/${primaryArtist.id}/albums`).then(({ data }) => data),

      // Check if album is saved
      axios.get(`/me/albums/contains`, {
        params: { ids: id },
      })
        .then(({ data }) => data[0])
        .catch(() => false),
    ]);

    return (
      <div className={`flex flex-col gap-4`}>
        {/* Hero */}
        <section>
          <DetailsHero
            item={album}
            artists={artistsDetails}
            image={image?.url ?? "/maskable/maskable_icon_x192.png"}
            title={album.name}
            type={`Album ${album.album_type !== "album" ? `(${album.album_type})` : ``}`}
            isSaved={isSaved}
            secondInfo={
              <span className={`mx-auto md:mx-0`}>
                {pluralize("Song", album.total_tracks, true)} &bull;{" "}
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
  } catch (error) {
    const retryAfter = error?.response.headers["retry-after"];
    if (retryAfter) return <RetryAfter retryAfter={retryAfter} />;

    throw error;
  }
}
