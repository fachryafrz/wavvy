import { useRouter, useSearchParams } from "next/navigation";
import TargetOrRange from "./TargetOrRange";
import { useEffect, useState } from "react";
import { RANGE, TARGET } from "@/lib/constants";

const TARGET_VALENCE = "target_valence";
const MIN_VALENCE = "min_valence";
const MAX_VALENCE = "max_valence";

export default function Valence() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const [type, setType] = useState(TARGET);
  const [valence, setValence] = useState(0);

  const handleValence = (value) => {
    if (type === TARGET) {
      current.delete(MIN_VALENCE);
      current.delete(MAX_VALENCE);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [TARGET_VALENCE]: value,
      });

      if (value === 0) {
        params.delete(TARGET_VALENCE);
      }

      router.push(`/search?${params.toString()}`);
    }

    if (type === RANGE) {
      current.delete(TARGET_VALENCE);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [MIN_VALENCE]: value[0],
        [MAX_VALENCE]: value[1],
      });

      if (value[0] === 0) {
        params.delete(MIN_VALENCE);
      }

      if (value[1] === 1) {
        params.delete(MAX_VALENCE);
      }

      router.push(`/search?${params.toString()}`);
    }
  };

  useEffect(() => {
    if (type === TARGET) {
      const target = searchParams.get(TARGET_VALENCE);

      setValence(target || 0);
    }

    if (type === RANGE) {
      const min = searchParams.get(MIN_VALENCE);
      const max = searchParams.get(MAX_VALENCE);

      setValence([min || 0, max || 1]);
    }
  }, [type, searchParams]);

  return (
    <TargetOrRange
      title={"Valence"}
      onSlider={handleValence}
      type={type}
      setType={setType}
      value={valence}
      setValue={setValence}
    />
  );
}
