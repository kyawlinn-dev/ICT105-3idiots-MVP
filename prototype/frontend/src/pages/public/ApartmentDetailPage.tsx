import { ArrowLeft, Bath, Bed, Heart, Mail, MapPin, MessageCircle, Phone, Ruler, Share2, Wifi } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { ApartmentCard } from "../../components/shared/ApartmentCard"
import { StatusBadge } from "../../components/shared/StatusBadge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import type { Apartment } from "../../data/mockData"
import { formatCurrency } from "../../lib/utils"

type ApartmentDetailPageProps = {
  apartments: Apartment[]
  savedIds: string[]
  onToggleSave: (id: string) => void
}

export function ApartmentDetailPage({ apartments, savedIds, onToggleSave }: ApartmentDetailPageProps) {
  const { id } = useParams()
  const apartment = apartments.find((item) => item.id === id)

  if (!apartment) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-slate-950">Apartment not found</h1>
            <Button asChild className="mt-5">
              <Link to="/apartments">Back to listings</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  const similar = apartments.filter((item) => item.id !== apartment.id && item.roomType === apartment.roomType).slice(0, 2)
  const saved = savedIds.includes(apartment.id)

  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button asChild variant="ghost" size="sm">
              <Link to="/apartments">
                <ArrowLeft className="h-4 w-4" />
                Back to listings
              </Link>
            </Button>
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
              <Button type="button" variant="ghost" size="icon" aria-label="Save apartment" onClick={() => onToggleSave(apartment.id)}>
                <Heart className={saved ? "h-4 w-4 fill-rose-500 text-rose-500" : "h-4 w-4"} />
              </Button>
              <Button type="button" variant="ghost" size="icon" aria-label="Share apartment">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button type="button" className="min-h-11 flex-1 bg-blue-600 hover:bg-blue-700 sm:flex-none">Contact Owner</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1.6fr_0.8fr]">
          <img src={apartment.gallery[0]} alt={apartment.name} className="h-72 w-full rounded-2xl object-cover shadow-lg shadow-slate-200 sm:h-96 lg:h-[430px]" />
          <div className="grid gap-4 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-1">
            {apartment.gallery.slice(1).map((image, index) => (
              <div key={image} className="relative overflow-hidden rounded-2xl">
                <img src={image} alt={`${apartment.name} room view`} className="h-32 w-full object-cover sm:h-36 lg:h-[132px]" />
                {index === 1 ? <div className="absolute inset-0 grid place-items-center bg-slate-950/45 text-sm font-bold text-white">+12</div> : null}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-3 flex gap-2">
                  <StatusBadge status={apartment.availabilityStatus} />
                  <StatusBadge status={apartment.approvalStatus} />
                </div>
                <h1 className="break-words text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{apartment.name}</h1>
                <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-blue-600">
                  <MapPin className="h-4 w-4" />
                  {apartment.distanceFromCampus} km to {apartment.nearUniversity}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-3xl font-bold text-slate-950">{formatCurrency(apartment.price)}</p>
                <p className="text-sm text-slate-500">THB/month</p>
              </div>
            </div>

            <Card>
              <CardContent className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  [Bed, apartment.roomType],
                  [Bath, `${apartment.bathrooms} bath`],
                  [Ruler, apartment.size],
                  [Wifi, "Wi-Fi"],
                ].map(([Icon, label]) => (
                  <div key={label as string} className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-slate-700">{label as string}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About this place</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-slate-600">{apartment.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Facilities</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {apartment.facilities.map((facility) => (
                  <span key={facility} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                    {facility}
                  </span>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Contact Owner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                  {apartment.ownerName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-slate-950">{apartment.ownerName}</p>
                  <p className="text-xs text-slate-500">Apartment owner</p>
                </div>
              </div>
              <p className="flex items-center gap-2 text-xs text-slate-500">
                <Mail className="h-4 w-4 text-blue-600" />
                {apartment.ownerContact}
              </p>
              <Button type="button" className="w-full bg-blue-600 hover:bg-blue-700">
                <MessageCircle className="h-4 w-4" />
                Send Message
              </Button>
              <Button type="button" variant="outline" className="w-full">
                <Phone className="h-4 w-4" />
                Call
              </Button>
              <p className="text-center text-xs text-slate-500">Response time: Within a few hours</p>
            </CardContent>
          </Card>
        </div>

        {similar.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-950">Similar apartments</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {similar.map((item) => (
                <ApartmentCard key={item.id} apartment={item} isSaved={savedIds.includes(item.id)} onToggleSave={onToggleSave} />
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  )
}
