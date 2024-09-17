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

export default function PlaybackOptions({ isLoading }) {
  const { user } = useAuth();
  const router = useRouter();
  const { mutate } = useAuth();
  const { playback, setPlayback } = usePlayback();
  const queryClient = useQueryClient();
  const { handleError } = useHandleError();

  const {
    data: playbackData,
    error: playbackError,
    refetch: fetchPlayback,
  } = useQuery({
    queryKey: `/api/me/player`,
    queryFn: async ({ queryKey }) => {
      return await axios
        .get(queryKey)
        .then(({ data }) => data)
        .catch(handleError);
    },
    enabled: false,
  });

  const [volumeState, setVolumeState] = useState(100);
  const [shuffleState, setShuffleState] = useState(false);
  const [repeatState, setRepeatState] = useState("off");

  useEffect(() => {
    setVolumeState(playback ? playback.device.volume_percent : 100);
    setShuffleState(playback ? playback.shuffle_state : false);
    setRepeatState(playback ? playback.repeat_state : "off");
  }, [playback]);

  const availableRepeatStates = [
    { state: "off" },
    { state: "context" },
    { state: "track" },
  ];

  // Set Volume
  const handleSetVolume = async (volume_percent) => {
    try {
      await axios.put(
        `/api/me/player/volume`,
        {},
        {
          params: {
            volume_percent: volume_percent,
            device_id: playback?.device.id,
          },
        },
      );

      setVolumeState(volume_percent);

      fetchPlayback();
    } catch (error) {
      handleError(error);
      setVolumeState(volumeState);
    }
  };

  // Toggle Shuffle Mode
  const handleToggleShuffleMode = async (shuffle_state) => {
    try {
      await axios.put(
        `/api/me/player/shuffle`,
        {},
        { params: { state: shuffle_state, device_id: playback?.device.id } },
      );

      setShuffleState(shuffle_state);

      fetchPlayback();
    } catch (error) {
      handleError(error);
      setShuffleState(shuffleState);
    }
  };

  // Change Repeat State
  const handleRepeatStateChange = (repeat_state) => {
    const currentIndex = availableRepeatStates.findIndex(
      (state) => state.state === repeat_state,
    );

    if (currentIndex === availableRepeatStates.length - 1) {
      handleSetRepeatMode(availableRepeatStates[0].state);
    } else {
      handleSetRepeatMode(availableRepeatStates[currentIndex + 1].state);
    }
  };
  const handleSetRepeatMode = async (repeat_state) => {
    try {
      await axios.put(
        `/api/me/player/repeat`,
        {},
        { params: { state: repeat_state, device_id: playback?.device.id } },
      );

      setRepeatState(repeat_state);

      fetchPlayback();
    } catch (error) {
      handleError(error);
      setRepeatState(repeatState);
    }
  };

  return (
    <div className={`flex flex-wrap items-center justify-end lg:flex-nowrap`}>
      {/* Volume */}
      <div className={`mr-4 hidden items-center lg:flex`}>
        <button
          onClick={() =>
            volumeState === 0 ? handleSetVolume(100) : handleSetVolume(0)
          }
          disabled={!user}
          className={`btn btn-square btn-ghost no-animation btn-sm !bg-transparent`}
        >
          {/* Volume Icon */}
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
        </button>

        <div className={`h-1 w-24 rounded-full bg-neutral-600`}>
          <div
            className={`h-full w-1/4 rounded-full bg-primary`}
            style={{ width: `${volumeState}%` }}
          ></div>
        </div>
      </div>

      {/* Shuffle */}
      <button
        onClick={() => handleToggleShuffleMode(!shuffleState)}
        disabled={!user}
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
        onClick={() => handleRepeatStateChange(repeatState)}
        disabled={!user}
        className={`btn btn-square btn-ghost no-animation btn-sm relative !bg-transparent`}
      >
        <Repeat
          color={repeatState !== "off" ? "#ff6337" : "#ffffff"}
          width={`20px`}
          height={`20px`}
        />

        {repeatState === "track" && (
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
