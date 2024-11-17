import { useHandleError } from "@/hooks/error";
import { useAuth } from "@/hooks/auth";
import { usePlayback } from "@/zustand/playback";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
} from "react-spotify-web-playback-sdk";
import { fetchData } from "@/server/actions";

export default function PlaybackOptions({ track }) {
  const { user } = useAuth();
  const router = useRouter();
  const { mutate } = useAuth();
  // const { playback, setPlayback } = usePlayback();
  const queryClient = useQueryClient();
  const { handleError } = useHandleError();

  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
  const playback = usePlaybackState();


  // const [volumeState, setVolumeState] = useState(100);
  const [shuffleState, setShuffleState] = useState(false);
  const [repeatState, setRepeatState] = useState(0);

  useEffect(() => {
    if (playback) {
      // setVolumeState(playback ? playback.device.volume_percent : 100);
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
  // const handleSetVolume = async (volume_percent) => {
  //   try {
  //     await axios.put(
  //       `/api/me/player/volume`,
  //       {},
  //       {
  //         params: {
  //           volume_percent: volume_percent,
  //           device_id: playback?.device.id,
  //         },
  //       },
  //     );

  //     setVolumeState(volume_percent);

  //     fetchPlayback();
  //   } catch (error) {
  //     handleError(error);
  //     setVolumeState(volumeState);
  //   }
  // };

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

  return (
    <div className={`flex flex-wrap items-center justify-end lg:flex-nowrap`}>
      {/* Volume */}
      <div className={`mr-4 hidden items-center lg:flex`}>
        {/* <button
          onClick={() =>
            !user
              ? handleLoginAlert()
              : volumeState === 0
                ? handleSetVolume(100)
                : handleSetVolume(0)
          }
          className={`btn btn-square btn-ghost no-animation btn-sm !bg-transparent`}
        >
          Volume Icon
          {volumeState >= 75 ? (
            <VolumeHigh color={"#ffffff"} width={`20px`} height={`20px`} />
          ) : volumeState < 75 && volumeState >= 50 ? (
            <VolumeMedium color={"#ffffff"} width={`20px`} height={`20px`} />
          ) : volumeState < 50 && volumeState >= 25 ? (
            <VolumeLow color={"#ffffff"} width={`20px`} height={`20px`} />
          ) : volumeState < 25 && volumeState > 0 ? (
            <VolumeOff color={"#ffffff"} width={`20px`} height={`20px`} />
          ) : (
            <VolumeMute color={"#ffffff"} width={`20px`} height={`20px`} />
          )}
        </button> */}

        {/* <div className={`h-1 w-24 rounded-full bg-neutral-600`}>
          <div
            className={`h-full w-1/4 rounded-full bg-primary`}
            style={{ width: `${volumeState}%` }}
          ></div>
        </div> */}
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
