import type { User } from "@supabase/supabase-js"
import type { AuthProfile } from "./auth.js"

declare global {
  namespace Express {
    interface Request {
      auth?: {
        profile: AuthProfile
        user: User
      }
    }
  }
}

export {}
