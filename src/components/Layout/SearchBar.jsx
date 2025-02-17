import { debounce } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Close, Options, Search } from "react-ionicons";
import Typewriter from "typewriter-effect/dist/core";

export default function SearchBar({
  placeholder = "Type / to search",
  className,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchRef = useRef();

  const DEBOUNCE_DELAY = 300;

  const [origin, page, query, type] = pathname.split("/");

  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const value = e.target.input?.value || e.target.value;

    if (!value) return;

    const trimmed = value.trim().replace(/\s/g, "+");

    if (type) {
      router.push(`/search/${trimmed}/${type}`);
    } else {
      router.push(`/search/${trimmed}`);
    }
  };

  const debounceSearch = useCallback(
    debounce((e) => handleSearch(e), DEBOUNCE_DELAY),
    [],
  );

  useEffect(() => {
    return () => debounceSearch.clear();
  }, []);

  useEffect(() => {
    if (
      page === "search" &&
      query &&
      document.activeElement !== searchRef.current
    ) {
      setInput(query.replace(/\+/g, " "));
    }
  }, [page, query]);

  useEffect(() => {
    let input = searchRef.current;

    const customNodeCreator = (character) => {
      // Add character to input placeholder
      input.placeholder = input.placeholder + character;

      // Return null to skip internal adding of dom node
      return null;
    };

    const onRemoveNode = ({ character }) => {
      if (input.placeholder) {
        // Remove last character from input placeholder
        input.placeholder = input.placeholder.slice(0, -1);
      }
    };

    const typewriter = new Typewriter(null, {
      loop: true,
      delay: 50,
      onCreateTextNode: customNodeCreator,
      onRemoveNode: onRemoveNode,
    });

    typewriter
      .typeString("What do you want to listen?")
      .pauseFor(5e3)
      .deleteAll()
      .typeString("Search for a song, artist, album or playlist")
      .pauseFor(5e3)
      .deleteAll()
      .typeString(placeholder)
      .pauseFor(10e3)
      .deleteAll()
      .start();

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
      onSubmit={(e) => {
        handleSearch(e);
        searchRef.current.blur();
      }}
      className={`flex-grow md:w-96 md:flex-grow-0 ${className}`}
    >
      <label className="input input-bordered relative flex items-center rounded-full border-0 bg-neutral pr-0">
        <div className={`pointer-events-none`}>
          <Search color={"#6f6f6f"} />
        </div>

        <input
          type="text"
          name="input"
          ref={searchRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            debounceSearch(e);
          }}
          className="input-sm w-full grow pr-0 font-medium placeholder:font-medium placeholder:text-[#6f6f6f]"
        />

        {input && (
          <button
            type="button"
            onClick={() => setInput("")}
          >
            <Close color={"#fff"} />
          </button>
        )}

        {pathname !== `/search` && (
          <Link
            href={`/search`}
            className={`btn btn-circle btn-ghost border-0 bg-transparent outline-none`}
          >
            <Options color={`#ffffff`} />
          </Link>
        )}
      </label>
    </form>
  );
}
