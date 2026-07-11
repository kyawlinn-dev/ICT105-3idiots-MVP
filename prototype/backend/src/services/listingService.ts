import type { PostgrestError } from "@supabase/supabase-js"
import { ServiceError } from "../lib/serviceError.js"
import type { ApartmentListing, ListingMapMarker, ListingPhoto } from "../types/listing.js"
import type { CreateListingInput, ListingFilters, UpdateApprovalInput, UpdateAvailabilityInput, UpdateListingInput } from "../validation/listingSchemas.js"
import { requireSupabaseClient } from "./supabaseClient.js"

type ListingPhotoRow = {
  id: string
  image_url: string
  alt_text: string
  sort_order: number
}

type ListingRow = {
  id: string
  name: string
  property_type: "condo" | "apartment"
  owner_id: string | null
  near_university: string
  location: string
  address: string | null
  google_maps_url: string | null
  google_place_id: string | null
  latitude: string | number
  longitude: string | number
  distance_from_campus: string | number
  price: number
  room_type: string
  bedrooms: number
  bathrooms: number
  size: string
  facilities: string[]
  availability_status: ApartmentListing["availabilityStatus"]
  approval_status: ApartmentListing["approvalStatus"]
  owner_name: string
  owner_contact: string
  rating: string | number | null
  description: string
  listing_photos?: ListingPhotoRow[]
}

const listingSelect = `
  id,
  name,
  property_type,
  owner_id,
  near_university,
  location,
  address,
  google_maps_url,
  google_place_id,
  latitude,
  longitude,
  distance_from_campus,
  price,
  room_type,
  bedrooms,
  bathrooms,
  size,
  facilities,
  availability_status,
  approval_status,
  owner_name,
  owner_contact,
  rating,
  description,
  listing_photos (
    id,
    image_url,
    alt_text,
    sort_order
  )
`

const normalizeNumber = (value: string | number | null) => {
  if (value === null) {
    return null
  }

  return typeof value === "number" ? value : Number(value)
}

const mapPhoto = (photo: ListingPhotoRow): ListingPhoto => ({
  id: photo.id,
  imageUrl: photo.image_url,
  altText: photo.alt_text,
  sortOrder: photo.sort_order,
})

const mapListing = (row: ListingRow): ApartmentListing => {
  const photos = [...(row.listing_photos ?? [])].sort((a, b) => a.sort_order - b.sort_order).map(mapPhoto)

  return {
    id: row.id,
    name: row.name,
    propertyType: row.property_type,
    ownerId: row.owner_id,
    nearUniversity: row.near_university,
    location: row.location,
    address: row.address,
    googleMapsUrl: row.google_maps_url,
    googlePlaceId: row.google_place_id,
    latitude: normalizeNumber(row.latitude) ?? 0,
    longitude: normalizeNumber(row.longitude) ?? 0,
    distanceFromCampus: normalizeNumber(row.distance_from_campus) ?? 0,
    price: row.price,
    roomType: row.room_type,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    size: row.size,
    facilities: row.facilities,
    availabilityStatus: row.availability_status,
    approvalStatus: row.approval_status,
    ownerName: row.owner_name,
    ownerContact: row.owner_contact,
    rating: normalizeNumber(row.rating),
    description: row.description,
    image: photos[0]?.imageUrl ?? null,
    gallery: photos.map((photo) => photo.imageUrl),
    photos,
  }
}

const handleSupabaseError = (error: PostgrestError | null) => {
  if (error) {
    throw new ServiceError(500, error.message)
  }
}

const listingInsertFromInput = (input: CreateListingInput, ownerId: string) => ({
  id: `apt-${crypto.randomUUID()}`,
  name: input.name,
  property_type: input.propertyType,
  owner_id: ownerId,
  near_university: input.nearUniversity,
  location: input.location,
  address: input.address ?? input.location,
  google_maps_url: input.googleMapsUrl,
  google_place_id: input.googlePlaceId,
  latitude: input.latitude,
  longitude: input.longitude,
  distance_from_campus: input.distanceFromCampus,
  price: input.price,
  room_type: input.roomType,
  bedrooms: input.bedrooms,
  bathrooms: input.bathrooms,
  size: input.size,
  facilities: input.facilities,
  availability_status: input.availabilityStatus,
  approval_status: "pending",
  owner_name: input.ownerName,
  owner_contact: input.ownerContact,
  rating: input.rating,
  description: input.description,
})

const listingUpdateFromInput = (input: UpdateListingInput) => ({
  name: input.name,
  property_type: input.propertyType,
  near_university: input.nearUniversity,
  location: input.location,
  address: input.address ?? input.location,
  google_maps_url: input.googleMapsUrl,
  google_place_id: input.googlePlaceId,
  latitude: input.latitude,
  longitude: input.longitude,
  distance_from_campus: input.distanceFromCampus,
  price: input.price,
  room_type: input.roomType,
  bedrooms: input.bedrooms,
  bathrooms: input.bathrooms,
  size: input.size,
  facilities: input.facilities,
  availability_status: input.availabilityStatus,
  approval_status: "pending" as const,
  owner_name: input.ownerName,
  owner_contact: input.ownerContact,
  rating: input.rating,
  description: input.description,
})

const replaceListingPhotos = async (listingId: string, listingName: string, photoUrls: string[]) => {
  const supabase = requireSupabaseClient()
  const { error: deleteError } = await supabase.from("listing_photos").delete().eq("listing_id", listingId)
  handleSupabaseError(deleteError)

  if (!photoUrls.length) {
    return
  }

  const { error: photoError } = await supabase.from("listing_photos").insert(
    photoUrls.map((imageUrl, index) => ({
      id: `photo-${listingId}-${crypto.randomUUID()}`,
      listing_id: listingId,
      image_url: imageUrl,
      alt_text: `${listingName} room view ${index + 1}`,
      sort_order: index + 1,
    })),
  )
  handleSupabaseError(photoError)
}

export const getListings = async (filters: ListingFilters) => {
  const supabase = requireSupabaseClient()
  let query = supabase
    .from("apartment_listings")
    .select(listingSelect)
    .order("price", { ascending: true })

  if (filters.approvalStatus) {
    query = query.eq("approval_status", filters.approvalStatus)
  }

  if (filters.q) {
    const term = filters.q.replaceAll(",", " ")
    query = query.or(`name.ilike.%${term}%,location.ilike.%${term}%,near_university.ilike.%${term}%`)
  }

  if (filters.location) {
    query = query.ilike("location", `%${filters.location}%`)
  }

  if (filters.minPrice !== undefined) {
    query = query.gte("price", filters.minPrice)
  }

  if (filters.maxPrice !== undefined) {
    query = query.lte("price", filters.maxPrice)
  }

  if (filters.maxDistance !== undefined) {
    query = query.lte("distance_from_campus", filters.maxDistance)
  }

  if (filters.roomType) {
    query = query.eq("room_type", filters.roomType)
  }

  if (filters.facilities?.length) {
    query = query.contains("facilities", filters.facilities)
  }

  if (filters.availabilityStatus) {
    query = query.eq("availability_status", filters.availabilityStatus)
  }

  const { data, error } = await query
  handleSupabaseError(error)

  return (data as ListingRow[] | null)?.map(mapListing) ?? []
}

export const createListing = async (input: CreateListingInput, ownerId: string) => {
  const supabase = requireSupabaseClient()
  const listingRow = listingInsertFromInput(input, ownerId)
  const { data, error } = await supabase.from("apartment_listings").insert(listingRow).select(listingSelect).single()

  handleSupabaseError(error)

  const photoUrls = input.photoUrls.length ? input.photoUrls : input.image ? [input.image] : []
  await replaceListingPhotos(listingRow.id, input.name, photoUrls)

  return getListingById((data as ListingRow).id)
}

export const getOwnerListings = async (ownerId: string) => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase
    .from("apartment_listings")
    .select(listingSelect)
    .eq("owner_id", ownerId)
    .order("created_at", { ascending: false })

  handleSupabaseError(error)

  return (data as ListingRow[] | null)?.map(mapListing) ?? []
}

export const getListingById = async (id: string) => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase.from("apartment_listings").select(listingSelect).eq("id", id).maybeSingle()

  handleSupabaseError(error)

  if (!data) {
    throw new ServiceError(404, "Apartment listing not found.")
  }

  return mapListing(data as ListingRow)
}

export const updateListingAvailability = async (id: string, input: UpdateAvailabilityInput, ownerId?: string) => {
  const supabase = requireSupabaseClient()
  let query = supabase
    .from("apartment_listings")
    .update({ availability_status: input.availabilityStatus })
    .eq("id", id)

  if (ownerId) {
    query = query.eq("owner_id", ownerId)
  }

  const { data, error } = await query
    .select(listingSelect)
    .maybeSingle()

  handleSupabaseError(error)

  if (!data) {
    throw new ServiceError(404, "Apartment listing not found.")
  }

  return mapListing(data as ListingRow)
}

export const updateOwnerListing = async (id: string, input: UpdateListingInput, ownerId: string) => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase
    .from("apartment_listings")
    .update(listingUpdateFromInput(input))
    .eq("id", id)
    .eq("owner_id", ownerId)
    .select(listingSelect)
    .maybeSingle()

  handleSupabaseError(error)

  if (!data) {
    throw new ServiceError(404, "Apartment listing not found.")
  }

  const photoUrls = input.photoUrls.length ? input.photoUrls : input.image ? [input.image] : []
  await replaceListingPhotos(id, input.name, photoUrls)

  return getListingById(id)
}

export const updateListingApproval = async (id: string, input: UpdateApprovalInput) => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase
    .from("apartment_listings")
    .update({ approval_status: input.approvalStatus })
    .eq("id", id)
    .select(listingSelect)
    .maybeSingle()

  handleSupabaseError(error)

  if (!data) {
    throw new ServiceError(404, "Apartment listing not found.")
  }

  const { error: logError } = await supabase.from("admin_action_logs").insert({
    admin_id: "admin-demo",
    listing_id: id,
    action: input.approvalStatus,
    note: input.note,
  })
  handleSupabaseError(logError)

  return mapListing(data as ListingRow)
}

export const deleteListing = async (id: string) => {
  const supabase = requireSupabaseClient()
  const { error } = await supabase.from("apartment_listings").delete().eq("id", id)

  handleSupabaseError(error)

  return { id }
}

export const getAvailableListingLocations = async (): Promise<ListingMapMarker[]> => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase
    .from("apartment_listings")
    .select("id, name, price, google_maps_url, google_place_id, latitude, longitude, distance_from_campus, availability_status")
    .eq("approval_status", "approved")
    .eq("availability_status", "available")
    .order("distance_from_campus", { ascending: true })

  handleSupabaseError(error)

  return (
    data?.map((row) => ({
      id: row.id,
      name: row.name,
      price: row.price,
      googleMapsUrl: row.google_maps_url,
      googlePlaceId: row.google_place_id,
      latitude: normalizeNumber(row.latitude) ?? 0,
      longitude: normalizeNumber(row.longitude) ?? 0,
      distanceFromCampus: normalizeNumber(row.distance_from_campus) ?? 0,
      availabilityStatus: row.availability_status,
    })) ?? []
  )
}

export const getListingLocation = async (id: string): Promise<ListingMapMarker> => {
  const listing = await getListingById(id)

  return {
    id: listing.id,
    name: listing.name,
    price: listing.price,
    latitude: listing.latitude,
    longitude: listing.longitude,
    distanceFromCampus: listing.distanceFromCampus,
    availabilityStatus: listing.availabilityStatus,
    googleMapsUrl: listing.googleMapsUrl,
    googlePlaceId: listing.googlePlaceId,
  }
}
