import { useRouter, useSearchParams } from "next/navigation";
import TargetOrRange from "./Reusable/TargetOrRange";
import { useEffect, useState } from "react";
import { RANGE, TARGET } from "@/lib/constants";

const TARGET_LOUDNESS = "target_loudness";
const MIN_LOUDNESS = "min_loudness";
const MAX_LOUDNESS = "max_loudness";

export default function Loudness() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const [type, setType] = useState(TARGET);
  const [loudness, setLoudness] = useState(0);

  const handleLoudness = (value) => {
    if (type === TARGET) {
      current.delete(MIN_LOUDNESS);
      current.delete(MAX_LOUDNESS);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [TARGET_LOUDNESS]: value,
      });

      if (value === 0) {
        params.delete(TARGET_LOUDNESS);
      }

      router.push(`/search?${params.toString()}`);
    }

    if (type === RANGE) {
      current.delete(TARGET_LOUDNESS);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [MIN_LOUDNESS]: value[0],
        [MAX_LOUDNESS]: value[1],
      });

      if (value[0] === 0) {
        params.delete(MIN_LOUDNESS);
      }

      if (value[1] === 1) {
        params.delete(MAX_LOUDNESS);
      }

      router.push(`/search?${params.toString()}`);
    }
  };

  useEffect(() => {
    if (type === TARGET) {
      const target = searchParams.get(TARGET_LOUDNESS);

      setLoudness(target || 0);
    }

    if (type === RANGE) {
      const min = searchParams.get(MIN_LOUDNESS);
      const max = searchParams.get(MAX_LOUDNESS);

      setLoudness([min || 0, max || 1]);
    }
  }, [type, searchParams]);

  return (
    <TargetOrRange
      title={"Loudness"}
      onSlider={handleLoudness}
      type={type}
      setType={setType}
      value={loudness}
      setValue={setLoudness}
    />
  );
}
