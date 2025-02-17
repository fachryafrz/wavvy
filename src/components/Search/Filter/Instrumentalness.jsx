import { useRouter, useSearchParams } from "next/navigation";
import TargetOrRange from "./Reusable/TargetOrRange";
import { useEffect, useState } from "react";
import { RANGE, TARGET } from "@/lib/constants";

const TARGET_INSTRUMENTALNESS = "target_instrumentalness";
const MIN_INSTRUMENTALNESS = "min_instrumentalness";
const MAX_INSTRUMENTALNESS = "max_instrumentalness";

export default function Instrumentalness() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const [type, setType] = useState(TARGET);
  const [instrumentalness, setInstrumentalness] = useState(0);

  const handleInstrumentalness = (value) => {
    if (type === TARGET) {
      current.delete(MIN_INSTRUMENTALNESS);
      current.delete(MAX_INSTRUMENTALNESS);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [TARGET_INSTRUMENTALNESS]: value,
      });

      if (value === 0) {
        params.delete(TARGET_INSTRUMENTALNESS);
      }

      router.push(`/search?${params.toString()}`);
    }

    if (type === RANGE) {
      current.delete(TARGET_INSTRUMENTALNESS);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [MIN_INSTRUMENTALNESS]: value[0],
        [MAX_INSTRUMENTALNESS]: value[1],
      });

      if (value[0] === 0) {
        params.delete(MIN_INSTRUMENTALNESS);
      }

      if (value[1] === 1) {
        params.delete(MAX_INSTRUMENTALNESS);
      }

      router.push(`/search?${params.toString()}`);
    }
  };

  useEffect(() => {
    if (type === TARGET) {
      const target = searchParams.get(TARGET_INSTRUMENTALNESS);

      setInstrumentalness(target || 0);
    }

    if (type === RANGE) {
      const min = searchParams.get(MIN_INSTRUMENTALNESS);
      const max = searchParams.get(MAX_INSTRUMENTALNESS);

      setInstrumentalness([min || 0, max || 1]);
    }
  }, [type, searchParams]);

  return (
    <TargetOrRange
      title={"Instrumentalness"}
      onSlider={handleInstrumentalness}
      type={type}
      setType={setType}
      value={instrumentalness}
      setValue={setInstrumentalness}
    />
  );
}
