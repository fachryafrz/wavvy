import { useRouter, useSearchParams } from "next/navigation";
import TargetOrRange from "./Reusable/TargetOrRange";
import { useEffect, useState } from "react";
import { RANGE, TARGET } from "@/lib/constants";

const TARGET_SPEECHINESS = "target_speechiness";
const MIN_SPEECHINESS = "min_speechiness";
const MAX_SPEECHINESS = "max_speechiness";

export default function Speechiness() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const [type, setType] = useState(TARGET);
  const [speechiness, setSpeechiness] = useState(0);

  const handleSpeechiness = (value) => {
    if (type === TARGET) {
      current.delete(MIN_SPEECHINESS);
      current.delete(MAX_SPEECHINESS);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [TARGET_SPEECHINESS]: value,
      });

      if (value === 0) {
        params.delete(TARGET_SPEECHINESS);
      }

      router.push(`/search?${params.toString()}`);
    }

    if (type === RANGE) {
      current.delete(TARGET_SPEECHINESS);

      const params = new URLSearchParams({
        ...Object.fromEntries(current),
        [MIN_SPEECHINESS]: value[0],
        [MAX_SPEECHINESS]: value[1],
      });

      if (value[0] === 0) {
        params.delete(MIN_SPEECHINESS);
      }

      if (value[1] === 1) {
        params.delete(MAX_SPEECHINESS);
      }

      router.push(`/search?${params.toString()}`);
    }
  };

  useEffect(() => {
    if (type === TARGET) {
      const target = searchParams.get(TARGET_SPEECHINESS);

      setSpeechiness(target || 0);
    }

    if (type === RANGE) {
      const min = searchParams.get(MIN_SPEECHINESS);
      const max = searchParams.get(MAX_SPEECHINESS);

      setSpeechiness([min || 0, max || 1]);
    }
  }, [type, searchParams]);

  return (
    <TargetOrRange
      title={"Speechiness"}
      onSlider={handleSpeechiness}
      type={type}
      setType={setType}
      value={speechiness}
      setValue={setSpeechiness}
    />
  );
}
