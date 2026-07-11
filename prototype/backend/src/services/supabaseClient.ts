import { getSupabaseClient } from "../config/supabase.js"
import { ServiceError } from "../lib/serviceError.js"

export const requireSupabaseClient = () => {
  const client = getSupabaseClient()

  if (!client) {
    throw new ServiceError(503, "Supabase is not configured for this backend.")
  }

  return client
}
