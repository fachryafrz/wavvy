export const siteConfig = {
  name: "Ryth",
  description:
    "Ryth is a music streaming platform that offers seamless access to an extensive music library. You can explore detailed information about songs, albums, artists, and playlists. The intuitive search functionality makes it easy to find songs, artists, albums, and playlists effortlessly.",
  url:
    process.env.NODE_ENV === "production"
      ? "https://ryth.fachryafrz.com"
      : "http://localhost:3000",
};
