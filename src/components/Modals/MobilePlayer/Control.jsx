import { useAuth } from "@/hooks/auth";
import { fetchData, playSong } from "@/server/actions";
import { useErrorAlert } from "@/zustand/error-alert";
import { usePlayback } from "@/zustand/playback";
import { Slider } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  PauseCircle,
  PlayBack,
  PlayCircle,
  PlayForward,
  PlaySkipBack,
  PlaySkipForward,
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

export default function Control() {
  // Hooks
  const { user } = useAuth();
  const {
    track,
    volume,
    setVolume,
    handleSetVolume,
    handleMouseWheelChangeVolume,
  } = usePlayback();
  const { setErrorAlert } = useErrorAlert();
  const webPlaybackSDKReady = useWebPlaybackSDKReady();
  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
  const playback = usePlaybackState();
  const error = useErrorState();

  // State
  const [currentProgress, setCurrentProgress] = useState(0);
  const [durationMs, setDurationMs] = useState(0);
  const [shuffleState, setShuffleState] = useState(false);
  const [repeatState, setRepeatState] = useState(0);

  // Ref
  const endMinutes = durationMs - currentProgress || track?.duration_ms;

  // Functions
  const handleLoginAlert = () => {
    document.getElementById(`loginAlert`).showModal();
  };
  const convertProgress = (progress) => {
    if (!user) return "0:00";

    const minutes = moment(progress).format("m");
    const seconds = moment(progress).format("ss");

    return `${minutes}:${seconds}`;
  };

  // Toggle Shuffle Mode
  const handleToggleShuffleMode = async (shuffle_state) => {
    await fetchData(`/me/player/shuffle`, {
      method: "PUT",
      params: { state: shuffle_state, device_id: device.id },
    });

    setShuffleState(shuffle_state);
  };

  // Change Repeat State
  const handleRepeatStateChange = async () => {
    const nextState = (repeatState + 1) % 3; // Perubahan mode: 0 -> 1 -> 2 -> 0
    handleSetRepeatMode(nextState);
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

  // Lifecycle
  useEffect(() => {
    setCurrentProgress(playback ? playback.position : 0);
    setDurationMs(playback ? playback.duration : 0);
    setShuffleState(playback ? playback.shuffle : false);
    setRepeatState(playback ? playback.repeat_mode : 0);
  }, [playback]);

  useEffect(() => {
    let interval;

    if (!playback?.paused) {
      interval = setInterval(() => {
        if (playback?.position !== undefined) {
          setCurrentProgress((prevProgress) => prevProgress + 1000);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [playback?.paused, playback?.position]);

  return (
    <div className={`space-y-8`}>
      {/* Duration */}
      <div>
        <div className={`flex justify-between`}>
          {/* Start Minutes */}
          <span className={`min-w-10 text-sm font-medium text-neutral-500`}>
            {convertProgress(currentProgress)}
          </span>

          {/* End Minutes */}
          <span
            className={`min-w-10 text-end text-sm font-medium text-neutral-500`}
          >
            {`-${convertProgress(endMinutes)}`}
          </span>
        </div>

        <Slider
          aria-label="time-indicator"
          size="small"
          value={currentProgress}
          min={0}
          step={1}
          max={durationMs}
          onChange={(_, value) => setCurrentProgress(value)}
          onChangeCommitted={(_, value) => player.seek(value)}
          valueLabelDisplay={"off"}
          valueLabelFormat={(value) => convertProgress(value)}
          disabled={!playback}
          className={`!py-2`}
          sx={(t) => ({
            color: "#ff6337",
            height: 4,
            "&:hover": {
              "& .MuiSlider-thumb": {
                width: 8,
                height: 8,
              },
            },
            "& .MuiSlider-thumb": {
              width: 0,
              height: 0,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&::before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${"#ff633729"}`,
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
              "&:after": {
                display: "none",
              },
            },
            "& .MuiSlider-rail": {
              opacity: 1,
              background: "#282828",
            },
            "& .MuiSlider-valueLabel": {
              background: "#161616",
            },
          })}
        />
      </div>

      {/* Controls */}
      <div className={`flex items-center justify-evenly`}>
        {/* Previous */}
        <button
          onClick={() =>
            error
              ? setErrorAlert(error)
              : playback
                ? player.previousTrack()
                : null
          }
          disabled={!playback}
        >
          <PlaySkipBack color={"#ffffff"} height="32px" width="32px" />
        </button>

        {/* Play Back */}
        <button
          onClick={() =>
            error
              ? setErrorAlert(error)
              : playback
                ? player.seek(currentProgress - 1e4)
                : null
          }
          disabled={!playback}
        >
          <PlayBack color={"#ffffff"} height="32px" width="32px" />
        </button>

        {/* Play/Pause */}
        <button
          onClick={() =>
            error
              ? setErrorAlert(error)
              : playback
                ? playback.paused
                  ? player.resume()
                  : player.pause()
                : playSong({ user, device, uri: track?.uri })
          }
          disabled={!webPlaybackSDKReady}
        >
          {!playback || playback?.paused ? (
            <PlayCircle color={"#ffffff"} height="72px" width="72px" />
          ) : (
            <PauseCircle color={"#ffffff"} width={`72px`} height={`72px`} />
          )}
        </button>

        {/* Play Forward */}
        <button
          onClick={() =>
            error
              ? setErrorAlert(error)
              : playback
                ? player.seek(currentProgress + 1e4)
                : null
          }
          disabled={!playback}
        >
          <PlayForward color={"#ffffff"} height="32px" width="32px" />
        </button>

        {/* Next */}
        <button
          onClick={() =>
            error ? setErrorAlert(error) : playback ? player.nextTrack() : null
          }
          disabled={!playback}
        >
          <PlaySkipForward color={"#ffffff"} height="32px" width="32px" />
        </button>
      </div>

      {/* Volume, Shuffle, Repeat */}
      <div className={`flex items-center justify-between gap-4`}>
        {/* Volume */}
        <div className={`flex flex-grow items-center gap-2`}>
          <button
            onClick={() =>
              volume === 0
                ? handleSetVolume(100, playback, device)
                : handleSetVolume(0)
            }
            disabled={!playback}
            className={`btn btn-square btn-ghost no-animation btn-sm !bg-transparent`}
          >
            {/* Volume Icon */}
            {volume >= 75 ? (
              <VolumeHigh color={"#ffffff"} width={`32px`} height={`32px`} />
            ) : volume < 75 && volume >= 50 ? (
              <VolumeMedium color={"#ffffff"} width={`32px`} height={`32px`} />
            ) : volume < 50 && volume >= 25 ? (
              <VolumeLow color={"#ffffff"} width={`32px`} height={`32px`} />
            ) : volume < 25 && volume > 0 ? (
              <VolumeOff color={"#ffffff"} width={`32px`} height={`32px`} />
            ) : (
              <VolumeMute color={"#ffffff"} width={`32px`} height={`32px`} />
            )}
          </button>

          <div className={`flex max-w-[150px] flex-grow items-center`}>
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
                handleMouseWheelChangeVolume(event, volume, playback, device)
              }
              sx={(t) => ({
                color: "#ff6337",
                height: 2,
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
            error
              ? setErrorAlert(error)
              : handleToggleShuffleMode(!shuffleState)
          }
          disabled={!playback}
          className={`btn btn-square btn-ghost no-animation btn-sm !bg-transparent`}
        >
          <Shuffle
            color={shuffleState ? "#ff6337" : "#ffffff"}
            width={`32px`}
            height={`32px`}
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
            width={`32px`}
            height={`32px`}
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
    </div>
  );
}
