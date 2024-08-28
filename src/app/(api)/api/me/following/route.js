import { spotify_access_token, spotify_authorization } from "@/lib/constants";
import { generateRandomString } from "@/lib/randomString";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const { type } = Object.fromEntries(url.searchParams);

  const cookiesStore = cookies();

  try {
    if (cookiesStore.has(spotify_access_token)) {
      const { data } = await axios.get(`${process.env.API_URL}/me/following`, {
        headers: {
          Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
        },
        params: {
          type: type,
        },
      });

      return NextResponse.json(data, { status: 200 });
    }
  } catch (error) {
    return NextResponse.error(error);
  }
}
