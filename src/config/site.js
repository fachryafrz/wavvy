export const siteConfig = {
  name: "Wavvy",
  description:
    "Music streaming platform that offers seamless access to an extensive music library. You can explore detailed information about songs, albums, artists, and playlists. The intuitive search functionality makes it easy to find songs, artists, albums, and playlists effortlessly.",
  url:
    process.env.NODE_ENV === "production"
      ? "https://wavvy.fachryafrz.com"
      : "http://localhost:3000",
};
