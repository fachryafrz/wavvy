import { SPOTIFY_ACCESS_TOKEN, SPOTIFY_AUTHORIZATION } from "@/lib/constants";
import { generateRandomString } from "@/lib/randomString";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const { type } = context.params;

  const cookiesStore = cookies();

  try {
    const { data, status } = await axios.get(
      `${process.env.API_URL}/me/top/${type}`,
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
