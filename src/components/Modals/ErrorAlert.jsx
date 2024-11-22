"use client";

import { useErrorAlert } from "@/zustand/error-alert";
import { useEffect, useState } from "react";

export default function ErrorAlert() {
  const { errorAlert, setErrorAlert } = useErrorAlert();

  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => setErrorAlert(null);

  useEffect(() => {
    if (!errorAlert) return;

    switch (errorAlert.type) {
      case "account_error":
        // setErrorTitle("Account Error");
        // setErrorMessage("There was a problem with your account.");
        document.getElementById("premiumAlert").showModal();
        break;
      case "authentication_error":
        document.getElementById("loginAlert").showModal();
        break;
      case "initialization_error":
        setErrorTitle("Initialization Error");
        setErrorMessage(
          "There was a problem initializing the app. This is likely because your browser does not support EME protection which is required to play music.",
        );
        document.getElementById("errorAlert").showModal();
        break;
      case "playback_error":
        setErrorTitle("Playback Error");
        setErrorMessage(
          "There was a problem loading and/or playing the song. Please try again later.",
        );
        document.getElementById("errorAlert").showModal();
        break;
    }
  }, [errorAlert]);

  return (
    <dialog
      id="errorAlert"
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
                {errorTitle}
              </h2>

              <p className={`text-pretty text-sm font-medium text-neutral-500`}>
                {errorMessage}
              </p>

              <div className={`mt-4`}>
                <button
                  onClick={() => window.location.reload()}
                  className={`btn btn-primary rounded-full`}
                >
                  Refresh
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
