import { useRouter, useSearchParams } from "next/navigation";
import TargetOrRange from "./TargetOrRange";
import { useEffect, useState } from "react";
import { RANGE, TARGET } from "@/lib/constants";

const TARGET_DURATION = "target_duration_ms";
const MIN_DURATION = "min_duration_ms";
const MAX_DURATION = "max_duration_ms";

export default function Duration() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const [type, setType] = useState(TARGET);
  const [duration, setDuration] = useState(0);

  const handleDuration = (value) => {
    if (type === TARGET) {
      current.delete(MIN_DURATION);
      current.delete(MAX_DURATION);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [TARGET_DURATION]: value,
      });

      if (value === 0) {
        params.delete(TARGET_DURATION);
      }

      router.push(`/search?${params.toString()}`);
    }

    if (type === RANGE) {
      current.delete(TARGET_DURATION);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [MIN_DURATION]: value[0],
        [MAX_DURATION]: value[1],
      });

      if (value[0] === 0) {
        params.delete(MIN_DURATION);
      }

      if (value[1] === 1) {
        params.delete(MAX_DURATION);
      }

      router.push(`/search?${params.toString()}`);
    }
  };

  useEffect(() => {
    if (type === TARGET) {
      const target = searchParams.get(TARGET_DURATION);

      setDuration(target || 0);
    }

    if (type === RANGE) {
      const min = searchParams.get(MIN_DURATION);
      const max = searchParams.get(MAX_DURATION);

      setDuration([min || 0, max || 1]);
    }
  }, [type, searchParams]);

  return (
    <TargetOrRange
      title={"Duration"}
      onSlider={handleDuration}
      type={type}
      setType={setType}
      value={duration}
      setValue={setDuration}
    />
  );
}
