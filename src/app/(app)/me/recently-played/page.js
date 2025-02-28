import RecentlyPlayed from "@/components/Layout/Profile/RecentlyPlayed";
import LoginAlert from "@/components/Modals/LoginAlert";
import { createSpotifyAxiosInstance } from "@/lib/axios";

export async function generateMetadata() {
  try {
    const axios = await createSpotifyAxiosInstance();
    const { data: user } = await axios.get(`/me`);

    return {
      title: `Recently Played (${user.display_name})`,
    };
  } catch (error) {
    return {
      title: "You are not logged in",
    };
  }
}

export default async function page() {
  try {
    const axios = await createSpotifyAxiosInstance();
    const { data: user } = await axios.get(`/me`);

    return <RecentlyPlayed />;
  } catch (error) {
    return <LoginAlert show={true} redirect={`/`} />;
  }
}
