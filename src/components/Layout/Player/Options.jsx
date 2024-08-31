import axios from "axios";
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

export default function PlaybackOptions({ track, isLoading }) {
  const [volumeState, setVolumeState] = useState(
    track?.device?.volume_percent ?? 100,
  );
  const [shuffleState, setShuffleState] = useState(
    track?.shuffle_state ?? false,
  );
  const [repeatState, setRepeatState] = useState(track?.repeat_state ?? "off");

  const handleAlert = () => {
    document.getElementById("premiumAlert").showModal();
  };

  const availableRepeatStates = [
    { state: "off" },
    { state: "context" },
    { state: "track" },
  ];

  const handleVolumeChange = (volume_percent) => {
    setVolumeState(volume_percent);
  };
  const handleShuffleStateChange = () => {
    setShuffleState(!shuffleState);
  };
  const handleRepeatStateChange = () => {
    const currentIndex = availableRepeatStates.findIndex(
      (state) => state.state === repeatState,
    );

    if (currentIndex === availableRepeatStates.length - 1) {
      setRepeatState(availableRepeatStates[0].state);
    } else {
      setRepeatState(availableRepeatStates[currentIndex + 1].state);
    }
  };

  useEffect(() => {
    const handleSetVolume = async () => {
      try {
        await axios.put(
          `/api/me/player/volume`,
          {},
          {
            params: {
              volume_percent: volumeState,
              device_id: "b9b1c1e1e0c1b1a1",
            },
          },
        );
      } catch (error) {
        if (error.status === 403) {
          handleAlert();
          setVolumeState(100);
        }
      }
    };

    if (track?.device?.volume_percent) {
      handleSetVolume();
    }
  }, [track?.device?.volume_percent, volumeState]);
  useEffect(() => {
    const handleToggleShuffleMode = async () => {
      try {
        await axios.put(
          `/api/me/player/shuffle`,
          {},
          { params: { state: shuffleState, device_id: "b9b1c1e1e0c1b1a1" } },
        );
      } catch (error) {
        if (error.status === 403) {
          handleAlert();
          setShuffleState(false);
        }
      }
    };

    if (track?.repeat_state) {
      handleToggleShuffleMode();
    }
  }, [track?.repeat_state, shuffleState]);
  useEffect(() => {
    const handleSetRepeatMode = async () => {
      try {
        await axios.put(
          `/api/me/player/repeat`,
          {},
          { params: { state: repeatState, device_id: "b9b1c1e1e0c1b1a1" } },
        );
      } catch (error) {
        if (error.status === 403) {
          handleAlert();
          setRepeatState("off");
        }
      }
    };

    if (track?.shuffle_state) {
      handleSetRepeatMode();
    }
  }, [track?.shuffle_state, repeatState]);

  return (
    <div className={`flex flex-wrap items-center justify-end lg:flex-nowrap`}>
      {/* Volume */}
      <div className={`mr-4 hidden items-center lg:flex`}>
        <button
          onClick={() =>
            volumeState === 0 ? handleVolumeChange(100) : handleVolumeChange(0)
          }
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
        onClick={handleShuffleStateChange}
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
        onClick={handleRepeatStateChange}
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
