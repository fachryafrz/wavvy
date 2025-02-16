import { useRouter, useSearchParams } from "next/navigation";
import TargetOrRange from "./TargetOrRange";
import { useEffect, useState } from "react";
import { RANGE, TARGET } from "@/lib/constants";

const TARGET_TEMPO = "target_tempo";
const MIN_TEMPO = "min_tempo";
const MAX_TEMPO = "max_tempo";

export default function Tempo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const [type, setType] = useState(TARGET);
  const [tempo, setTempo] = useState(0);

  const handleTempo = (value) => {
    if (type === TARGET) {
      current.delete(MIN_TEMPO);
      current.delete(MAX_TEMPO);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [TARGET_TEMPO]: value,
      });

      if (value === 0) {
        params.delete(TARGET_TEMPO);
      }

      router.push(`/search?${params.toString()}`);
    }

    if (type === RANGE) {
      current.delete(TARGET_TEMPO);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [MIN_TEMPO]: value[0],
        [MAX_TEMPO]: value[1],
      });

      if (value[0] === 0) {
        params.delete(MIN_TEMPO);
      }

      if (value[1] === 1) {
        params.delete(MAX_TEMPO);
      }

      router.push(`/search?${params.toString()}`);
    }
  };

  useEffect(() => {
    if (type === TARGET) {
      const target = searchParams.get(TARGET_TEMPO);

      setTempo(target || 0);
    }

    if (type === RANGE) {
      const min = searchParams.get(MIN_TEMPO);
      const max = searchParams.get(MAX_TEMPO);

      setTempo([min || 0, max || 1]);
    }
  }, [type, searchParams]);

  return (
    <TargetOrRange
      title={"Tempo"}
      onSlider={handleTempo}
      type={type}
      setType={setType}
      value={tempo}
      setValue={setTempo}
    />
  );
}
