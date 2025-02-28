import CardVertical from "@/components/Card/CardVertical";
import SavedTracks from "@/components/Layout/Profile/SavedTracks";
import LoginAlert from "@/components/Modals/LoginAlert";
import { createSpotifyAxiosInstance } from "@/lib/axios";
import Link from "next/link";
import { redirect } from "next/navigation";

export const revalidate = 0;

export async function generateMetadata() {
  try {
    const axios = await createSpotifyAxiosInstance();

    const { data: user } = await axios.get(`/me/tracks`);

    return {
      title: `Saved Songs (${user.display_name})`,
    };
  } catch (error) {
    return {
      title: "You are not logged in",
    };
  }
}

export default async function page({ params }) {
  try {
    const axios = await createSpotifyAxiosInstance();
    const { data } = await axios.get(`/me`);

    return <SavedTracks />;
  } catch (error) {
    return <LoginAlert show={true} redirect={`/`} />;
  }
}
