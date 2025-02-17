import { useRouter, useSearchParams } from "next/navigation";
import TargetOrRange from "./Reusable/TargetOrRange";
import { useEffect, useState } from "react";
import { RANGE, TARGET } from "@/lib/constants";

const TARGET_LIVENESS = "target_liveness";
const MIN_LIVENESS = "min_liveness";
const MAX_LIVENESS = "max_liveness";

export default function Liveness() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const [type, setType] = useState(TARGET);
  const [liveness, setLiveness] = useState(0);

  const handleLiveness = (value) => {
    if (type === TARGET) {
      current.delete(MIN_LIVENESS);
      current.delete(MAX_LIVENESS);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [TARGET_LIVENESS]: value,
      });

      if (value === 0) {
        params.delete(TARGET_LIVENESS);
      }

      router.push(`/search?${params.toString()}`);
    }

    if (type === RANGE) {
      current.delete(TARGET_LIVENESS);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [MIN_LIVENESS]: value[0],
        [MAX_LIVENESS]: value[1],
      });

      if (value[0] === 0) {
        params.delete(MIN_LIVENESS);
      }

      if (value[1] === 1) {
        params.delete(MAX_LIVENESS);
      }

      router.push(`/search?${params.toString()}`);
    }
  };

  useEffect(() => {
    if (type === TARGET) {
      const target = searchParams.get(TARGET_LIVENESS);

      setLiveness(target || 0);
    }

    if (type === RANGE) {
      const min = searchParams.get(MIN_LIVENESS);
      const max = searchParams.get(MAX_LIVENESS);

      setLiveness([min || 0, max || 1]);
    }
  }, [type, searchParams]);

  return (
    <TargetOrRange
      title={"Liveness"}
      onSlider={handleLiveness}
      type={type}
      setType={setType}
      value={liveness}
      setValue={setLiveness}
    />
  );
}
