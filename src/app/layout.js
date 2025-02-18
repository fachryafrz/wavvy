import "./globals.css";
import { Suspense } from "react";
import { CookiesProvider } from "next-client-cookies/server";
import TanStackQuery from "@/providers/TanStackQuery";
import { Roboto } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Sidebar from "@/components/Layout/Sidebar";
import { cookies } from "next/headers";
import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#131720",
  userScalable: true,
  colorScheme: "dark",
};

export const metadata = {
  title: {
    template: `%s - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    default: process.env.NEXT_PUBLIC_APP_NAME,
  },
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  openGraph: {
    title: process.env.NEXT_PUBLIC_APP_NAME,
    images: ["/maskable/maskable_icon_x192.png"],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: false,
    follow: false,
    noimageindex: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({ children }) {
  const cookiesStore = cookies();

  const gtagId = process.env.GA_MEASUREMENT_ID;
  const authorizationURL = process.env.AUTHORIZATION_URL;
  const client_id = process.env.CLIENT_ID;

  const AUTH_TOKEN = cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value;

  return (
    <html lang="en">
      <body className={roboto.className}>
        <CookiesProvider>
          <TanStackQuery>
            <Sidebar
              authorizationURL={authorizationURL}
              client_id={client_id}
              AUTH_TOKEN={AUTH_TOKEN}
            >
              {children}
            </Sidebar>
          </TanStackQuery>
        </CookiesProvider>

        <GoogleAnalytics gaId={gtagId} />
      </body>
    </html>
  );
}
