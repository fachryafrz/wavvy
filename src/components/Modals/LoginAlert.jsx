"use client";

import LoginBanner from "../Layout/LoginBanner";

export default function LoginAlert() {
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
        <div className="modal-box p-0 max-w-lg">
          <LoginBanner />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
