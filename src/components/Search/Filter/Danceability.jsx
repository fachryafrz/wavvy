import { useRouter, useSearchParams } from "next/navigation";
import TargetOrRange from "./Reusable/TargetOrRange";
import { useEffect, useState } from "react";
import { RANGE, TARGET } from "@/lib/constants";

const TARGET_DANCEABILITY = "target_danceability";
const MIN_DANCEABILITY = "min_danceability";
const MAX_DANCEABILITY = "max_danceability";

export default function Danceability() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

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

      setDanceability([min || 0, max || 1]);
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
    />
  );
}
