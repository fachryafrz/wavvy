import { useRouter, useSearchParams } from "next/navigation";
import SelectFilter from "./Reusable/SelectFilter";
import { useEffect, useState } from "react";
import iso3311a2 from "iso-3166-1-alpha-2";

const SEED_MARKET = "seed_market";

export default function Market({ data }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const [market, setMarket] = useState([]);

  const markets = data.map((market) => ({
    value: market,
    label: iso3311a2.getCountry(market),
  }));

  const handleMarketChange = (selectedOption) => {
    const value = selectedOption.map((option) => option.value);

    const params = new URLSearchParams({
      ...Object.fromEntries(current),
      [SEED_MARKET]: value,
    });

    if (value.length === 0) {
      params.delete(SEED_MARKET);
    }

    router.push(`/search?${params.toString()}`);
  };

  useEffect(() => {
    if (searchParams.get(SEED_MARKET)) {
      const marketParams = searchParams.get(SEED_MARKET).split(",");
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
    />
  );
}
