import SliderPlaylist from "@/components/Slider/Playlist";
import { spotify_access_token } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page() {
  const cookiesStore = cookies();

  if (!cookiesStore.has(spotify_access_token)) {
    return redirect(`/login`);
  }

  const headers = {
    Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
  };

  const { data: userPlaylists } = await axios.get(
    `${process.env.API_URL}/me/playlists`,
    { headers: headers },
  );
  const { data: featuredPlaylists } = await axios.get(
    `${process.env.API_URL}/browse/featured-playlists`,
    { headers: headers },
  );

  return (
    <div className={`flex flex-col gap-4`}>
      <SliderPlaylist
        id={`userPlaylists`}
        title={
          <Link href={`/me/playlists`} className={`hocus:underline`}>
            Your Playlists
          </Link>
        }
        data={userPlaylists}
      />

      <SliderPlaylist
        id={`featuredPlaylists`}
        title={`Featured Playlists`}
        data={featuredPlaylists.playlists}
      />
    </div>
  );
}
