import type { Response } from "express"
import type { Session } from "@supabase/supabase-js"
import { env } from "../config/env.js"

export const accessTokenCookieName = "sap_access_token"
export const refreshTokenCookieName = "sap_refresh_token"

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: env.nodeEnv === "production",
  path: "/",
}

export const setAuthCookies = (res: Response, session: Session) => {
  res.cookie(accessTokenCookieName, session.access_token, {
    ...cookieOptions,
    maxAge: Math.max(session.expires_in - 30, 60) * 1000,
  })
  res.cookie(refreshTokenCookieName, session.refresh_token, {
    ...cookieOptions,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  })
}

export const clearAuthCookies = (res: Response) => {
  res.clearCookie(accessTokenCookieName, cookieOptions)
  res.clearCookie(refreshTokenCookieName, cookieOptions)
}
