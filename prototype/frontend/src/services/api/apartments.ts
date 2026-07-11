import type { ApprovalStatus, AvailabilityStatus } from "../../data/mockData"
import { apiRequest, buildQuery } from "./client"
import {
  mapApartmentFromApi,
  toApiApproval,
  toApiAvailability,
  type ApiApartment,
  type CreateListingPayload,
  type ListingMapMarker,
} from "./types"

export const getListings = async (filters: Record<string, string | number | undefined> = {}) => {
  const response = await apiRequest<ApiApartment[]>(`/listings${buildQuery(filters)}`)
  return response.data.map(mapApartmentFromApi)
}

export const getAdminListings = async (filters: Record<string, string | number | undefined> = {}) => {
  const response = await apiRequest<ApiApartment[]>(`/admin/listings${buildQuery(filters)}`)
  return response.data.map(mapApartmentFromApi)
}

export const getOwnerListings = async () => {
  const response = await apiRequest<ApiApartment[]>("/owner/listings")
  return response.data.map(mapApartmentFromApi)
}

export const getListingById = async (id: string) => {
  const response = await apiRequest<ApiApartment>(`/listings/${id}`)
  return mapApartmentFromApi(response.data)
}

export const createListing = async (payload: CreateListingPayload) => {
  const response = await apiRequest<ApiApartment>("/listings", {
    method: "POST",
    body: JSON.stringify(payload),
  })
  return {
    listing: mapApartmentFromApi(response.data),
    message: response.message,
  }
}

export const updateOwnerListing = async (id: string, payload: CreateListingPayload) => {
  const response = await apiRequest<ApiApartment>(`/owner/listings/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  })
  return {
    listing: mapApartmentFromApi(response.data),
    message: response.message,
  }
}

export const updateListingAvailability = async (id: string, status: AvailabilityStatus) => {
  const response = await apiRequest<ApiApartment>(`/listings/${id}/availability`, {
    method: "PATCH",
    body: JSON.stringify({ availabilityStatus: toApiAvailability(status) }),
  })
  return mapApartmentFromApi(response.data)
}

export const updateListingApproval = async (id: string, status: ApprovalStatus) => {
  const response = await apiRequest<ApiApartment>(`/admin/listings/${id}/approval`, {
    method: "PATCH",
    body: JSON.stringify({ approvalStatus: toApiApproval(status) }),
  })
  return mapApartmentFromApi(response.data)
}

export const deleteListing = async (id: string) => {
  await apiRequest<{ id: string }>(`/admin/listings/${id}`, {
    method: "DELETE",
  })
}

export const getListingMapMarkers = async () => {
  const response = await apiRequest<ListingMapMarker[]>("/maps/listing-locations")
  return response.data
}

export const getListingMapMarker = async (id: string) => {
  const response = await apiRequest<ListingMapMarker>(`/maps/listing-locations/${id}`)
  return response.data
}
