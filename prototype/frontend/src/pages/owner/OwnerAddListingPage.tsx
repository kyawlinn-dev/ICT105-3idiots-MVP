import { CheckCircle2, ImagePlus, MapPin, Save, Send, Trash2 } from "lucide-react"
import type { FormEvent } from "react"
import { useEffect, useRef, useState } from "react"
import { FormSection } from "../../components/shared/FormSection"
import { PageHeader } from "../../components/shared/PageHeader"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select } from "../../components/ui/select"
import { Textarea } from "../../components/ui/textarea"
import type { Apartment } from "../../data/mockData"
import { createListing, updateOwnerListing } from "../../services/api/apartments"
import type { ApiAvailabilityStatus } from "../../services/api/types"
import { uploadListingPhoto, type UploadedListingPhoto } from "../../services/api/uploads"
import { googleMapsPlaceUrl, googleMapsUrlFromCoordinates, parseGoogleMapsLocation } from "../../services/maps/googleMapsLinks"
import { loadGoogleMaps, loadGooglePlaces } from "../../services/maps/googleMapsLoader"
import { toast } from "sonner"

type FormState = {
  name: string
  propertyType: string
  nearUniversity: string
  locationSearch: string
  manualLocation: string
  price: string
  roomType: string
  bedrooms: string
  bathrooms: string
  size: string
  availabilityStatus: string
  facilities: string
  ownerName: string
  ownerContact: string
  description: string
}

type SelectedPlace = {
  placeId: string
  displayName: string
  formattedAddress: string
  latitude: number
  longitude: number
  googleMapsUrl: string
}

const emptyForm: FormState = {
  name: "",
  propertyType: "apartment",
  nearUniversity: "Rangsit University",
  locationSearch: "",
  manualLocation: "",
  price: "",
  roomType: "",
  bedrooms: "",
  bathrooms: "",
  size: "",
  availabilityStatus: "Available",
  facilities: "",
  ownerName: "",
  ownerContact: "",
  description: "",
}

type OwnerAddListingPageProps = {
  listing?: Apartment
  onListingCreated?: () => void | Promise<void>
}

const availabilityToApi: Record<string, ApiAvailabilityStatus> = {
  Available: "available",
  Limited: "limited",
  Unavailable: "unavailable",
}

export function OwnerAddListingPage({ listing, onListingCreated }: OwnerAddListingPageProps) {
  const isEditMode = Boolean(listing)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [photoError, setPhotoError] = useState("")
  const [photos, setPhotos] = useState<UploadedListingPhoto[]>([])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(null)
  const [locationConfirmed, setLocationConfirmed] = useState(false)
  const [locationError, setLocationError] = useState("")
  const [placesReady, setPlacesReady] = useState(false)
  const locationInputRef = useRef<HTMLInputElement | null>(null)
  const previewMapRef = useRef<HTMLDivElement | null>(null)

  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }))

  useEffect(() => {
    if (!listing) {
      return
    }

    setForm({
      name: listing.name,
      propertyType: listing.propertyType === "Condo" ? "condo" : "apartment",
      nearUniversity: listing.nearUniversity,
      locationSearch: listing.address ?? listing.location,
      manualLocation: "",
      price: String(listing.price),
      roomType: listing.roomType,
      bedrooms: String(listing.bedrooms),
      bathrooms: String(listing.bathrooms),
      size: listing.size,
      availabilityStatus: listing.availabilityStatus,
      facilities: listing.facilities.join(", "),
      ownerName: listing.ownerName,
      ownerContact: listing.ownerContact,
      description: listing.description,
    })
    setPhotos(listing.gallery.map((url, index) => ({ url, path: `existing-${listing.id}-${index}` })))

    if (listing.latitude !== undefined && listing.longitude !== undefined) {
      setSelectedPlace({
        placeId: listing.googlePlaceId ?? "",
        displayName: listing.location,
        formattedAddress: listing.address ?? listing.location,
        latitude: listing.latitude,
        longitude: listing.longitude,
        googleMapsUrl: listing.googleMapsUrl ?? googleMapsUrlFromCoordinates(listing.latitude, listing.longitude),
      })
      setLocationConfirmed(true)
    }
  }, [listing])

  useEffect(() => {
    let cancelled = false
    let listener: google.maps.MapsEventListener | null = null

    loadGooglePlaces()
      .then(() => {
        const input = locationInputRef.current
        if (cancelled || !input) {
          return
        }

        const rangsitBounds = new google.maps.LatLngBounds(
          { lat: 13.84, lng: 100.44 },
          { lat: 14.16, lng: 100.78 },
        )
        const autocomplete = new google.maps.places.Autocomplete(input, {
          bounds: rangsitBounds,
          componentRestrictions: { country: "th" },
          fields: ["place_id", "name", "formatted_address", "geometry", "url"],
          strictBounds: false,
        })

        listener = autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace()
          const latitude = place.geometry?.location?.lat()
          const longitude = place.geometry?.location?.lng()

          if (!place.place_id || latitude === undefined || longitude === undefined) {
            setLocationError("Select a Google suggestion that includes a map location.")
            setSelectedPlace(null)
            setLocationConfirmed(false)
            return
          }

          const displayName = place.name ?? "Selected location"
          const formattedAddress = place.formatted_address ?? displayName
          const nextPlace = {
            placeId: place.place_id,
            displayName,
            formattedAddress,
            latitude,
            longitude,
            googleMapsUrl: place.url ?? googleMapsPlaceUrl(place.place_id),
          }

          setSelectedPlace(nextPlace)
          setLocationConfirmed(false)
          setLocationError("")
          setForm((current) => ({
            ...current,
            name: current.name || displayName,
            locationSearch: formattedAddress,
            manualLocation: "",
          }))
        })

        setPlacesReady(true)
      })
      .catch(() => {
        if (!cancelled) {
          setLocationError("Google Places is unavailable. Check your API key, enabled APIs, and browser restrictions.")
        }
      })

    return () => {
      cancelled = true
      listener?.remove()
    }
  }, [])

  useEffect(() => {
    if (!selectedPlace || !previewMapRef.current) {
      return
    }

    let cancelled = false
    let marker: google.maps.Marker | null = null

    loadGoogleMaps()
      .then(({ Map, Marker }) => {
        if (cancelled || !previewMapRef.current) {
          return
        }

        const position = { lat: selectedPlace.latitude, lng: selectedPlace.longitude }
        const map = new Map(previewMapRef.current, {
          center: position,
          zoom: 17,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          clickableIcons: false,
        })
        marker = new Marker({ map, position, title: selectedPlace.displayName })
      })
      .catch(() => setLocationError("Map preview could not load. Check your Google Maps API key."))

    return () => {
      cancelled = true
      marker?.setMap(null)
    }
  }, [selectedPlace])

  const useManualLocation = () => {
    const parsed = parseGoogleMapsLocation(form.manualLocation)
    if (!parsed) {
      setLocationError("Enter raw coordinates like 13.9649,100.6059 or a Google Maps link containing @lat,lng.")
      setSelectedPlace(null)
      setLocationConfirmed(false)
      return
    }

    setSelectedPlace({
      placeId: "",
      displayName: form.locationSearch.trim() || "Manual map location",
      formattedAddress: form.locationSearch.trim() || `${parsed.latitude}, ${parsed.longitude}`,
      latitude: parsed.latitude,
      longitude: parsed.longitude,
      googleMapsUrl: googleMapsUrlFromCoordinates(parsed.latitude, parsed.longitude),
    })
    setLocationConfirmed(false)
    setLocationError("")
  }

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {}
    const required: Array<keyof FormState> = ["name", "propertyType", "nearUniversity", "locationSearch", "price", "roomType", "size", "ownerName", "ownerContact", "description"]

    required.forEach((key) => {
      if (!form[key].trim()) {
        nextErrors[key] = "This field is required."
      }
    })

    if (form.price && Number(form.price) <= 0) {
      nextErrors.price = "Price must be greater than 0."
    }

    if (!selectedPlace) {
      nextErrors.locationSearch = "Select a Google suggestion or use manual coordinates."
    } else if (!locationConfirmed) {
      nextErrors.locationSearch = "Confirm the map marker before submitting."
    }

    if (photos.length === 0) {
      setPhotoError("Upload at least one room photo.")
    } else {
      setPhotoError("")
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0 && photos.length > 0
  }

  const handlePhotoUpload = async (files: FileList | null) => {
    if (!files?.length) {
      return
    }

    setPhotoError("")
    const selected = Array.from(files)

    if (photos.length + selected.length > 6) {
      setPhotoError("Upload up to 6 photos per listing.")
      return
    }

    const invalid = selected.find((file) => !["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024)
    if (invalid) {
      setPhotoError("Photos must be JPG, PNG, or WebP and 5 MB or smaller.")
      return
    }

    setUploading(true)
    try {
      const uploaded: UploadedListingPhoto[] = []
      for (const file of selected) {
        uploaded.push(await uploadListingPhoto(file))
      }
      setPhotos((current) => [...current, ...uploaded])
    } catch (error) {
      console.error(error)
      setPhotoError("Photo upload failed. Please check the backend and Supabase Storage bucket.")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate() || !selectedPlace) {
      setMessage("")
      return
    }

    setSubmitting(true)
    setMessage("")

    try {
      const payload = {
        name: form.name,
        propertyType: form.propertyType as "condo" | "apartment",
        nearUniversity: form.nearUniversity,
        location: selectedPlace.displayName,
        address: selectedPlace.formattedAddress,
        googleMapsUrl: selectedPlace.googleMapsUrl,
        googlePlaceId: selectedPlace.placeId || undefined,
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
        price: Number(form.price),
        roomType: form.roomType,
        bedrooms: Number(form.bedrooms || 1),
        bathrooms: Number(form.bathrooms || 1),
        size: form.size,
        facilities: form.facilities.split(",").map((facility) => facility.trim()).filter(Boolean),
        availabilityStatus: availabilityToApi[form.availabilityStatus],
        ownerName: form.ownerName,
        ownerContact: form.ownerContact,
        description: form.description,
        photoUrls: photos.map((photo) => photo.url),
      }

      const result = isEditMode && listing
        ? await updateOwnerListing(listing.id, payload)
        : await createListing(payload)

      setMessage(result.message ?? (isEditMode ? "Listing updated and sent for admin review." : "Listing submitted for admin review and saved to Supabase."))
      toast.success(result.message ?? (isEditMode ? "Listing updated." : "Listing submitted for review."))
      if (!isEditMode) {
        setForm(emptyForm)
        setPhotos([])
        setSelectedPlace(null)
        setLocationConfirmed(false)
      }
      await onListingCreated?.()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.")
      console.error(error)
      setMessage(isEditMode ? "Listing update failed. Please check the backend and required fields." : "Listing submission failed. Please check the backend and required fields.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div className="rounded-lg border border-slate-200/80 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
        <PageHeader
          eyebrow="Landlord Panel"
          title={isEditMode ? "Edit Apartment Listing" : "Add New Apartment Listing"}
          description={isEditMode ? "Update listing details, photos, and location. Content edits return the listing to admin review." : "Upload real listing details, photos, and a confirmed Google map location."}
        />
      </div>
      {message ? <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{message}</div> : null}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormSection title="Basic information" description="Name the property and describe the student housing offer.">
          <Field label="Apartment name" error={errors.name}>
            <Input value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Example Residence" />
          </Field>
          <Field label="Property type" error={errors.propertyType}>
            <Select value={form.propertyType} onChange={(event) => update("propertyType", event.target.value)}>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
            </Select>
          </Field>
          <Field label="Near university" error={errors.nearUniversity}>
            <Select value={form.nearUniversity} onChange={(event) => update("nearUniversity", event.target.value)}>
              <option value="Rangsit University">Rangsit University</option>
              <option value="Bangkok University">Bangkok University</option>
            </Select>
          </Field>
          <Field label="Room type" error={errors.roomType}>
            <Select value={form.roomType} onChange={(event) => update("roomType", event.target.value)}>
              <option value="">Select room type</option>
              <option value="Studio">Studio</option>
              <option value="Shared Room">Shared Room</option>
              <option value="Private Room">Private Room</option>
              <option value="One Bedroom">One Bedroom</option>
            </Select>
          </Field>
          <Field label="Room size" error={errors.size}>
            <Input value={form.size} onChange={(event) => update("size", event.target.value)} placeholder="24 sqm" />
          </Field>
          <Field label="Description" error={errors.description} className="md:col-span-3">
            <Textarea value={form.description} onChange={(event) => update("description", event.target.value)} placeholder="Describe the room, commute, facilities, and student fit." />
          </Field>
        </FormSection>

        <FormSection title="Location and price" description="Search Google Places, check the map marker, then confirm the location.">
          <Field label="Apartment name or address" error={errors.locationSearch} className="md:col-span-2">
            <Input
              ref={locationInputRef}
              value={form.locationSearch}
              onChange={(event) => {
                update("locationSearch", event.target.value)
                setSelectedPlace(null)
                setLocationConfirmed(false)
              }}
              placeholder="Search Bundit Apartment or paste a nearby address"
            />
            <p className="mt-1 text-xs text-slate-500">{placesReady ? "Choose a Google suggestion to capture exact coordinates." : "Loading Google Places suggestions..."}</p>
          </Field>
          <Field label="Monthly price" error={errors.price}>
            <Input value={form.price} onChange={(event) => update("price", event.target.value)} type="number" min="0" placeholder="9500" />
          </Field>

          <div className="md:col-span-3">
            {selectedPlace ? (
              <div className="rounded-lg border border-blue-100 bg-white p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-bold text-slate-950">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      {selectedPlace.displayName}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{selectedPlace.formattedAddress}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {selectedPlace.latitude.toFixed(6)}, {selectedPlace.longitude.toFixed(6)}
                    </p>
                  </div>
                  <Button type="button" variant={locationConfirmed ? "outline" : "default"} onClick={() => setLocationConfirmed(true)}>
                    <CheckCircle2 className="h-4 w-4" />
                    {locationConfirmed ? "Location Confirmed" : "Confirm Location"}
                  </Button>
                </div>
                <div ref={previewMapRef} className="mt-4 h-64 w-full rounded-lg bg-slate-100" />
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-5 text-center text-sm text-slate-500">
                Select a Google Places result to preview the listing location.
              </div>
            )}
            {locationError ? <p className="mt-2 text-sm font-semibold text-rose-600">{locationError}</p> : null}
          </div>

          <Field label="Manual fallback coordinates" error={errors.manualLocation} className="md:col-span-2">
            <Input value={form.manualLocation} onChange={(event) => update("manualLocation", event.target.value)} placeholder="13.9649,100.6059 or a Google Maps @lat,lng link" />
          </Field>
          <div className="flex items-end">
            <Button type="button" variant="outline" className="w-full" onClick={useManualLocation}>Use Manual Location</Button>
          </div>
        </FormSection>

        <FormSection title="Room details and facilities" description="Use comma-separated facilities for the listing display.">
          <Field label="Bedrooms">
            <Input value={form.bedrooms} onChange={(event) => update("bedrooms", event.target.value)} type="number" min="0" placeholder="1" />
          </Field>
          <Field label="Bathrooms">
            <Input value={form.bathrooms} onChange={(event) => update("bathrooms", event.target.value)} type="number" min="0" placeholder="1" />
          </Field>
          <Field label="Availability status">
            <Select value={form.availabilityStatus} onChange={(event) => update("availabilityStatus", event.target.value)}>
              <option value="Available">Available</option>
              <option value="Limited">Limited</option>
              <option value="Unavailable">Unavailable</option>
            </Select>
          </Field>
          <Field label="Facilities">
            <Input value={form.facilities} onChange={(event) => update("facilities", event.target.value)} placeholder="Wi-Fi, Laundry, Security" />
          </Field>
        </FormSection>

        <FormSection title="Photos and contact" description="Upload real room photos and provide landlord contact details.">
          <Field label="Landlord name" error={errors.ownerName}>
            <Input value={form.ownerName} onChange={(event) => update("ownerName", event.target.value)} placeholder="Landlord or company name" />
          </Field>
          <Field label="Landlord contact" error={errors.ownerContact}>
            <Input value={form.ownerContact} onChange={(event) => update("ownerContact", event.target.value)} placeholder="landlord@example.com" />
          </Field>
          <div className="md:col-span-3">
            <Label>Room photos</Label>
            <div className="mt-2 rounded-lg border border-dashed border-blue-200 bg-blue-50/50 p-4">
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-blue-100 bg-white px-4 py-6 text-center transition hover:border-blue-300">
                <ImagePlus className="h-7 w-7 text-blue-600" />
                <span className="mt-2 text-sm font-bold text-slate-950">{uploading ? "Uploading photos..." : "Upload room photos"}</span>
                <span className="mt-1 text-xs text-slate-500">JPG, PNG, or WebP. Max 5 MB each, up to 6 photos.</span>
                <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={uploading} onChange={(event) => handlePhotoUpload(event.target.files)} />
              </label>
              {photoError ? <p className="mt-2 text-sm font-semibold text-rose-600">{photoError}</p> : null}
              {photos.length ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {photos.map((photo) => (
                    <div key={photo.path} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                      <img src={photo.url} alt="Uploaded room preview" className="h-32 w-full object-cover" />
                      <div className="flex items-center justify-between gap-2 p-2">
                        <span className="truncate text-xs font-semibold text-slate-500">Uploaded</span>
                        <Button type="button" variant="ghost" size="icon" aria-label="Remove photo" onClick={() => setPhotos((current) => current.filter((item) => item.path !== photo.path))}>
                          <Trash2 className="h-4 w-4 text-rose-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </FormSection>

        <div className="flex flex-wrap justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => setMessage("Draft saved locally for the current browser session only.")}>
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button type="submit" disabled={submitting || uploading}>
            <Send className="h-4 w-4" />
            {submitting ? "Saving…" : isEditMode ? "Update Listing" : "Submit Listing"}
          </Button>
        </div>
      </form>
    </div>
  )
}

type FieldProps = {
  label: string
  error?: string
  className?: string
  children: React.ReactNode
}

function Field({ label, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <div className="mt-2">{children}</div>
      {error ? <p className="mt-1 text-sm font-semibold text-rose-600">{error}</p> : null}
    </div>
  )
}
