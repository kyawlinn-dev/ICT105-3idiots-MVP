import type { RequestHandler } from "express"
import { accessTokenCookieName, refreshTokenCookieName } from "../lib/authCookies.js"
import { ServiceError } from "../lib/serviceError.js"
import type { UserRole } from "../types/auth.js"
import { getSessionProfile } from "../services/authService.js"

export const requireAuth: RequestHandler = async (req, res, next) => {
  try {
    const session = await getSessionProfile(req.cookies?.[accessTokenCookieName], req.cookies?.[refreshTokenCookieName], res)
    if (!session) {
      throw new ServiceError(401, "Please sign in to continue.")
    }

    req.auth = session
    next()
  } catch (error) {
    next(error)
  }
}

export const optionalAuth: RequestHandler = async (req, res, next) => {
  try {
    const session = await getSessionProfile(req.cookies?.[accessTokenCookieName], req.cookies?.[refreshTokenCookieName], res)
    if (session) {
      req.auth = session
    }
    next()
  } catch (error) {
    next(error)
  }
}

export const requireRole = (roles: UserRole[]): RequestHandler => {
  return (req, _res, next) => {
    if (!req.auth) {
      next(new ServiceError(401, "Please sign in to continue."))
      return
    }

    if (!roles.includes(req.auth.profile.role)) {
      next(new ServiceError(403, "You do not have access to this action."))
      return
    }

    next()
  }
}
