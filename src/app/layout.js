import "./globals.css";
import { Suspense } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AccessToken from "@/components/Auth/AccessToken";
import Sidebar from "@/components/Layout/Sidebar";
import { CookiesProvider } from "next-client-cookies/server";
import LoginAlert from "@/components/Modals/LoginAlert";

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
};

export default function RootLayout({ children }) {
  const authorizationURL = process.env.AUTHORIZATION_URL;
  const client_id = process.env.CLIENT_ID;
  const redirect_uri = process.env.NEXT_PUBLIC_APP_URL;

  return (
    <html lang="en">
      <Suspense>
        <GoogleAnalytics />
        <AccessToken />
      </Suspense>

      <body className={``}>
        <CookiesProvider>
          <Sidebar
            authorizationURL={authorizationURL}
            client_id={client_id}
            redirect_uri={redirect_uri}
          >
            {/* Center */}
            <main className={`flex flex-col lg:grid lg:grid-cols-12`}>
              {children}
            </main>
          </Sidebar>

          <LoginAlert />
        </CookiesProvider>
      </body>
    </html>
  );
}
