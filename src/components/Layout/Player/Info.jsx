import LoadingCard from "@/components/Loading/Card";
import TrackCard from "@/components/Track/Card";
import { useAuth } from "@/hooks/auth";
import { usePlayback } from "@/zustand/playback";
import Link from "next/link";
import {
  usePlayerDevice,
  useSpotifyPlayer,
  useWebPlaybackSDKReady,
} from "react-spotify-web-playback-sdk";

export default function PlayerInfo() {
  const { user } = useAuth();
  const { track } = usePlayback();
  const webPlaybackSDKReady = useWebPlaybackSDKReady();
  const device = usePlayerDevice();
  const player = useSpotifyPlayer();

  return (
    <>
      {user && !webPlaybackSDKReady && <LoadingCard />}

      {!user && (
        <TrackCard
          id={track?.id}
          type={track?.type ?? "track"}
          name={"Nothing Playing"}
          image={"/maskable/maskable_icon_x192.png"}
          info={null}
        />
      )}

      {user && webPlaybackSDKReady && (
        <TrackCard
          id={track?.id}
          type={track?.type ?? "track"}
          name={
            <Link
              href={`/${track?.type ?? "track"}/${track?.id}`}
              prefetch={false}
              className={`relative z-10 hocus:underline`}
            >
              {track?.name}
            </Link>
          }
          image={track?.album.images[0].url}
          info={
            track?.artists.map((artist) => {
              const [app, type, id] = artist.uri.split(":");

              return (
                <>
                  <Link
                    href={`/artist/${id}`}
                    prefetch={false}
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
                    prefetch={false}
                    className={`hocus:underline`}
                  >
                    {artist.name}
                  </Link>

                  <span className={`last:hidden`}>, </span>
                </>
              );
            })
          }
        />
      )}
    </>
  );
}
