import { useRouter, useSearchParams } from "next/navigation";
import TargetOrRange from "./Reusable/TargetOrRange";
import { useEffect, useState } from "react";
import { RANGE, TARGET } from "@/lib/constants";
import { useRequiredFilter } from "@/zustand/isRequiredFilter";

const TARGET_DANCEABILITY = "target_danceability";
const MIN_DANCEABILITY = "min_danceability";
const MAX_DANCEABILITY = "max_danceability";

const MIN = 0;
const MAX = 1;

export default function Danceability() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const { isRequired } = useRequiredFilter();

  const [type, setType] = useState(TARGET);
  const [danceability, setDanceability] = useState(0);

  const handleDanceability = (value) => {
    if (type === TARGET) {
      current.delete(MIN_DANCEABILITY);
      current.delete(MAX_DANCEABILITY);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [TARGET_DANCEABILITY]: value,
      });

      if (value === 0) {
        params.delete(TARGET_DANCEABILITY);
      }

      router.push(`/search?${params.toString()}`);
    }

    if (type === RANGE) {
      current.delete(TARGET_DANCEABILITY);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [MIN_DANCEABILITY]: value[0],
        [MAX_DANCEABILITY]: value[1],
      });

      if (value[0] === 0) {
        params.delete(MIN_DANCEABILITY);
      }

      if (value[1] === 1) {
        params.delete(MAX_DANCEABILITY);
      }

      router.push(`/search?${params.toString()}`);
    }
  };

  useEffect(() => {
    if (type === TARGET) {
      const target = searchParams.get(TARGET_DANCEABILITY);

      setDanceability(target || 0);
    }

    if (type === RANGE) {
      const min = searchParams.get(MIN_DANCEABILITY);
      const max = searchParams.get(MAX_DANCEABILITY);

      setDanceability([min || MIN, max || MAX]);
    }
  }, [type, searchParams]);

  return (
    <TargetOrRange
      title={"Danceability"}
      onSlider={handleDanceability}
      type={type}
      setType={setType}
      value={danceability}
      setValue={setDanceability}
      disabled={isRequired}
      min={MIN}
      max={MAX}
      step={0.1}
      valueLabelFormat={(value) => `${(value * 100).toFixed(0)}%`}
    />
  );
}
