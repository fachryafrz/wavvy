import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const cookiesStore = cookies();

  try {
    const { data, status } = await axios.get(
      `${process.env.API_URL}/recommendations`,
      {
        headers: {
          Authorization: `Bearer ${cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value}`,
        },
        params: url.searchParams
      },
    );

    return NextResponse.json(data, { status });
  } catch ({ response }) {
    const { data, status } = response;


    return NextResponse.json(data, { status, headers: response.headers });
  }
}
