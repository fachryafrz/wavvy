import LoadingCard from "@/components/Loading/Card";
import TrackCard from "@/components/Track/Card";
import { useAuth } from "@/hooks/auth";
import { useTrack } from "@/zustand/track";
import Link from "next/link";
import { useEffect } from "react";
import {
  usePlayerDevice,
  useSpotifyPlayer,
  useWebPlaybackSDKReady,
} from "react-spotify-web-playback-sdk";

export default function PlayerInfo() {
  const { user } = useAuth();
  const { track } = useTrack();
  const webPlaybackSDKReady = useWebPlaybackSDKReady();
  const device = usePlayerDevice();
  const player = useSpotifyPlayer();

  return (
    <>
      {!webPlaybackSDKReady && <LoadingCard />}

      {webPlaybackSDKReady && (
        <TrackCard
          id={track?.id}
          type={track?.type ?? "track"}
          name={
            !user ? (
              "Nothing Playing"
            ) : (
              <Link
                href={`/${track?.type ?? "track"}/${track?.id}`}
                className={`relative z-10 hocus:underline`}
              >
                {track?.name}
              </Link>
            )
          }
          image={
            !user
              ? "/maskable/maskable_icon_x192.png"
              : track?.album.images[0].url
          }
          info={
            !user
              ? null
              : (track?.artists.map((artist) => {
                  const [app, type, id] = artist.uri.split(":");

                  return (
                    <>
                      <Link
                        href={`/artist/${id}`}
                        className={`relative z-10 hocus:underline`}
                      >
                        {artist.name}
                      </Link>

                      <span className={`last:hidden`}>, </span>
                    </>
                  );
                }) ??
                track?.artists.map((artist) => {
                  const [app, type, id] = artist.uri.split(":");

                  return (
                    <>
                      <Link
                        href={`/artist/${id}`}
                        className={`hocus:underline`}
                      >
                        {artist.name}
                      </Link>

                      <span className={`last:hidden`}>, </span>
                    </>
                  );
                }))
          }
        />
      )}
    </>
  );
}
