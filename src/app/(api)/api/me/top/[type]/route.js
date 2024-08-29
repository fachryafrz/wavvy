import { spotify_access_token, spotify_authorization } from "@/lib/constants";
import { generateRandomString } from "@/lib/randomString";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const type = context.params.type;

  const cookiesStore = cookies();

  try {
    if (cookiesStore.has(spotify_access_token)) {
      const { data } = await axios.get(
        `${process.env.API_URL}/me/top/${type}`,
        {
          headers: {
            Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
          },
        },
      );

      return NextResponse.json(data, { status: 200 });
    }
  } catch (error) {
    return NextResponse.error(error);
  }
}
