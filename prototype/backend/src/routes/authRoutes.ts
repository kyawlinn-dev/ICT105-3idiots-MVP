import { Router } from "express"
import { z } from "zod"
import { clearAuthCookies, setAuthCookies, accessTokenCookieName, refreshTokenCookieName } from "../lib/authCookies.js"
import { sendData } from "../lib/apiResponse.js"
import { getSessionProfile, signIn, signUp } from "../services/authService.js"

export const authRoutes = Router()

const email = z.string().trim().email("Enter a valid email address.")
const password = z.string().min(8, "Password must be at least 8 characters.")

const signUpSchema = z.object({
  role: z.enum(["student", "owner"]),
  displayName: z.string().trim().min(1, "Name is required."),
  email,
  password,
  phone: z.string().trim().optional(),
  lineId: z.string().trim().optional(),
})

const signInSchema = z.object({
  role: z.enum(["student", "owner", "admin"]),
  email,
  password: z.string().min(1, "Password is required."),
})

authRoutes.post("/auth/sign-up", async (req, res, next) => {
  try {
    const input = signUpSchema.parse(req.body)
    const { profile, session } = await signUp(input)
    setAuthCookies(res, session)
    sendData(res.status(201), profile, "Account created.")
  } catch (error) {
    next(error)
  }
})

authRoutes.post("/auth/sign-in", async (req, res, next) => {
  try {
    const input = signInSchema.parse(req.body)
    const { profile, session } = await signIn({ email: input.email, password: input.password, expectedRole: input.role })
    setAuthCookies(res, session)
    sendData(res, profile, "Signed in.")
  } catch (error) {
    next(error)
  }
})

authRoutes.post("/auth/sign-out", (_req, res) => {
  clearAuthCookies(res)
  sendData(res, { signedOut: true }, "Signed out.")
})

authRoutes.get("/auth/me", async (req, res, next) => {
  try {
    const session = await getSessionProfile(req.cookies?.[accessTokenCookieName], req.cookies?.[refreshTokenCookieName], res)
    if (!session) {
      clearAuthCookies(res)
    }
    sendData(res, session?.profile ?? null)
  } catch (error) {
    next(error)
  }
})
