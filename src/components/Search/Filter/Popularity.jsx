import { useRouter, useSearchParams } from "next/navigation";
import TargetOrRange from "./Reusable/TargetOrRange";
import { useEffect, useState } from "react";
import { RANGE, TARGET } from "@/lib/constants";
import { useRequiredFilter } from "@/zustand/isRequiredFilter";

const TARGET_POPULARITY = "target_popularity";
const MIN_POPULARITY = "min_popularity";
const MAX_POPULARITY = "max_popularity";

const MIN = 0;
const MAX = 100;

export default function Popularity() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const { isRequired } = useRequiredFilter();

  const [type, setType] = useState(TARGET);
  const [popularity, setPopularity] = useState(0);

  const handlePopularity = (value) => {
    if (type === TARGET) {
      current.delete(MIN_POPULARITY);
      current.delete(MAX_POPULARITY);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [TARGET_POPULARITY]: value,
      });

      if (value === 0) {
        params.delete(TARGET_POPULARITY);
      }

      router.push(`/search?${params.toString()}`);
    }

    if (type === RANGE) {
      current.delete(TARGET_POPULARITY);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [MIN_POPULARITY]: value[0],
        [MAX_POPULARITY]: value[1],
      });

      if (value[0] === 0) {
        params.delete(MIN_POPULARITY);
      }

      if (value[1] === 1) {
        params.delete(MAX_POPULARITY);
      }

      router.push(`/search?${params.toString()}`);
    }
  };

  useEffect(() => {
    if (type === TARGET) {
      const target = searchParams.get(TARGET_POPULARITY);

      setPopularity(target || 0);
    }

    if (type === RANGE) {
      const min = searchParams.get(MIN_POPULARITY);
      const max = searchParams.get(MAX_POPULARITY);

      setPopularity([min || MIN, max || MAX]);
    }
  }, [type, searchParams]);

  return (
    <TargetOrRange
      title={"Popularity"}
      onSlider={handlePopularity}
      type={type}
      setType={setType}
      value={popularity}
      setValue={setPopularity}
      disabled={isRequired}
      min={MIN}
      max={MAX}
      valueLabelFormat={(value) => `${value}%`}
    />
  );
}
