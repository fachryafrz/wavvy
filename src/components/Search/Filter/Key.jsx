import { useRouter, useSearchParams } from "next/navigation";
import TargetOrRange from "./Reusable/TargetOrRange";
import { useEffect, useState } from "react";
import { RANGE, TARGET } from "@/lib/constants";
import { useRequiredFilter } from "@/zustand/isRequiredFilter";

const TARGET_KEY = "target_key";
const MIN_KEY = "min_key";
const MAX_KEY = "max_key";

export default function Key() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const { isRequired } = useRequiredFilter();

  const [type, setType] = useState(TARGET);
  const [key, setKey] = useState(0);

  const handleKey = (value) => {
    if (type === TARGET) {
      current.delete(MIN_KEY);
      current.delete(MAX_KEY);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [TARGET_KEY]: value,
      });

      if (value === 0) {
        params.delete(TARGET_KEY);
      }

      router.push(`/search?${params.toString()}`);
    }

    if (type === RANGE) {
      current.delete(TARGET_KEY);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [MIN_KEY]: value[0],
        [MAX_KEY]: value[1],
      });

      if (value[0] === 0) {
        params.delete(MIN_KEY);
      }

      if (value[1] === 1) {
        params.delete(MAX_KEY);
      }

      router.push(`/search?${params.toString()}`);
    }
  };

  useEffect(() => {
    if (type === TARGET) {
      const target = searchParams.get(TARGET_KEY);

      setKey(target || 0);
    }

    if (type === RANGE) {
      const min = searchParams.get(MIN_KEY);
      const max = searchParams.get(MAX_KEY);

      setKey([min || 0, max || 1]);
    }
  }, [type, searchParams]);

  return (
    <TargetOrRange
      title={"Key"}
      onSlider={handleKey}
      type={type}
      setType={setType}
      value={key}
      setValue={setKey}
      disabled={isRequired}
    />
  );
}
