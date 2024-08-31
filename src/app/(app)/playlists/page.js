import SliderPlaylist from "@/components/Slider/Playlist";
import { spotify_access_token } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
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

  return (
    <div>
      <SliderPlaylist
        id={`userPlaylists`}
        title={`Your Playlists`}
        data={userPlaylists}
      />
    </div>
  );
}
