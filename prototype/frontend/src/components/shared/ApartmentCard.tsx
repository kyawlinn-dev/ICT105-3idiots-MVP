import { Bath, Bed, Building2, Heart, MapPin, Ruler, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import type { Apartment } from "../../data/mockData"
import { formatCurrency } from "../../lib/utils"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { StatusBadge } from "./StatusBadge"

type ApartmentCardProps = {
  apartment: Apartment
  isSaved: boolean
  onToggleSave: (id: string) => void
}

function ListingImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [failed, setFailed] = useState(false)

  useEffect(() => setFailed(false), [src])

  if (src && !failed) {
    return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
  }

  return (
    <div className={`${className} grid place-items-center bg-slate-100 text-slate-400`}>
      <div className="text-center">
        <Building2 className="mx-auto h-8 w-8" />
        <p className="mt-2 text-xs font-semibold text-slate-500">No photos yet</p>
      </div>
    </div>
  )
}

export function ApartmentCard({ apartment, isSaved, onToggleSave }: ApartmentCardProps) {
  return (
    <Card className="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-100">
      <div className="relative">
        <ListingImage src={apartment.image} alt={apartment.name} className="h-52 w-full object-cover" />
        <button
          type="button"
          onClick={() => onToggleSave(apartment.id)}
          className="absolute right-3 top-3 rounded-full bg-white/95 p-2 text-slate-600 shadow-sm transition hover:text-rose-600"
          aria-label={isSaved ? "Remove from saved apartments" : "Save apartment"}
        >
          <Heart className={isSaved ? "h-5 w-5 fill-rose-500 text-rose-500" : "h-5 w-5"} />
        </button>
      </div>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link to={`/apartments/${apartment.id}`} className="break-words text-lg font-bold text-slate-950 hover:text-blue-700">
              {apartment.name}
            </Link>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="h-4 w-4" />
              {apartment.location}
            </p>
            <p className="mt-1 text-xs font-semibold text-blue-600">{apartment.nearUniversity}</p>
          </div>
          <StatusBadge status={apartment.availabilityStatus} />
        </div>
        <div className="grid grid-cols-1 gap-3 rounded-lg bg-slate-50 p-3 text-xs min-[420px]:grid-cols-3">
          <div>
            <p className="text-slate-500">Price</p>
            <p className="font-bold text-slate-950">{formatCurrency(apartment.price)}</p>
          </div>
          <div>
            <p className="text-slate-500">Distance</p>
            <p className="font-bold text-slate-950">{apartment.distanceFromCampus} km</p>
          </div>
          <div>
            <p className="text-slate-500">Type</p>
            <p className="font-bold text-slate-950">{apartment.roomType}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {apartment.facilities.slice(0, 4).map((facility) => (
            <span key={facility} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
              {facility}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1 text-sm font-semibold text-amber-600">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            {apartment.rating}
          </span>
          <Button asChild size="sm">
            <Link to={`/apartments/${apartment.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

type ApartmentListItemProps = ApartmentCardProps

export function ApartmentListItem({ apartment, isSaved, onToggleSave }: ApartmentListItemProps) {
  return (
    <Card className="overflow-hidden transition hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100">
      <CardContent className="grid grid-cols-[104px_minmax(0,1fr)] gap-3 p-3 sm:grid-cols-[150px_minmax(0,1fr)_auto] sm:items-center sm:gap-4">
        <Link to={`/apartments/${apartment.id}`} className="block overflow-hidden rounded-lg">
          <ListingImage src={apartment.image} alt={apartment.name} className="h-32 w-full object-cover sm:h-28" />
        </Link>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link to={`/apartments/${apartment.id}`} className="break-words font-bold text-slate-950 hover:text-blue-700">
              {apartment.name}
            </Link>
            <StatusBadge status={apartment.availabilityStatus} />
          </div>
          <p className="mt-1 flex items-center gap-1 text-xs font-medium text-blue-600">
            <MapPin className="h-3.5 w-3.5" />
            {apartment.distanceFromCampus} km to {apartment.nearUniversity}
          </p>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Bed className="h-3.5 w-3.5" />
              {apartment.bedrooms} bed
            </span>
            <span className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" />
              {apartment.bathrooms} bath
            </span>
            <span className="flex items-center gap-1">
              <Ruler className="h-3.5 w-3.5" />
              {apartment.size}
            </span>
            <span>{apartment.roomType}</span>
          </div>
        </div>
        <div className="col-span-2 flex items-center justify-between gap-4 border-t border-slate-100 pt-2 sm:col-auto sm:block sm:border-0 sm:pt-0 sm:text-right">
          <button
            type="button"
            onClick={() => onToggleSave(apartment.id)}
            className="rounded-full p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500 sm:float-right"
            aria-label={isSaved ? "Remove from saved apartments" : "Save apartment"}
          >
            <Heart className={isSaved ? "h-4 w-4 fill-rose-500 text-rose-500" : "h-4 w-4"} />
          </button>
          <div className="min-w-0 sm:clear-both sm:pt-7">
            <p className="text-lg font-bold text-slate-950">{formatCurrency(apartment.price)}</p>
            <p className="text-xs text-slate-500">per month</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
