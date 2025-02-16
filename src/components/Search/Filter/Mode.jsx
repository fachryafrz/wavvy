import { useRouter, useSearchParams } from "next/navigation";
import TargetOrRange from "./TargetOrRange";
import { useEffect, useState } from "react";
import { RANGE, TARGET } from "@/lib/constants";

const TARGET_MODE = "target_mode";
const MIN_MODE = "min_mode";
const MAX_MODE = "max_mode";

export default function Mode() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const [type, setType] = useState(TARGET);
  const [mode, setMode] = useState(0);

  const handleMode = (value) => {
    if (type === TARGET) {
      current.delete(MIN_MODE);
      current.delete(MAX_MODE);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [TARGET_MODE]: value,
      });

      if (value === 0) {
        params.delete(TARGET_MODE);
      }

      router.push(`/search?${params.toString()}`);
    }

    if (type === RANGE) {
      current.delete(TARGET_MODE);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [MIN_MODE]: value[0],
        [MAX_MODE]: value[1],
      });

      if (value[0] === 0) {
        params.delete(MIN_MODE);
      }

      if (value[1] === 1) {
        params.delete(MAX_MODE);
      }

      router.push(`/search?${params.toString()}`);
    }
  };

  useEffect(() => {
    if (type === TARGET) {
      const target = searchParams.get(TARGET_MODE);

      setMode(target || 0);
    }

    if (type === RANGE) {
      const min = searchParams.get(MIN_MODE);
      const max = searchParams.get(MAX_MODE);

      setMode([min || 0, max || 1]);
    }
  }, [type, searchParams]);

  return (
    <TargetOrRange
      title={"Mode"}
      onSlider={handleMode}
      type={type}
      setType={setType}
      value={mode}
      setValue={setMode}
    />
  );
}
