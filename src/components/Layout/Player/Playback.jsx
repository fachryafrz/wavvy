import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  PauseCircle,
  PlayCircle,
  PlaySkipBack,
  PlaySkipForward,
} from "react-ionicons";
import axios from "axios";

export default function Playback({ track, isLoading }) {
  const [currentProgress, setCurrentProgress] = useState(
    track ? track.progress_ms : 0,
  );

  useEffect(() => {
    let interval;

    // if (track?.is_playing) {
    //   interval = setInterval(() => {
    //     if (track?.progress_ms !== undefined) {
    //       setCurrentProgress((prevProgress) => prevProgress + 1000);
    //     }
    //   }, 1000);
    // }

    return () => {
      clearInterval(interval);
    };
  }, [track?.is_playing, track?.progress_ms]);

  const convertProgress = (progress) => {
    const minutes = moment(progress).format("m");
    const seconds = moment(progress).format("ss");

    return `${minutes}:${seconds}`;
  };

  const calculateProgressPercentage = (progress, duration) => {
    return (progress / duration) * 100;
  };

  const handlePrevious = async () => {
    try {
      await axios.post(
        `/api/me/player/previous`,
        {},
        { params: { device_id: "b9b1c1e1e0c1b1a1" } },
      );
    } catch (error) {
      if (error.status === 403) {
        handleAlert();
      }
    }
  };

  const handleNext = async () => {
    try {
      await axios.post(
        `/api/me/player/next`,
        {},
        { params: { device_id: "b9b1c1e1e0c1b1a1" } },
      );
    } catch (error) {
      if (error.status === 403) {
        handleAlert();
      }
    }
  };

  const handleStartResumePlayback = async () => {
    try {
      await axios.put(`/api/me/player/play`, {
        context_uri: `spotify:album:2u4Yp2ADTKYPwFSBFL4ffa`,
        // uris: [
        //   "spotify:track:0z8hI3OPS8ADPWtoCjjLl6",
        //   "spotify:track:1301WleyT98MSxVHPZCA6M",
        // ],
        // offset: {
        //   position: 5,
        // },
        position_ms: 0,
      });
    } catch (error) {
      if (error.status === 403) {
        handleAlert();
      }
    }
  };

  const handleAlert = () => {
    document.getElementById("premiumAlert").showModal();
  };

  return (
    <div className={`flex flex-col items-center justify-center sm:flex-row`}>
      <div className={`flex items-center justify-center`}>
        {/* Previous */}
        <button
          onClick={handlePrevious}
          className={`btn btn-square btn-ghost btn-sm !bg-transparent`}
        >
          <PlaySkipBack color={"#ffffff"} width={`20px`} height={`20px`} />
        </button>

        {/* Play/Pause */}
        <button
          onClick={handleStartResumePlayback}
          className={`btn btn-square btn-ghost !bg-transparent`}
        >
          {track?.is_playing ? (
            <PauseCircle color={"#ffffff"} width={`40px`} height={`40px`} />
          ) : (
            <PlayCircle color={"#ffffff"} width={`40px`} height={`40px`} />
          )}
        </button>

        {/* Next */}
        <button
          onClick={handleNext}
          className={`btn btn-square btn-ghost btn-sm !bg-transparent`}
        >
          <PlaySkipForward color={"#ffffff"} width={`20px`} height={`20px`} />
        </button>
      </div>

      {/* Progress */}
      <div className={`flex items-center gap-4 sm:ml-4 sm:w-full`}>
        {/* Progress Bar */}
        <div
          className={`hidden h-1 w-full rounded-full bg-neutral-600 sm:block`}
        >
          <div
            className={`h-full rounded-full bg-primary`}
            style={{
              width: `${calculateProgressPercentage(currentProgress, track?.item?.duration_ms || 1)}%`,
            }}
          ></div>
        </div>

        {/* Minutes */}
        <span className={`text-xs font-medium text-neutral-500`}>
          {`${convertProgress(currentProgress)}/${convertProgress(track?.item?.duration_ms || 0)}`}
        </span>
      </div>
    </div>
  );
}
