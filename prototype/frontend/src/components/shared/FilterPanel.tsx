import { SlidersHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select } from "../ui/select"

export type ApartmentFilters = {
  search: string
  maxPrice: string
  maxDistance: string
  university: string
  roomType: string
  facility: string
  availability: string
}

type FilterPanelProps = {
  filters: ApartmentFilters
  onChange: (filters: ApartmentFilters) => void
  onReset: () => void
}

export function FilterPanel({ filters, onChange, onReset }: FilterPanelProps) {
  const update = (key: keyof ApartmentFilters, value: string) => onChange({ ...filters, [key]: value })

  return (
    <Card className="lg:sticky lg:top-20">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-blue-600" />
            Filters
          </span>
          <button type="button" className="text-xs font-semibold text-blue-600 hover:text-blue-700" onClick={onReset}>
            Clear all
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 p-4 pt-2">
        <div className="space-y-2">
          <Label htmlFor="search">Keyword</Label>
          <Input
            id="search"
            value={filters.search}
            onChange={(event) => update("search", event.target.value)}
            placeholder="Apartment, area, or university"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="space-y-2">
            <Label htmlFor="maxPrice">Max price</Label>
            <Input
              id="maxPrice"
              value={filters.maxPrice}
              onChange={(event) => update("maxPrice", event.target.value)}
              type="number"
              min="0"
              placeholder="15000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxDistance">Max distance</Label>
            <Input
              id="maxDistance"
              value={filters.maxDistance}
              onChange={(event) => update("maxDistance", event.target.value)}
              type="number"
              min="0"
              step="0.1"
              placeholder="2"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="university">University</Label>
          <Select id="university" value={filters.university} onChange={(event) => update("university", event.target.value)}>
            <option value="">Any university</option>
            <option value="Rangsit University">Rangsit University</option>
            <option value="Bangkok University">Bangkok University</option>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="roomType">Room type</Label>
          <Select id="roomType" value={filters.roomType} onChange={(event) => update("roomType", event.target.value)}>
            <option value="">Any type</option>
            <option value="Studio">Studio</option>
            <option value="Shared Room">Shared Room</option>
            <option value="Private Room">Private Room</option>
            <option value="One Bedroom">One Bedroom</option>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="facility">Facility</Label>
          <Select id="facility" value={filters.facility} onChange={(event) => update("facility", event.target.value)}>
            <option value="">Any facility</option>
            <option value="Wi-Fi">Wi-Fi</option>
            <option value="Air Conditioning">Air Conditioning</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Laundry">Laundry</option>
            <option value="Security">Security</option>
            <option value="Parking">Parking</option>
            <option value="CCTV">CCTV</option>
            <option value="Keycard">Keycard</option>
            <option value="Gym">Gym</option>
            <option value="Pool">Pool</option>
            <option value="Study Area">Study Area</option>
            <option value="Near Campus">Near Campus</option>
            <option value="Near Red Line">Near Red Line</option>
            <option value="Near Future Park">Near Future Park</option>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="availability">Availability</Label>
          <Select id="availability" value={filters.availability} onChange={(event) => update("availability", event.target.value)}>
            <option value="">Any status</option>
            <option value="Available">Available</option>
            <option value="Limited">Limited</option>
            <option value="Unavailable">Unavailable</option>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
