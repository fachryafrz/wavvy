import { useRouter, useSearchParams } from "next/navigation";
import TargetOrRange from "./Reusable/TargetOrRange";
import { useEffect, useState } from "react";
import { RANGE, TARGET } from "@/lib/constants";

const TARGET_ENERGY = "target_energy";
const MIN_ENERGY = "min_energy";
const MAX_ENERGY = "max_energy";

export default function Energy() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const [type, setType] = useState(TARGET);
  const [energy, setEnergy] = useState(0);

  const handleEnergy = (value) => {
    if (type === TARGET) {
      current.delete(MIN_ENERGY);
      current.delete(MAX_ENERGY);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [TARGET_ENERGY]: value,
      });

      if (value === 0) {
        params.delete(TARGET_ENERGY);
      }

      router.push(`/search?${params.toString()}`);
    }

    if (type === RANGE) {
      current.delete(TARGET_ENERGY);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [MIN_ENERGY]: value[0],
        [MAX_ENERGY]: value[1],
      });

      if (value[0] === 0) {
        params.delete(MIN_ENERGY);
      }

      if (value[1] === 1) {
        params.delete(MAX_ENERGY);
      }

      router.push(`/search?${params.toString()}`);
    }
  };

  useEffect(() => {
    if (type === TARGET) {
      const target = searchParams.get(TARGET_ENERGY);

      setEnergy(target || 0);
    }

    if (type === RANGE) {
      const min = searchParams.get(MIN_ENERGY);
      const max = searchParams.get(MAX_ENERGY);

      setEnergy([min || 0, max || 1]);
    }
  }, [type, searchParams]);

  return (
    <TargetOrRange
      title={"Energy"}
      onSlider={handleEnergy}
      type={type}
      setType={setType}
      value={energy}
      setValue={setEnergy}
    />
  );
}
