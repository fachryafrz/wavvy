import "./globals.css";
import { Suspense } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AccessToken from "@/components/Auth/AccessToken";
import { CookiesProvider } from "next-client-cookies/server";
import LoginAlert from "@/components/Modals/LoginAlert";
import PremiumAlert from "@/components/Modals/PremiumAlert";

export const revalidate = 3600;

export const metadata = {
  title: {
    template: `%s - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    default: process.env.NEXT_PUBLIC_APP_NAME,
  },
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Suspense>
        <GoogleAnalytics />
        <AccessToken />
      </Suspense>

      <body className={``}>
        <CookiesProvider>
          {children}

          {/* Modals */}
          <PremiumAlert />
          <LoginAlert />
        </CookiesProvider>
      </body>
    </html>
  );
}
