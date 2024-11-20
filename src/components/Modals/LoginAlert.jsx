"use client";

import { useErrorAlert } from "@/zustand/error-alert";
import LoginBanner from "../Layout/LoginBanner";

export default function LoginAlert() {
  const { setErrorAlert } = useErrorAlert();

  const handleClose = () => setErrorAlert(null);

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById("loginAlert").showModal()}
      >
        open modal
      </button> */}
      <dialog
        id="loginAlert"
        className="modal backdrop:bg-black backdrop:bg-opacity-90 backdrop:backdrop-blur"
      >
        <div className="modal-box max-w-lg p-0">
          <LoginBanner />
        </div>
        <form method="dialog" onSubmit={handleClose} className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
