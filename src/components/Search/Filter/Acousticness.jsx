import { useRouter, useSearchParams } from "next/navigation";
import TargetOrRange from "./Reusable/TargetOrRange";
import { useEffect, useState } from "react";
import { RANGE, TARGET } from "@/lib/constants";
import { useRequiredFilter } from "@/zustand/isRequiredFilter";

const TARGET_ACOUSTICNESS = "target_acousticness";
const MIN_ACOUSTICNESS = "min_acousticness";
const MAX_ACOUSTICNESS = "max_acousticness";

export default function Acousticness() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const { isRequired } = useRequiredFilter();

  const [type, setType] = useState(TARGET);
  const [acousticness, setAcousticness] = useState(0);

  const handleAcousticness = (value) => {
    if (type === TARGET) {
      current.delete(MIN_ACOUSTICNESS);
      current.delete(MAX_ACOUSTICNESS);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [TARGET_ACOUSTICNESS]: value,
      });

      if (value === 0) {
        params.delete(TARGET_ACOUSTICNESS);
      }

      router.push(`/search?${params.toString()}`);
    }

    if (type === RANGE) {
      current.delete(TARGET_ACOUSTICNESS);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [MIN_ACOUSTICNESS]: value[0],
        [MAX_ACOUSTICNESS]: value[1],
      });

      if (value[0] === 0) {
        params.delete(MIN_ACOUSTICNESS);
      }

      if (value[1] === 1) {
        params.delete(MAX_ACOUSTICNESS);
      }

      router.push(`/search?${params.toString()}`);
    }
  };

  useEffect(() => {
    if (type === TARGET) {
      const target = searchParams.get(TARGET_ACOUSTICNESS);

      setAcousticness(target || 0);
    }

    if (type === RANGE) {
      const min = searchParams.get(MIN_ACOUSTICNESS);
      const max = searchParams.get(MAX_ACOUSTICNESS);

      setAcousticness([min || 0, max || 1]);
    }
  }, [type, searchParams]);

  return (
    <TargetOrRange
      title={"Acousticness"}
      onSlider={handleAcousticness}
      type={type}
      setType={setType}
      value={acousticness}
      setValue={setAcousticness}
      disabled={isRequired}
    />
  );
}
