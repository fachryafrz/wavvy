import { useRouter, useSearchParams } from "next/navigation";
import TargetOrRange from "./Reusable/TargetOrRange";
import { useEffect, useState } from "react";
import { RANGE, TARGET } from "@/lib/constants";
import { useRequiredFilter } from "@/zustand/isRequiredFilter";

const TARGET_TIME_SIGNATURE = "target_time_signature";
const MIN_TIME_SIGNATURE = "min_time_signature";
const MAX_TIME_SIGNATURE = "max_time_signature";

export default function TimeSignature() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const { isRequired } = useRequiredFilter();

  const [type, setType] = useState(TARGET);
  const [timeSignature, setTimeSignature] = useState(0);

  const handleTimeSignature = (value) => {
    if (type === TARGET) {
      current.delete(MIN_TIME_SIGNATURE);
      current.delete(MAX_TIME_SIGNATURE);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [TARGET_TIME_SIGNATURE]: value,
      });

      if (value === 0) {
        params.delete(TARGET_TIME_SIGNATURE);
      }

      router.push(`/search?${params.toString()}`);
    }

    if (type === RANGE) {
      current.delete(TARGET_TIME_SIGNATURE);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [MIN_TIME_SIGNATURE]: value[0],
        [MAX_TIME_SIGNATURE]: value[1],
      });

      if (value[0] === 0) {
        params.delete(MIN_TIME_SIGNATURE);
      }

      if (value[1] === 1) {
        params.delete(MAX_TIME_SIGNATURE);
      }

      router.push(`/search?${params.toString()}`);
    }
  };

  useEffect(() => {
    if (type === TARGET) {
      const target = searchParams.get(TARGET_TIME_SIGNATURE);

      setTimeSignature(target || 0);
    }

    if (type === RANGE) {
      const min = searchParams.get(MIN_TIME_SIGNATURE);
      const max = searchParams.get(MAX_TIME_SIGNATURE);

      setTimeSignature([min || 0, max || 1]);
    }
  }, [type, searchParams]);

  return (
    <TargetOrRange
      title={"Time Signature"}
      onSlider={handleTimeSignature}
      type={type}
      setType={setType}
      value={timeSignature}
      setValue={setTimeSignature}
      disabled={isRequired}
    />
  );
}
