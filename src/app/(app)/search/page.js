import Filter, { FilterMenuToggle } from "@/components/Search/Filter";
import Results from "@/components/Search/Results";
import genres from '@/data/genre-seeds.json'
import markets from '@/data/market-seeds.json'

export default async function page() {
  return (
    <div className={`relative h-full`}>
      {/* Header */}
      <div className={`flex z-20 bg-base-100 pb-4 bg-opacity-90 backdrop-blur py-2 items-center gap-2 sticky top-0`}>
        {/* Filter Toggle */}
        <FilterMenuToggle />
      </div>

      <div className={`flex gap-4 h-full max-h-[calc(100%-64px)]`}>
        {/* Filter */}
        <Filter markets={markets} genres={genres} />

        {/* Songs */}
        <Results />
      </div>
    </div>
  )
}
