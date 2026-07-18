import { ArrowLeft, Bath, Bed, Building2, ChevronLeft, ChevronRight, Heart, Mail, MapPin, MessageCircle, Phone, Ruler, Share2, Wifi } from "lucide-react"
import { useEffect, useState } from "react"
import { LockKeyhole } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { ApartmentCard } from "../../components/shared/ApartmentCard"
import { ListingDetailMap } from "../../components/shared/MapPreview"
import { StatusBadge } from "../../components/shared/StatusBadge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import type { Apartment } from "../../data/mockData"
import { formatCurrency } from "../../lib/utils"
import { getListingMapMarker } from "../../services/api/apartments"
import type { AuthProfile, ListingMapMarker } from "../../services/api/types"

type ApartmentDetailPageProps = {
  apartments: Apartment[]
  savedIds: string[]
  onToggleSave: (id: string) => void
  loading?: boolean
  session: AuthProfile | null
}

function DetailImage({ src, alt, className }: { src?: string; alt: string; className: string }) {
  const [failed, setFailed] = useState(false)

  useEffect(() => setFailed(false), [src])

  if (src && !failed) {
    return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
  }

  return (
    <div className={`${className} grid place-items-center bg-slate-100 text-slate-400`}>
      <div className="text-center">
        <Building2 className="mx-auto h-10 w-10" />
        <p className="mt-2 text-sm font-semibold text-slate-500">No photos uploaded yet</p>
      </div>
    </div>
  )
}

export function ApartmentDetailPage({ apartments, savedIds, onToggleSave, loading, session }: ApartmentDetailPageProps) {
  const { id } = useParams()
  const apartment = apartments.find((item) => item.id === id)
  const [mapMarker, setMapMarker] = useState<ListingMapMarker | null>(null)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0)

  useEffect(() => {
    if (!id) {
      return
    }

    setSelectedPhotoIndex(0)
    getListingMapMarker(id)
      .then(setMapMarker)
      .catch((error) => console.error(error))
  }, [id])

  if (loading && !apartment) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8" aria-busy="true">
        <Card>
          <CardContent className="space-y-4 p-8">
            <div className="h-7 w-48 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full max-w-md animate-pulse rounded bg-slate-100" />
            <p className="sr-only">Loading apartment details</p>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (!apartment) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
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
  const canMessage = session?.role === "student"
  const hasDirectContact = Boolean(apartment.ownerContact)
  const signInState = { redirectTo: `/apartments/${apartment.id}` }
  const contactIsEmail = apartment.ownerContact.includes("@")
  const gallery = apartment.gallery
  const selectedPhoto = gallery[selectedPhotoIndex]
  const hasMultiplePhotos = gallery.length > 1
  const showPreviousPhoto = () => setSelectedPhotoIndex((current) => (current === 0 ? gallery.length - 1 : current - 1))
  const showNextPhoto = () => setSelectedPhotoIndex((current) => (current + 1) % gallery.length)

  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
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
              {canMessage ? (
                <Button asChild className="min-h-11 flex-1 bg-blue-600 hover:bg-blue-700 sm:flex-none">
                  <Link to={`/messages?listing=${encodeURIComponent(apartment.id)}`}>Send inquiry</Link>
                </Button>
              ) : session ? (
                <Button type="button" disabled className="min-h-11 flex-1 sm:flex-none">Student account required</Button>
              ) : (
                <Button asChild className="min-h-11 flex-1 bg-blue-600 hover:bg-blue-700 sm:flex-none">
                  <Link to="/signin" state={signInState}>Sign in to contact</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <div className="min-w-0 space-y-3">
            <div className="relative overflow-hidden rounded-xl bg-slate-100 shadow-sm ring-1 ring-slate-200">
              <DetailImage src={selectedPhoto} alt={apartment.name} className="h-56 w-full object-contain sm:h-64 lg:h-[300px]" />
            {hasMultiplePhotos ? (
              <>
                <button
                  type="button"
                  aria-label="Previous room photo"
                  onClick={showPreviousPhoto}
                  className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next room photo"
                  onClick={showNextPhoto}
                  className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-3 right-3 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-bold text-white">
                  {selectedPhotoIndex + 1} / {gallery.length}
                </div>
              </>
            ) : null}
            </div>
            {gallery.length ? (
              <div className="flex gap-2 overflow-x-auto rounded-xl border border-slate-200 bg-white p-2">
                {gallery.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    aria-label={`View room photo ${index + 1}`}
                    onClick={() => setSelectedPhotoIndex(index)}
                    className={index === selectedPhotoIndex ? "h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-2 ring-blue-600" : "h-14 w-20 shrink-0 overflow-hidden rounded-lg opacity-75 transition hover:opacity-100"}
                  >
                    <img src={image} alt={`${apartment.name} room view ${index + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-4 lg:sticky lg:top-16">
            <Card>
              <CardContent className="space-y-4 p-4">
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status={apartment.availabilityStatus} />
                  <StatusBadge status={apartment.approvalStatus} />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between lg:block">
                  <div>
                    <h1 className="break-words text-2xl font-bold tracking-tight text-slate-950">{apartment.name}</h1>
                    <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-blue-600">
                      <MapPin className="h-4 w-4" />
                      {apartment.distanceFromCampus} km to {apartment.nearUniversity}
                    </p>
                  </div>
                  <div className="text-left sm:text-right lg:mt-4 lg:text-left">
                    <p className="text-3xl font-bold text-slate-950">{formatCurrency(apartment.price)}</p>
                    <p className="text-sm text-slate-500">per month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card id="landlord-contact" className="scroll-mt-20">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Contact Landlord</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4 pt-0">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                    {apartment.ownerName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-slate-950">{apartment.ownerName}</p>
                    <p className="text-xs text-slate-500">Apartment landlord</p>
                  </div>
                </div>
                {canMessage ? (
                  <>
                    {hasDirectContact ? <p className="flex items-center gap-2 break-all text-xs text-slate-500">
                      {contactIsEmail ? <Mail className="h-4 w-4 shrink-0 text-blue-600" /> : <Phone className="h-4 w-4 shrink-0 text-blue-600" />}
                      {apartment.ownerContact}
                    </p> : null}
                    <Button asChild className="h-10 w-full bg-blue-600 hover:bg-blue-700">
                      <Link to={`/messages?listing=${encodeURIComponent(apartment.id)}`}>
                        <MessageCircle className="h-4 w-4" />
                        Send inquiry
                      </Link>
                    </Button>
                    {hasDirectContact && contactIsEmail ? (
                      <Button type="button" variant="outline" className="h-10 w-full" disabled>
                        <Phone className="h-4 w-4" />
                        Phone unavailable
                      </Button>
                    ) : hasDirectContact ? (
                      <Button asChild variant="outline" className="h-10 w-full">
                        <a href={`tel:${apartment.ownerContact}`}>
                          <Phone className="h-4 w-4" />
                          Call Landlord
                        </a>
                      </Button>
                    ) : null}
                    <p className="text-center text-xs text-slate-500">Landlords reply when available.</p>
                  </>
                ) : session ? (
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
                    <LockKeyhole className="mx-auto h-5 w-5 text-slate-400" />
                    <p className="mt-2 text-sm font-semibold text-slate-700">Student account required</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">Landlord contact and messaging are available only to signed-in students.</p>
                  </div>
                ) : (
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-center">
                    <LockKeyhole className="mx-auto h-5 w-5 text-blue-600" />
                    <p className="mt-2 text-sm font-semibold text-slate-800">Sign in to contact this landlord</p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">Create or use a student account to reveal contact details.</p>
                    <Button asChild className="mt-3 h-10 w-full">
                      <Link to="/signin" state={signInState}>Continue to sign in</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-5">
            <Card>
              <CardContent className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  [Bed, apartment.roomType],
                  [Bath, `${apartment.bathrooms} bath`],
                  [Ruler, apartment.size],
                  [Wifi, "Wi-Fi"],
                ].map(([Icon, label]) => (
                  <div key={label as string} className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-600">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-semibold text-slate-700">{label as string}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">About this place</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm leading-7 text-slate-600">{apartment.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Facilities</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 p-4 pt-0">
                {apartment.facilities.map((facility) => (
                  <span key={facility} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                    {facility}
                  </span>
                ))}
              </CardContent>
            </Card>

            {mapMarker ? (
              <div>
                <h2 className="mb-3 text-lg font-bold text-slate-950">Location overview</h2>
                <ListingDetailMap marker={mapMarker} />
              </div>
            ) : null}
          </div>
          <div className="hidden lg:block" />
        </div>

        {similar.length > 0 ? (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-slate-950">Similar apartments</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
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


