import { fetchData } from "@/server/actions";
import { useCallback, useEffect } from "react";
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
  useWebPlaybackSDKReady,
  WebPlaybackSDK,
} from "react-spotify-web-playback-sdk";

const SPOTIFY_URI = "spotify:track:7BqHUALzNBTanL6OvsqmC1";

export default function SpotifyPlayer({ AUTH_TOKEN }) {
  const getOAuthToken = useCallback((callback) => callback(AUTH_TOKEN), []);

  return (
    <WebPlaybackSDK
      deviceName="My awesome Spotify app"
      getOAuthToken={getOAuthToken}
      volume={0.5}
    >
      {/* `TogglePlay` and `SongTitle` will be defined later. */}
      <Play AUTH_TOKEN={AUTH_TOKEN} />
    </WebPlaybackSDK>
  );
}

const Play = () => {
  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
  const playback = usePlaybackState();
  // console.log(playback)

  const playSong = async () => {
    if (device === null) return;

    await fetchData(`/me/player/play`, {
      params: {
        device_id: device.device_id,
      },
      method: "PUT",
      data: JSON.stringify({ uris: [SPOTIFY_URI] }),
    });
  };

  if (device === null) return null;

  return (
    <div className={`flex gap-8`}>
      <button onClick={() => (playback ? player.resume() : playSong())}>
        Play
      </button>
      <button onClick={() => player.pause()}>Pause</button>
    </div>
  );
};
