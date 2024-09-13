import {
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_AUTHORIZATION,
  SPOTIFY_REFRESH_TOKEN,
} from "@/lib/constants";
import { generateRandomString } from "@/lib/randomString";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const { context_uri, uris, offset, position_ms } = await request.json();

  const cookiesStore = cookies();

  try {
    const { data, status } = await axios.put(
      `${process.env.API_URL}/me/player/play`,
      { context_uri, uris, offset, position_ms },
      {
        headers: {
          Authorization: `Bearer ${cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value}`,
        },
      },
    );

    return NextResponse.json(data, { status });
  } catch ({ response }) {
    const { data, status } = response;

    return NextResponse.json(data, { status });
  }
}
