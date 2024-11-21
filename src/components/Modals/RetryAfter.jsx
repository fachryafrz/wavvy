"use client";

import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RetryAfter({ retryAfter }) {
  const router = useRouter();

  const handleClose = () => {
    document.getElementById("retryAfter").close();
    router.push("/");
  };

  const [countdown, setCountdown] = useState(retryAfter ? retryAfter : 0);

  useEffect(() => {
    if (!retryAfter) return;
    document.getElementById("retryAfter").showModal();
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0,
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, [retryAfter]);

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
                There was a problem with your request. Please try again after{" "}
                {moment(countdown * 1000).format("mm [minutes] ss [seconds]")}.
              </p>

              <div className={`mt-4`}>
                <button
                  onClick={handleClose}
                  className={`btn btn-primary rounded-full`}
                >
                  Go to Feed
                </button>
              </div>
            </div>
          </div>

          {/* Image of Ryth when Logged In (Coming Soon) */}
          {/* <figure></figure> */}
        </div>
      </div>
      <form method="dialog" onSubmit={handleClose} className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
