import Profile from "@/components/User/Profile";
import { spotify_access_token } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  const cookiesStore = cookies();
  const headers = {
    Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
  };

  const { data: user } = await axios.get(`${process.env.API_URL}/me`, {
    headers: headers,
  });

  return {
    title: `${user.display_name}`,
  };
}

export default async function page() {
  const cookiesStore = cookies();

  if (!cookiesStore.has(spotify_access_token)) {
    return redirect(`/login`);
  }

  const headers = {
    Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
  };

  const { data: user } = await axios.get(`${process.env.API_URL}/me`, {
    headers: headers,
  });

  return (
    <div>
      <Profile user={user} />
    </div>
  );
}
