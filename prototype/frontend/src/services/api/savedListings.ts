import { apiRequest } from "./client"
import { mapApartmentFromApi, type ApiApartment } from "./types"

type SavedListingsResponse = {
  ids: string[]
  listings: ApiApartment[]
}

const mapSaved = (data: SavedListingsResponse) => ({
  ids: data.ids,
  listings: data.listings.map(mapApartmentFromApi),
})

export const getSavedListings = async () => {
  const response = await apiRequest<SavedListingsResponse>("/saved-listings")
  return mapSaved(response.data)
}

export const saveListing = async (listingId: string) => {
  const response = await apiRequest<SavedListingsResponse>("/saved-listings", {
    method: "POST",
    body: JSON.stringify({ listingId }),
  })
  return mapSaved(response.data)
}

export const removeSavedListing = async (listingId: string) => {
  const response = await apiRequest<SavedListingsResponse>(`/saved-listings/${listingId}`, {
    method: "DELETE",
  })
  return mapSaved(response.data)
}
