import Link from "next/link";
import Logo from "../Layout/Logo";

export default function LoginWarning({ onLogin }) {
  return (
    <dialog
      id="loginWarning"
      className="modal backdrop:bg-black backdrop:bg-opacity-90 backdrop:backdrop-blur"
    >
      <div className="modal-box">
        <div className={`flex flex-col items-center gap-4 space-y-4`}>
          <Logo height={70} />
          <h3 className="text-3xl font-bold !mt-0 text-center">Access Restricted</h3>
          <div className={`space-y-4`}>
            <p>
              Only users approved by the site owner can log in to Ryth. If you
              want to access, please contact the site owner via{" "}
              <Link
                href={
                  "mailto:fachrydwiafriza@gmail.com?subject=Request%20Access%20to%20Ryth&body=Hello,%0D%0A%0D%0AMy name: [Your Name]%0D%0AMy email: [Your Email]%0D%0A%0D%0AI would like to request access to Ryth. Thank you!"
                }
                prefetch={false}
                className={`link-primary underline`}
              >
                email
              </Link>{" "}
              and provide your{" "}
              <strong>
                <i>name</i>
              </strong>{" "}
              and{" "}
              <strong>
                <i>email</i>
              </strong>{" "}
              for approval.
            </p>
            <p>
              Additionally, the music player feature is only available for users
              with a{" "}
              <strong>
                <i>Spotify Premium</i>
              </strong>{" "}
              account.
            </p>
            <p>
              In the meantime, feel free to explore a wide range of songs,
              artists, albums, and playlists. You can also tune your songs in
              your own way!
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 xs:flex-row">
            <div className={`flex-1`}>
              <form method="dialog">
                <button
                  type="submit"
                  className="btn btn-neutral w-full rounded-full"
                >
                  Close
                </button>
              </form>
            </div>

            <div className={`flex-1`}>
              <button
                onClick={onLogin}
                className={`btn btn-primary w-full text-pretty rounded-full leading-snug`}
              >
                <span className={`sm:hidden`}>I&apos;m Approved</span>
                <span className={`hidden sm:inline`}>
                  I&apos;m Approved, Let&apos;s Go!
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
