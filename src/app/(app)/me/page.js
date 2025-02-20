import LoginAlert from "@/components/Modals/LoginAlert";
import Profile from "@/components/User/Profile";
import { createSpotifyAxiosInstance } from "@/lib/axios";

export async function generateMetadata() {
  try {
    const axios = await createSpotifyAxiosInstance();

    const { data: user } = await axios.get(`/me`);

    return {
      title: user.display_name,
    };
  } catch (error) {
    return {
      title: "You are not logged in",
    }
  }
}

export default async function page() {
  try {
    const axios = await createSpotifyAxiosInstance();

    const { data: user } = await axios.get(`/me`)

    return (
      <div>
        <Profile user={user} />
      </div>
    );
  } catch (error) {
    return <LoginAlert show={true} redirect={`/`} />;
  }


}
