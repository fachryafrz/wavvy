"use client";

import PlaylistOfTheDay from "../PlaylistOfTheDay";

export default function LeftContent() {
  return (
    <div className={`flex flex-col gap-8`}>
      {/* Playlist of the Day & Video */}
      <section className={`flex gap-4`}>
        {/* Playlist of the Day */}
        <PlaylistOfTheDay />

        {/* Video */}
        <span>Video</span>
      </section>

      {/* Playlists, Artists, Albums, Streams */}
      <section className={`flex gap-4`}>
        {/* Playlists */}
        <span>Playlist</span>

        {/* Artists */}
        <span>Artists</span>

        {/* Albums */}
        <span>Albums</span>

        {/* Streams */}
        <span>Streams</span>
      </section>
    </div>
  );
}
