import "./globals.css";
import { Suspense } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { CookiesProvider } from "next-client-cookies/server";
import LoginAlert from "@/components/Modals/LoginAlert";
import PremiumAlert from "@/components/Modals/PremiumAlert";
import TanStackQuery from "@/providers/TanStackQuery";

export const revalidate = 86400;

export const metadata = {
  title: {
    template: `%s - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    default: process.env.NEXT_PUBLIC_APP_NAME,
  },
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Suspense>
        <GoogleAnalytics />
      </Suspense>

      <body>
        <CookiesProvider>
          <TanStackQuery>
            {children}

            {/* Modals */}
            <PremiumAlert />
            <LoginAlert />
          </TanStackQuery>
        </CookiesProvider>
      </body>
    </html>
  );
}
