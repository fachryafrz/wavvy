import Filter, { FilterMenuToggle } from "@/components/Search/Filter";
import Results from "@/components/Search/Results";
import genres from '@/data/genre-seeds.json'
import markets from '@/data/market-seeds.json'

export default async function page() {
  return (
    <div className={`flex gap-4 h-full`}>
      {/* Filter */}
      <Filter markets={markets} genres={genres} />

      <div className={`flex-1 flex flex-col`}>
        {/* Filter Toggle */}
        <div className={`bg-base-100 sticky top-0 z-10 bg-opacity-90 py-2 backdrop-blur flex justify-end xl:justify-start`}>
          <FilterMenuToggle />
        </div>

        {/* Songs */}
        <Results />
      </div>
    </div>
  )
}
