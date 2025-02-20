import { useRouter, useSearchParams } from "next/navigation";
import SelectFilter from "./Reusable/SelectFilter";
import { useEffect, useMemo, useState } from "react";
import iso3311a2 from "iso-3166-1-alpha-2";
import { useRequiredFilter } from "@/zustand/isRequiredFilter";

const MARKET = "market";

export default function Market({ data }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const { isRequired } = useRequiredFilter();

  const [market, setMarket] = useState([]);

  const markets = useMemo(
    () =>
      data.map((market) => ({
        value: market,
        label: iso3311a2.getCountry(market),
      })),
    [data],
  );

  const handleMarketChange = (selectedOption) => {
    const value = selectedOption.map((option) => option.value);

    const params = new URLSearchParams({
      ...Object.fromEntries(current),
      [MARKET]: value,
    });

    if (value.length === 0) {
      params.delete(MARKET);
    }

    router.push(`/search?${params.toString()}`);
  };

  useEffect(() => {
    if (searchParams.get(MARKET)) {
      const marketParams = searchParams.get(MARKET).split(",");
      const searchMarket = marketParams.map((param) =>
        data.find((market) => market === param),
      );
      const searchMarketOptions = searchMarket.map((market) => ({
        value: market,
        label: iso3311a2.getCountry(market),
      }));
      setMarket(searchMarketOptions);
    } else {
      setMarket(null);
    }
  }, [searchParams]);

  return (
    <SelectFilter
      title={"Market"}
      options={markets}
      onChange={handleMarketChange}
      value={market}
      placeholder={"Pick a country..."}
      isDisabled={isRequired}
    />
  );
}
