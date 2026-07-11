import { ServiceError } from "../lib/serviceError.js"
import { getListingById } from "./listingService.js"
import { requireSupabaseClient } from "./supabaseClient.js"

export const getSavedListings = async (userId: string) => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase.from("saved_listings").select("listing_id").eq("user_id", userId)

  if (error) {
    throw new ServiceError(500, error.message)
  }

  const ids = data?.map((item) => item.listing_id) ?? []
  const listings = await Promise.all(ids.map((id) => getListingById(id)))

  return { ids, listings }
}

export const saveListing = async (userId: string, listingId: string) => {
  const supabase = requireSupabaseClient()
  const { error } = await supabase.from("saved_listings").upsert({ user_id: userId, listing_id: listingId }, { onConflict: "user_id,listing_id" })

  if (error) {
    throw new ServiceError(500, error.message)
  }

  return getSavedListings(userId)
}

export const removeSavedListing = async (userId: string, listingId: string) => {
  const supabase = requireSupabaseClient()
  const { error } = await supabase.from("saved_listings").delete().eq("user_id", userId).eq("listing_id", listingId)

  if (error) {
    throw new ServiceError(500, error.message)
  }

  return getSavedListings(userId)
}
