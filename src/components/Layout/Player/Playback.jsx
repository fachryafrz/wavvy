import { useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  PauseCircle,
  PlayBack,
  PlayCircle,
  PlayForward,
  PlaySkipBack,
  PlaySkipForward,
} from "react-ionicons";
import { useHandleError } from "@/hooks/error";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import {
  useErrorState,
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";
import { fetchData } from "@/server/actions";
import { playSong } from "@/lib/play-song";
import Slider from "@mui/material/Slider";

export default function Playback({ track, isMobile }) {
  const { user } = useAuth();
  const router = useRouter();

  const { mutate } = useAuth();
  // const { playback, setPlayback } = usePlayback();

  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
  const playback = usePlaybackState();
  const error = useErrorState();

  // State
  const [currentProgress, setCurrentProgress] = useState(0);
  const [durationMs, setDurationMs] = useState(0);

  // Ref
  const previousSongRef = useRef(null);
  const playBackRef = useRef(null);
  const playPauseRef = useRef(null);
  const playForwardRef = useRef(null);
  const nextSongRef = useRef(null);
  const endMinutes = durationMs - currentProgress || track?.duration_ms;

  useEffect(() => {
    setCurrentProgress(playback ? playback.position : 0);
    setDurationMs(playback ? playback.duration : 0);
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

  const convertProgress = (progress) => {
    if (!user) return "0:00";

    const minutes = moment(progress).format("m");
    const seconds = moment(progress).format("ss");

    return `${minutes}:${seconds}`;
  };

  const calculateProgressPercentage = (progress, duration) => {
    if (!user) return 0;
    return (progress / duration) * 100;
  };

  const { handleError } = useHandleError();

  // Login Alert
  const handleLoginAlert = () => {
    document.getElementById(`loginAlert`).showModal();
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === " " && document.activeElement.tagName !== "INPUT") {
        event.preventDefault();
        playPauseRef.current.click();
      }

      // NOTE: Shortcut for Previous and Next song (Currently not working)
      // if (event.key === "Shift" && event.key === "n") {
      //   nextSongRef.current.click();
      // }

      // if (event.key === "Shift" && event.key === "p") {
      //   previousSongRef.current.click();
      // }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className={`flex flex-col items-end justify-center sm:items-center`}>
      <div className={`flex items-end justify-between lg:w-full`}>
        {/* Start Minutes */}
        <span
          className={`hidden min-w-10 text-xs font-medium text-neutral-500 lg:inline`}
        >
          {convertProgress(currentProgress)}
        </span>

        {/* Playback */}
        <div className={`flex items-center justify-center`}>
          {/* Previous */}
          <button
            ref={previousSongRef}
            onClick={async () =>
              !user
                ? handleLoginAlert()
                : error
                  ? document.getElementById("premiumAlert").showModal()
                  : playback
                    ? await player.previousTrack()
                    : null
            }
            className={`btn btn-square btn-ghost btn-sm !bg-transparent`}
          >
            <PlaySkipBack color={"#ffffff"} width={`20px`} height={`20px`} />
          </button>

          {/* Play Back */}
          <button
            onClick={async () =>
              !user
                ? handleLoginAlert()
                : error
                  ? document.getElementById("premiumAlert").showModal()
                  : playback
                    ? await player.seek(currentProgress - 1e4)
                    : null
            }
            className={`btn btn-square btn-ghost btn-sm hidden !bg-transparent sm:inline-flex`}
          >
            <PlayBack color={"#ffffff"} width={`20px`} height={`20px`} />
          </button>

          {/* Play/Pause */}
          <button
            ref={playPauseRef}
            onClick={async () =>
              error
                ? document.getElementById("premiumAlert").showModal()
                : playback
                  ? playback.paused
                    ? await player.resume()
                    : await player.pause()
                  : playSong(user, device, track?.uri)
            }
            className={`btn btn-square btn-ghost !bg-transparent`}
          >
            {!playback || playback?.paused ? (
              <PlayCircle color={"#ffffff"} width={`40px`} height={`40px`} />
            ) : (
              <PauseCircle color={"#ffffff"} width={`40px`} height={`40px`} />
            )}
          </button>

          {/* Play Forward */}
          <button
            onClick={async () =>
              !user
                ? handleLoginAlert()
                : error
                  ? document.getElementById("premiumAlert").showModal()
                  : playback
                    ? await player.seek(currentProgress + 1e4)
                    : null
            }
            className={`btn btn-square btn-ghost btn-sm hidden !bg-transparent sm:inline-flex`}
          >
            <PlayForward color={"#ffffff"} width={`20px`} height={`20px`} />
          </button>

          {/* Next */}
          <button
            ref={nextSongRef}
            onClick={async () =>
              !user
                ? handleLoginAlert()
                : error
                  ? document.getElementById("premiumAlert").showModal()
                  : playback
                    ? await player.nextTrack()
                    : null
            }
            className={`btn btn-square btn-ghost btn-sm !bg-transparent`}
          >
            <PlaySkipForward color={"#ffffff"} width={`20px`} height={`20px`} />
          </button>
        </div>

        {/* End Minutes */}
        <span
          className={`hidden min-w-10 text-end text-xs font-medium text-neutral-500 lg:inline`}
        >
          {`-${convertProgress(endMinutes)}`}
        </span>
      </div>

      {/* Progress Bar */}
      {/* <div className={`absolute inset-x-0 -top-2 w-full lg:static`}> */}
      <Slider
        aria-label="time-indicator"
        size="small"
        value={currentProgress}
        min={0}
        step={1}
        max={durationMs}
        onChange={(_, value) => setCurrentProgress(value)}
        onChangeCommitted={async (_, value) => await player.seek(value)}
        valueLabelDisplay={isMobile ? "auto" : "off"}
        valueLabelFormat={(value) => convertProgress(value)}
        disabled={!playback}
        className={`!absolute !inset-x-0 !-top-2 !py-2 lg:!relative lg:!top-auto`}
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
      {/* </div> */}
    </div>
  );
}
