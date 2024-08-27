import { spotify_access_token } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const cookiesStore = cookies();

  if (cookiesStore.has(spotify_access_token)) {
    return NextResponse.json(true, { status: 200 });
  } else {
    return NextResponse.json(false, { status: 200 });
  }
}
