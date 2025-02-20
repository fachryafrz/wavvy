import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, ctx) {
  const { first, second } = ctx.params;
  const { searchParams } = new URL(req.url);
  const cookiesStore = cookies();

  try {
    const { data, status } = await axios.get(
      `${process.env.API_URL}/${first}/${second}`,
      {
        headers: {
          Authorization: `Bearer ${cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value}`,
        },
        params: Object.fromEntries(searchParams)
      }
    )

    return NextResponse.json(data, { status });
  } catch (error) {
    return NextResponse.json(error.response.data, { status: error.response.status });
  }
}