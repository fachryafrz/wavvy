import { spotify_access_token } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const { id } = context.params;

  const cookiesStore = cookies();

  try {
    if (cookiesStore.has(spotify_access_token)) {
      const { data } = await axios.get(
        `${process.env.API_URL}/browse/categories/${id}/playlists`,
        {
          headers: {
            Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
          },
        },
      );

      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(error, { status: error.status });
  }
}
