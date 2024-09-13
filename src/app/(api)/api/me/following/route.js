import { SPOTIFY_ACCESS_TOKEN, SPOTIFY_AUTHORIZATION } from "@/lib/constants";
import { generateRandomString } from "@/lib/randomString";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const { type } = Object.fromEntries(url.searchParams);

  const cookiesStore = cookies();

  try {
    const { data, status } = await axios.get(`${process.env.API_URL}/me/following`, {
      headers: {
        Authorization: `Bearer ${cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value}`,
      },
      params: {
        type: type,
      },
    });

    return NextResponse.json(data, { status });
  } catch ({ response }) {
    const { data, status } = response;

    return NextResponse.json(data, { status });
  }
}
