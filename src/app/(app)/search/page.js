import Filter, { FilterMenuToggle } from "@/components/Search/Filter";
import Results from "@/components/Search/Results";
import genres from '@/data/genre-seeds.json'
import markets from '@/data/market-seeds.json'

export default async function page() {
  return (
    <div>
      {/* Header */}
      <div className={`flex py-2 items-center gap-2 flex-row-reverse justify-between lg:flex-row lg:justify-normal`}>
        {/* Filter Toggle */}
        <FilterMenuToggle />

        <h2 className={`text-xl font-medium`}>Tune Your Music</h2>
      </div>

      <div className={`flex gap-4`}>
        {/* Filter */}
        <Filter markets={markets} genres={genres} />

        {/* Songs */}
        <Results />
      </div>
    </div>
  )
}
