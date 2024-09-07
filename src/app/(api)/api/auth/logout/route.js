import { spotify_access_token, spotify_refresh_token } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const cookiesStore = cookies();

  try {
    if (cookiesStore.has(spotify_access_token)) {
      cookiesStore.delete(spotify_access_token);
      cookiesStore.delete(spotify_refresh_token);

      return NextResponse.json(
        { message: "Logged out successfully" },
        { status: 200 },
      );
    }
  } catch (error) {
    return NextResponse.json(error, { status: error.status });
  }
}
