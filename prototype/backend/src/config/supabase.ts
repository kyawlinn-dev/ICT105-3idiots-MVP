import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { env, hasSupabaseConfig } from "./env.js"

let client: SupabaseClient | null = null
let authClient: SupabaseClient | null = null

export const getSupabaseClient = () => {
  if (!hasSupabaseConfig) {
    return null
  }

  if (!client) {
    client = createClient(env.supabaseUrl!, env.supabaseSecretKey!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  }

  return client
}

export const getSupabaseAuthClient = () => {
  if (!env.supabaseUrl || !(env.supabaseAnonKey || env.supabaseSecretKey)) {
    return null
  }

  if (!authClient) {
    authClient = createClient(env.supabaseUrl, env.supabaseAnonKey ?? env.supabaseSecretKey!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  }

  return authClient
}
