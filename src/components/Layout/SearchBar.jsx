import React from "react";
import { Search } from "react-ionicons";

export default function SearchBar() {
  return (
    <label className="input input-bordered flex w-full items-center rounded-full border-0 bg-neutral lg:w-96">
      <Search color={"#6f6f6f"} />

      <input
        type="text"
        className="input-sm w-full grow placeholder:font-medium placeholder:text-[#6f6f6f]"
        placeholder="Search by artists, songs, or albums"
      />
    </label>
  );
}
