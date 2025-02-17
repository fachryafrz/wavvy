"use client";

import { useRouter } from "next/navigation";
import pluralize from "pluralize";
import { useEffect, useState } from "react";

export default function RetryAfter({ retryAfter }) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(Number(retryAfter) || 0);

  const handleClose = () => {
    document.getElementById("retryAfter").close();
    router.replace("/");
  };

  useEffect(() => {
    if (!retryAfter) return;

    const dialog = document.getElementById("retryAfter");
    if (dialog) dialog.showModal();

    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0,
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [retryAfter]);

  // Fungsi untuk mengonversi detik ke jam, menit, dan detik
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${pluralize("hour", hours, true)} ${pluralize("minute", minutes, true)} ${pluralize("second", secs, true)}`;
  };

  return (
    <dialog
      id="retryAfter"
      className="modal backdrop:bg-black backdrop:bg-opacity-90 backdrop:backdrop-blur"
    >
      <div className="modal-box max-w-md p-0">
        <div
          className={`rounded-xl bg-gradient-to-tl from-[#3E2532] via-[#24202B] via-60% to-[#24202B] p-6 @container`}
        >
          <div
            className={`flex flex-col justify-between gap-6 @lg:flex-row @lg:items-center`}
          >
            <div className={`flex flex-col gap-2`}>
              <h2 className={`text-pretty text-xl font-medium @sm:text-2xl`}>
                Sorry you can&apos;t access this page
              </h2>

              <p className={`text-pretty text-sm font-medium text-neutral-500`}>
                We are currently having trouble. <br /> Please try again after{" "}
                {formatDuration(countdown)}.
              </p>

              <div className={`mt-4`}>
                <button
                  onClick={handleClose}
                  className={`btn btn-primary rounded-full`}
                >
                  Go home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
