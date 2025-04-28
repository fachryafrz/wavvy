import { siteConfig } from "@/config/site";

export default function manifest() {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#e65931", // 10% darker than #ff6337
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
