import { cookies } from "next/headers";
import "../globals.css";
import Sidebar from "@/components/Layout/Sidebar";
import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";

export default function AppLayout({ children }) {
  const authorizationURL = process.env.AUTHORIZATION_URL;
  const client_id = process.env.CLIENT_ID;

  const cookiesStore = cookies();

  const AUTH_TOKEN = cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value;

  return (
    <Sidebar
      authorizationURL={authorizationURL}
      client_id={client_id}
      AUTH_TOKEN={AUTH_TOKEN}
    >
      {children}
    </Sidebar>
  );
}
