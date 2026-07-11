export type AvailabilityStatus = "available" | "limited" | "unavailable" | "taken"
export type ApprovalStatus = "approved" | "pending" | "rejected"

export type ListingPhoto = {
  id: string
  imageUrl: string
  altText: string
  sortOrder: number
}

export type ApartmentListing = {
  id: string
  name: string
  propertyType: "condo" | "apartment"
  ownerId: string | null
  nearUniversity: string
  location: string
  address: string | null
  googleMapsUrl: string | null
  googlePlaceId: string | null
  latitude: number
  longitude: number
  distanceFromCampus: number
  price: number
  roomType: string
  bedrooms: number
  bathrooms: number
  size: string
  facilities: string[]
  availabilityStatus: AvailabilityStatus
  approvalStatus: ApprovalStatus
  ownerName: string
  ownerContact: string
  rating: number | null
  description: string
  image: string | null
  gallery: string[]
  photos: ListingPhoto[]
}

export type ListingMapMarker = {
  id: string
  name: string
  price: number
  latitude: number
  longitude: number
  distanceFromCampus: number
  availabilityStatus: AvailabilityStatus
  googleMapsUrl: string | null
  googlePlaceId: string | null
}
