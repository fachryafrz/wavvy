import { useRouter, useSearchParams } from "next/navigation";
import SelectFilter from "./Reusable/SelectFilter";
import { useEffect, useMemo, useState } from "react";
import { toUpper } from "@/lib/toUpper";
import { useRequiredFilter } from "@/zustand/isRequiredFilter";

const SEED_GENRES = "seed_genres";

export default function Genre({ data }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const { isRequired, setIsRequired } = useRequiredFilter();

  const [genre, setGenre] = useState();

  const genres = useMemo(
    () =>
      data.map((genre) => ({
        value: genre,
        label: toUpper(genre.replace(/-/g, " ")),
      })),
    [data],
  );

  const handleGenreChange = (selectedOption) => {
    const value = selectedOption.map((option) => option.value);

    const params = new URLSearchParams({
      ...Object.fromEntries(current),
      [SEED_GENRES]: value,
    });

    if (value.length === 0) {
      params.delete(SEED_GENRES);
    }

    router.push(`/search?${params.toString()}`);
  };

  useEffect(() => {
    if (searchParams.get(SEED_GENRES)) {
      const genresParams = searchParams.get(SEED_GENRES).split(",");
      const searchGenres = genresParams.map((param) =>
        data.find((genre) => genre === param),
      );
      const searchGenresOptions = searchGenres.map((genre) => ({
        value: genre,
        label: toUpper(genre.replace(/-/g, " ")),
      }));
      setGenre(searchGenresOptions);
    } else {
      setGenre(null);
    }
  }, [searchParams]);

  useEffect(() => {
    // BUG: Kalau ada genre dan di refresh requirednya masih true
    setIsRequired(!genre || genre.length === 0);
  }, [genre]);

  return (
    <SelectFilter
      title={"Genre"}
      isRequired={isRequired}
      options={genres}
      onChange={handleGenreChange}
      value={genre}
      placeholder={"Select a genre..."}
    />
  );
}
