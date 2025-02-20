import { usePlayback } from "@/zustand/playback";
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
  useErrorState,
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
  useWebPlaybackSDKReady,
} from "react-spotify-web-playback-sdk";
import { Slider } from "@mui/material";
import axios from "axios";

export default function PlaybackOptions() {
  const { volume, setVolume, handleSetVolume, handleMouseWheelChangeVolume } =
    usePlayback();

  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
  const playback = usePlaybackState();
  const error = useErrorState();

  // State
  const [shuffleState, setShuffleState] = useState(false);
  const [repeatState, setRepeatState] = useState(0);

  // Ref
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (playback) {
      // setVolume(playback ? device.volume_percent : 100);
      setShuffleState(playback.shuffle);
      setRepeatState(playback.repeat_mode);
    }
  }, [playback]);

  const availableRepeatStates = [
    { state: "off" },
    { state: "context" },
    { state: "track" },
  ];

  // Toggle Shuffle Mode
  const handleToggleShuffleMode = async (shuffle_state) => {
    await axios.request({
      method: "PUT",
      url: `/me/player/shuffle`,
      params: { state: shuffle_state, device_id: device.device_id },
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
      const response = await axios.request({
        method: "PUT",
        url: `/me/player/repeat`,
        params: { state: selectedState, device_id: device.device_id },
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
    <div className={`flex flex-nowrap items-center justify-end`}>
      {/* Volume */}
      <div
        className={`mr-4 flex max-w-[150px] flex-grow items-center justify-end gap-2`}
      >
        <button
          onClick={() =>
            volume === 0
              ? handleSetVolume(100, playback, device)
              : handleSetVolume(0, playback, device)
          }
          disabled={!playback}
          className={`btn btn-square btn-ghost no-animation btn-sm !bg-transparent`}
        >
          {/* Volume Icon */}
          {volume >= 75 ? (
            <VolumeHigh color={"#ffffff"} width={`20px`} height={`20px`} />
          ) : volume < 75 && volume >= 50 ? (
            <VolumeMedium color={"#ffffff"} width={`20px`} height={`20px`} />
          ) : volume < 50 && volume > 0 ? (
            <VolumeLow color={"#ffffff"} width={`20px`} height={`20px`} />
          ) : (
            <VolumeMute color={"#ffffff"} width={`20px`} height={`20px`} />
          )}
        </button>

        <div className={`flex flex-grow items-center`}>
          <Slider
            aria-label="volume"
            size="small"
            value={volume}
            min={0}
            step={1}
            max={100}
            onChange={(_, value) => setVolume(value)}
            onChangeCommitted={(_, value) =>
              handleSetVolume(value, playback, device)
            }
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            className={`!py-2`}
            disabled={!playback}
            onWheel={(event) =>
              handleMouseWheelChangeVolume(
                event,
                volume,
                playback,
                device,
                timeoutRef,
              )
            }
            sx={(t) => ({
              color: "#ff6337",
              height: 4,
              "&:hover": {
                "& .MuiSlider-thumb": {
                  width: 16,
                  height: 16,
                },
              },
              "& .MuiSlider-track": {
                border: "none",
              },
              "& .MuiSlider-thumb": {
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                width: 0,
                height: 0,
                backgroundColor: "#ff6337",
                "&::before": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  boxShadow: "none",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#fff",
                },
                "&.Mui-active": {
                  width: 16,
                  height: 16,
                },
              },
              "& .MuiSlider-rail": {
                opacity: 1,
                background: "#282828",
              },
              "& .MuiSlider-valueLabel": {
                background: "#050505",
              },
            })}
          />
        </div>
      </div>

      {/* Shuffle */}
      <button
        onClick={() =>
          error ? setErrorAlert(error) : handleToggleShuffleMode(!shuffleState)
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
        onClick={() =>
          error ? setErrorAlert(error) : handleRepeatStateChange()
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
