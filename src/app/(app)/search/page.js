import Filter, { FilterMenuToggle } from "@/components/Search/Filter";

export default async function page() {
  return (
    <div>
      {/* Header */}
      <div className={`flex py-2 items-center gap-2 flex-row-reverse justify-between lg:flex-row lg:justify-normal`}>
        <FilterMenuToggle />

        <h2 className={`text-xl font-medium`}>Tune Your Music</h2>
      </div>

      <div className={`flex gap-4`}>
        {/* Filter */}
        <Filter />

        {/* Songs */}
        <div>Songs</div>
      </div>
    </div>
  )
}
