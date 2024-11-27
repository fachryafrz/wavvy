import "./globals.css";
import { Suspense } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { CookiesProvider } from "next-client-cookies/server";
import TanStackQuery from "@/providers/TanStackQuery";

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
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Suspense>
        <GoogleAnalytics />
      </Suspense>

      <body>
        <CookiesProvider>
          <TanStackQuery>{children}</TanStackQuery>
        </CookiesProvider>
      </body>
    </html>
  );
}
