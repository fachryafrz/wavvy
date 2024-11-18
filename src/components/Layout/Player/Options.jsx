import { useHandleError } from "@/hooks/error";
import { useAuth } from "@/hooks/auth";
import { usePlayback } from "@/zustand/playback";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Repeat,
  Shuffle,
  VolumeHigh,
  VolumeLow,
  VolumeMedium,
  VolumeMute,
  VolumeOff,
} from "react-ionicons";
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
  useWebPlaybackSDKReady,
} from "react-spotify-web-playback-sdk";
import { fetchData } from "@/server/actions";

export default function PlaybackOptions({
  track,
  volumeState,
  setVolumeState,
}) {
  const { user } = useAuth();
  const router = useRouter();
  const { mutate } = useAuth();
  // const { playback, setPlayback } = usePlayback();
  const queryClient = useQueryClient();
  const { handleError } = useHandleError();

  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
  const playback = usePlaybackState();

  // State
  const [volumeInputState, setVolumeInputState] = useState(volumeState);
  const [shuffleState, setShuffleState] = useState(false);
  const [repeatState, setRepeatState] = useState(0);

  useEffect(() => {
    if (playback) {
      // setVolumeState(playback ? device.volume_percent : 100);
      setShuffleState(playback.shuffle);
      setRepeatState(playback.repeat_mode);
    }
  }, [playback]);

  const availableRepeatStates = [
    { state: "off" },
    { state: "context" },
    { state: "track" },
  ];

  // Set Volume
  const handleSetVolume = async (volume_percent) => {
    if (!playback) return;

    await fetchData(`/me/player/volume`, {
      method: "PUT",
      params: {
        volume_percent: volume_percent,
        device_id: device.id,
      },
    });

    setVolumeState(volume_percent);
  };

  // Toggle Shuffle Mode
  const handleToggleShuffleMode = async (shuffle_state) => {
    console.log(shuffle_state);

    await fetchData(`/me/player/shuffle`, {
      method: "PUT",
      params: { state: shuffle_state, device_id: device.id },
    });

    setShuffleState(shuffle_state);
  };

  // Change Repeat State
  const handleRepeatStateChange = async () => {
    const nextState = (repeatState + 1) % 3; // Perubahan mode: 0 -> 1 -> 2 -> 0
    await handleSetRepeatMode(nextState);
  };
  const handleSetRepeatMode = async (state) => {
    const repeatModes = ["off", "context", "track"]; // Mapping integer ke string untuk API
    const selectedState = repeatModes[state];

    try {
      const response = await fetchData(`/me/player/repeat`, {
        method: "PUT",
        params: { state: selectedState, device_id: device.id },
      });

      if (response.ok) {
        setRepeatState(state); // Perbarui state hanya jika API berhasil
      } else {
        console.error("Failed to set repeat mode");
      }
    } catch (error) {
      console.error("Error setting repeat mode:", error);
    }
  };

  // Login Alert
  const handleLoginAlert = () => {
    document.getElementById(`loginAlert`).showModal();
  };

  const timer = useRef();
  useEffect(() => {
    const handleVolumeChange = () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = window.setTimeout(async () => {
        await handleSetVolume(volumeInputState);
      }, 500);
    };

    handleVolumeChange();

    return () => clearTimeout(timer.current);
  }, [volumeInputState]);

  return (
    <div className={`flex flex-nowrap items-center justify-end`}>
      {/* Volume */}
      <div className={`mr-4 flex items-center`}>
        <button
          onClick={() =>
            !user
              ? handleLoginAlert()
              : volumeState === 0
                ? handleSetVolume(100)
                : handleSetVolume(0)
          }
          className={`btn btn-square btn-ghost no-animation btn-sm !bg-transparent`}
        >
          {/* Volume Icon */}
          {volumeInputState >= 75 ? (
            <VolumeHigh color={"#ffffff"} width={`20px`} height={`20px`} />
          ) : volumeInputState < 75 && volumeInputState >= 50 ? (
            <VolumeMedium color={"#ffffff"} width={`20px`} height={`20px`} />
          ) : volumeInputState < 50 && volumeInputState >= 25 ? (
            <VolumeLow color={"#ffffff"} width={`20px`} height={`20px`} />
          ) : volumeInputState < 25 && volumeInputState > 0 ? (
            <VolumeOff color={"#ffffff"} width={`20px`} height={`20px`} />
          ) : (
            <VolumeMute color={"#ffffff"} width={`20px`} height={`20px`} />
          )}
        </button>

        <input
          type="range"
          min="0"
          max="100"
          value={volumeInputState}
          onChange={(e) => setVolumeInputState(Number(e.target.value))}
          className={`range range-primary range-xs`}
        />
      </div>

      {/* Shuffle */}
      <button
        onClick={async () =>
          !user
            ? handleLoginAlert()
            : await handleToggleShuffleMode(!shuffleState)
        }
        disabled={!playback}
        className={`btn btn-square btn-ghost no-animation btn-sm !bg-transparent`}
      >
        <Shuffle
          color={shuffleState ? "#ff6337" : "#ffffff"}
          width={`20px`}
          height={`20px`}
        />
      </button>

      {/* Repeat */}
      <button
        onClick={async () =>
          !user ? handleLoginAlert() : await handleRepeatStateChange()
        }
        disabled={!playback}
        className={`btn btn-square btn-ghost no-animation btn-sm relative !bg-transparent`}
      >
        <Repeat
          color={repeatState !== 0 ? "#ff6337" : "#ffffff"}
          width={`20px`}
          height={`20px`}
        />

        {repeatState === 2 && (
          <span
            className={`absolute -top-2 left-1/2 block aspect-square w-4 -translate-x-1/2 rounded-full text-xs font-medium text-primary`}
          >
            1
          </span>
        )}
      </button>
    </div>
  );
}
