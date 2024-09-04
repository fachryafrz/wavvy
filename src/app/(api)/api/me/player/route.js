import {
  spotify_access_token,
  spotify_authorization,
  spotify_refresh_token,
} from "@/lib/constants";
import { generateRandomString } from "@/lib/randomString";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const cookiesStore = cookies();

  try {
    const { data, status } = await axios.get(
      `${process.env.API_URL}/me/player`,
      {
        headers: {
          Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
        },
      },
    );

    return NextResponse.json(data, { status: status });
  } catch (error) {
    if (!error.status) {
      return NextResponse.json("Playback not available or active", {
        status: 200, // Original status was 204 but somehow it keeps returning 500 or 200
      });
    }

    return NextResponse.json(error, { status: error.status });
  }
}
