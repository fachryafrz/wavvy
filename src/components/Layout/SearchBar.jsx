import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Close, Search } from "react-ionicons";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchRef = useRef();

  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const nativeSearchParams = new URLSearchParams();

    if (input) {
      const trimmed = input.trim();

      nativeSearchParams.set("q", trimmed);
      router.push(`/search/${trimmed}`);

      searchRef.current.blur();
    }
  };

  useEffect(() => {
    const [origin, page, query] = pathname.split("/");

    if (page === "search" && query) {
      setInput(decodeURIComponent(query).replace(/\+/g, " "));
    }
  }, [pathname]);

  return (
    <form
      onSubmit={handleSearch}
      className={`flex-grow md:w-96 md:flex-grow-0`}
    >
      <label className="input input-bordered flex items-center rounded-full border-0 bg-neutral">
        <Search color={"#6f6f6f"} />

        <input
          type="text"
          ref={searchRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-sm w-full grow font-medium placeholder:font-medium placeholder:text-[#6f6f6f]"
          placeholder="What do you want to listen?"
        />

        {input && (
          <button type="button" onClick={() => setInput("")}>
            <Close color={"#fff"} />
          </button>
        )}
      </label>
    </form>
  );
}
