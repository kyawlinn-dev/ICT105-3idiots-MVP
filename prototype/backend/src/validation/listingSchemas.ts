import { z } from "zod"

const optionalNumberFromQuery = z
  .string()
  .trim()
  .optional()
  .transform((value) => {
    if (!value) {
      return undefined
    }

    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : Number.NaN
  })
  .refine((value) => value === undefined || !Number.isNaN(value), "Must be a valid number")

const commaList = z
  .string()
  .optional()
  .transform((value) => value?.split(",").map((item) => item.trim()).filter(Boolean) ?? undefined)

export const listingFiltersSchema = z.object({
  q: z.string().trim().optional(),
  location: z.string().trim().optional(),
  minPrice: optionalNumberFromQuery,
  maxPrice: optionalNumberFromQuery,
  maxDistance: optionalNumberFromQuery,
  roomType: z.string().trim().optional(),
  facilities: commaList,
  availabilityStatus: z.enum(["available", "limited", "unavailable", "taken"]).optional(),
  approvalStatus: z.enum(["approved", "pending", "rejected"]).optional(),
})

export type ListingFilters = z.infer<typeof listingFiltersSchema>

const numberFromBody = z.coerce.number().finite()
const optionalNumberFromBody = z.coerce.number().finite().optional()

const isGoogleMapsUrl = (value: string) => {
  try {
    const host = new URL(value).hostname.toLowerCase()
    return host === "goo.gl" || host.endsWith(".goo.gl") || host === "google.com" || host.endsWith(".google.com")
  } catch {
    return false
  }
}

export const createListingSchema = z.object({
  name: z.string().trim().min(1, "Apartment name is required."),
  propertyType: z.enum(["condo", "apartment"]).default("apartment"),
  nearUniversity: z.string().trim().min(1).default("Rangsit University"),
  location: z.string().trim().min(1, "Location is required."),
  address: z.string().trim().optional(),
  googleMapsUrl: z.string().trim().url("Google Maps location link must be a valid URL.").refine(isGoogleMapsUrl, "Please provide a Google Maps location URL."),
  googlePlaceId: z.string().trim().optional(),
  latitude: numberFromBody.refine((value) => value >= -90 && value <= 90, "Latitude must be between -90 and 90."),
  longitude: numberFromBody.refine((value) => value >= -180 && value <= 180, "Longitude must be between -180 and 180."),
  distanceFromCampus: numberFromBody.default(1.5),
  price: numberFromBody.refine((value) => value > 0, "Price must be greater than 0."),
  roomType: z.string().trim().min(1, "Room type is required."),
  bedrooms: optionalNumberFromBody.default(1),
  bathrooms: optionalNumberFromBody.default(1),
  size: z.string().trim().min(1).default("24 sqm"),
  facilities: z.array(z.string().trim().min(1)).default([]),
  availabilityStatus: z.enum(["available", "limited", "unavailable", "taken"]).default("available"),
  ownerName: z.string().trim().min(1, "Owner name is required."),
  ownerContact: z.string().trim().min(1, "Owner contact is required."),
  rating: optionalNumberFromBody.default(4.1),
  description: z.string().trim().min(1, "Description is required."),
  image: z.string().url().optional(),
  photoUrls: z.array(z.string().url()).max(6, "Upload up to 6 photos.").default([]),
})

export const updateAvailabilitySchema = z.object({
  availabilityStatus: z.enum(["available", "limited", "unavailable", "taken"]),
})

export const updateListingSchema = createListingSchema

export const updateApprovalSchema = z.object({
  approvalStatus: z.enum(["approved", "pending", "rejected"]),
  note: z.string().trim().optional(),
})

export type CreateListingInput = z.infer<typeof createListingSchema>
export type UpdateListingInput = z.infer<typeof updateListingSchema>
export type UpdateAvailabilityInput = z.infer<typeof updateAvailabilitySchema>
export type UpdateApprovalInput = z.infer<typeof updateApprovalSchema>
