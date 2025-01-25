import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Close, Search } from "react-ionicons";
import Typewriter from "typewriter-effect";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchRef = useRef();

  const [origin, page, query, type] = pathname.split("/");

  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!input) return;

    const trimmed = input.trim();

    if (type) {
      router.push(`/search/${trimmed}/${type}`);
    } else {
      router.push(`/search/${trimmed}`);
    }

    searchRef.current.blur();
  };

  useEffect(() => {
    if (page === "search" && query) {
      setInput(decodeURIComponent(query).replace(/\+/g, " "));
    }
  }, [page, query]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "/") {
        if (document.activeElement !== searchRef.current) {
          event.preventDefault();
          searchRef.current.focus();
        }
      }

      if (event.key === "Escape") {
        if (document.activeElement === searchRef.current) {
          searchRef.current.blur();
        }
      }

      if (event.defaultPrevented) {
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <form
      onSubmit={handleSearch}
      className={`flex-grow md:w-96 md:flex-grow-0`}
    >
      <label className="input input-bordered flex items-center rounded-full border-0 bg-neutral">
        <div className={`pointer-events-none`}>
          <Search color={"#6f6f6f"} />
        </div>

        <input
          type="text"
          ref={searchRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-sm w-full grow font-medium placeholder:font-medium placeholder:text-[#6f6f6f] placeholder:opacity-100 placeholder:sm:opacity-0"
          placeholder="Search"
        />

        {!input && (
          <div
            className={`pointer-events-none absolute ml-[2.15rem] hidden h-full items-center text-sm font-medium text-[#6f6f6f] sm:flex`}
          >
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("What do you want to listen?")
                  .pauseFor(5e3)
                  .deleteAll()
                  .typeString("Search for a song, artist, album or playlist")
                  .pauseFor(5e3)
                  .deleteAll()
                  .typeString("Type / to search")
                  .pauseFor(10e3)
                  .deleteAll()
                  .start();
              }}
              options={{
                cursor: "",
                loop: true,
                delay: 50,
              }}
            />
          </div>
        )}

        {input && (
          <button type="button" onClick={() => setInput("")}>
            <Close color={"#fff"} />
          </button>
        )}
      </label>
    </form>
  );
}
