export default function manifest() {
  return {
    name: process.env.NEXT_PUBLIC_APP_NAME,
    short_name: process.env.NEXT_PUBLIC_APP_NAME,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/maskable/maskable_icon_x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcuts: [
      {
        name: "Saved Songs",
        description: "View the list of songs you saved",
        url: "/me/tracks",
        icons: [
          {
            src: "/icons/heart-outline.svg",
            type: "image/svg+xml",
            sizes: "150x150",
          },
        ],
      },
      {
        name: "History",
        description: "View the list of songs you listened to",
        url: "/me/recently-played",
        icons: [
          {
            src: "/icons/calendar-outline.svg",
            type: "image/svg+xml",
            sizes: "150x150",
          },
        ],
      },
    ],
  };
}
