import { Search, SlidersHorizontal, X } from "lucide-react"
import { useMemo, useState } from "react"
import { ApartmentListItem } from "../../components/shared/ApartmentCard"
import { EmptyState } from "../../components/shared/EmptyState"
import { FilterPanel, type ApartmentFilters } from "../../components/shared/FilterPanel"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Select } from "../../components/ui/select"
import type { Apartment } from "../../data/mockData"

type ApartmentsPageProps = {
  apartments: Apartment[]
  savedIds: string[]
  onToggleSave: (id: string) => void
}

const initialFilters: ApartmentFilters = {
  search: "",
  maxPrice: "",
  maxDistance: "",
  university: "",
  roomType: "",
  facility: "",
  availability: "",
}

export function ApartmentsPage({ apartments, savedIds, onToggleSave }: ApartmentsPageProps) {
  const [filters, setFilters] = useState(initialFilters)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filteredApartments = useMemo(() => {
    const keyword = filters.search.trim().toLowerCase()

    return apartments.filter((apartment) => {
      const matchesKeyword =
        !keyword ||
        apartment.name.toLowerCase().includes(keyword) ||
        apartment.location.toLowerCase().includes(keyword) ||
        apartment.nearUniversity.toLowerCase().includes(keyword) ||
        apartment.roomType.toLowerCase().includes(keyword)
      const matchesPrice = !filters.maxPrice || apartment.price <= Number(filters.maxPrice)
      const matchesDistance = !filters.maxDistance || apartment.distanceFromCampus <= Number(filters.maxDistance)
      const matchesUniversity = !filters.university || apartment.nearUniversity === filters.university
      const matchesRoomType = !filters.roomType || apartment.roomType === filters.roomType
      const matchesFacility = !filters.facility || apartment.facilities.includes(filters.facility)
      const matchesAvailability = !filters.availability || apartment.availabilityStatus === filters.availability

      return matchesKeyword && matchesPrice && matchesDistance && matchesUniversity && matchesRoomType && matchesFacility && matchesAvailability
    })
  }, [apartments, filters])

  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">Apartments</p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Find apartments that fit your student life</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">Search Rangsit University, Bangkok University, Khlong Luang, Thanyaburi, and Pathum Thani sample listings.</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <p className="text-sm font-semibold text-slate-500">{filteredApartments.length} apartments found</p>
              <Select className="w-full sm:w-48" defaultValue="recommended">
                <option value="recommended">Sort by: Recommended</option>
                <option value="price-low">Price: Low first</option>
                <option value="distance">Distance</option>
              </Select>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="relative max-w-3xl flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={filters.search}
              onChange={(event) => setFilters({ ...filters, search: event.target.value })}
              placeholder="Search by apartment, area, or university"
              className="h-12 bg-slate-50 pl-9"
            />
            </div>
            <Button type="button" variant="outline" className="h-12 w-full sm:w-auto lg:hidden" onClick={() => setFiltersOpen(true)}>
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <div className="hidden lg:block">
          <FilterPanel filters={filters} onChange={setFilters} onReset={() => setFilters(initialFilters)} />
        </div>
        <div>
          {filteredApartments.length > 0 ? (
            <div className="grid gap-4">
              {filteredApartments.map((apartment) => (
                <ApartmentListItem key={apartment.id} apartment={apartment} isSaved={savedIds.includes(apartment.id)} onToggleSave={onToggleSave} />
              ))}
            </div>
          ) : (
            <EmptyState title="No apartments match these filters" description="Try adjusting the price, distance, university, room type, facility, or availability filters." />
          )}
        </div>
      </section>
      {filtersOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/40 lg:hidden" onClick={() => setFiltersOpen(false)}>
          <div className="ml-auto h-full w-full max-w-sm overflow-y-auto bg-white p-4 shadow-xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">Filters</h2>
              <Button variant="ghost" size="icon" aria-label="Close filters" onClick={() => setFiltersOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <FilterPanel filters={filters} onChange={setFilters} onReset={() => setFilters(initialFilters)} />
            <Button className="mt-4 h-11 w-full" onClick={() => setFiltersOpen(false)}>Show results</Button>
          </div>
        </div>
      ) : null}
    </main>
  )
}
