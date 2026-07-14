import type { Apartment, ApprovalStatus, AvailabilityStatus, RoommatePost } from "../../data/mockData"

export type ApiAvailabilityStatus = "available" | "limited" | "unavailable" | "taken"
export type ApiApprovalStatus = "approved" | "pending" | "rejected"
export type AuthRole = "student" | "owner" | "admin"

export type AuthProfile = {
  id: string
  authUserId: string
  role: AuthRole
  displayName: string
  email: string
  phone: string | null
  lineId: string | null
}

export type ApiApartment = Omit<Apartment, "propertyType" | "availabilityStatus" | "approvalStatus" | "image" | "gallery"> & {
  propertyType: "condo" | "apartment"
  ownerId: string | null
  availabilityStatus: ApiAvailabilityStatus
  approvalStatus: ApiApprovalStatus
  image: string | null
  gallery: string[]
  latitude: number
  longitude: number
  address: string | null
  googleMapsUrl: string | null
  googlePlaceId: string | null
}

export type ApiRoommatePost = Omit<RoommatePost, "budget"> & {
  budget: number
  budgetMin: number | null
  budgetMax: number
  createdAt: string
}

export type ListingMapMarker = {
  id: string
  name: string
  price: number
  latitude: number
  longitude: number
  distanceFromCampus: number
  availabilityStatus: ApiAvailabilityStatus
  googleMapsUrl: string | null
  googlePlaceId: string | null
}

export type ApiDashboard = {
  metrics: Array<{ id: string; label: string; value: number | string; change?: string; type: "positive" | "neutral" | "warning" }>
  listingStatus: Array<{ name: string; value: number }>
  painPoints: Array<{ name: string; students: number }>
  roommateDemand: Array<{ name: string; demand: number }>
}

export type CreateListingPayload = {
  name: string
  propertyType?: "condo" | "apartment"
  nearUniversity?: string
  location: string
  address?: string
  googleMapsUrl: string
  googlePlaceId?: string
  latitude?: number
  longitude?: number
  distanceFromCampus?: number
  price: number
  roomType: string
  bedrooms?: number
  bathrooms?: number
  size?: string
  facilities?: string[]
  availabilityStatus?: ApiAvailabilityStatus
  ownerName: string
  ownerContact: string
  rating?: number
  description: string
  image?: string
  photoUrls?: string[]
}

export type CreateRoommatePostPayload = {
  title: string
  nearUniversity: string
  budgetMin?: number
  budgetMax: number
  moveInDate: string
  locationPreference: string
  lifestyleTags?: string[]
  description: string
}

export type AppNotification = {
  id: string
  type: "listing_approved" | "listing_rejected" | "roommate_approved" | "roommate_rejected"
  title: string
  message: string
  link: string | null
  createdAt: string
  readAt: string | null
}

export type MessageConversation = {
  kind: "listing" | "roommate"
  listingId: string
  listingName: string
  studentId: string
  studentName: string
  landlordId: string
  landlordName: string
  counterpartName: string
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
}

export type ListingMessage = {
  id: string
  listingId: string
  studentId: string
  landlordId: string
  senderId: string
  senderName: string
  body: string
  createdAt: string
  readAt: string | null
}

export type MessageThread = {
  kind: "listing" | "roommate"
  listingId: string
  listingName: string
  studentId: string
  studentName: string
  landlordId: string
  landlordName: string
  counterpartName: string
  messages: ListingMessage[]
}

const availabilityToUi: Record<ApiAvailabilityStatus, AvailabilityStatus> = {
  available: "Available",
  limited: "Limited",
  unavailable: "Unavailable",
  taken: "Unavailable",
}

const availabilityToApi: Record<AvailabilityStatus, ApiAvailabilityStatus> = {
  Available: "available",
  Limited: "limited",
  Unavailable: "unavailable",
}

const approvalToUi: Record<ApiApprovalStatus, ApprovalStatus> = {
  approved: "Approved",
  pending: "Pending",
  rejected: "Rejected",
}

const approvalToApi: Record<ApprovalStatus, ApiApprovalStatus> = {
  Approved: "approved",
  Pending: "pending",
  Rejected: "rejected",
}

export const mapApartmentFromApi = (apartment: ApiApartment): Apartment => ({
  ...apartment,
  propertyType: apartment.propertyType === "condo" ? "Condo" : "Apartment",
  availabilityStatus: availabilityToUi[apartment.availabilityStatus],
  approvalStatus: approvalToUi[apartment.approvalStatus],
  image: apartment.image ?? apartment.gallery[0] ?? "",
  gallery: apartment.gallery.length ? apartment.gallery : apartment.image ? [apartment.image] : [],
})

export const mapRoommatePostFromApi = (post: ApiRoommatePost): RoommatePost => ({
  id: post.id,
  studentId: post.studentId,
  title: post.title,
  posterName: post.posterName,
  posterEmail: post.posterEmail,
  posterPhone: post.posterPhone,
  posterLineId: post.posterLineId,
  nearUniversity: post.nearUniversity,
  budgetMin: post.budgetMin,
  budget: post.budget,
  moveInDate: post.moveInDate,
  locationPreference: post.locationPreference,
  lifestyleTags: post.lifestyleTags,
  description: post.description,
  status: post.status,
  approvalStatus: post.approvalStatus,
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
  expiresAt: post.expiresAt,
})

export const toApiAvailability = (status: AvailabilityStatus) => availabilityToApi[status]
export const toApiApproval = (status: ApprovalStatus) => approvalToApi[status]
