import { apiRequest } from "./client"
import type { AuthProfile, AuthRole } from "./types"

type SignInPayload = {
  role: AuthRole
  email: string
  password: string
}

type SignUpPayload = {
  role: "student" | "owner"
  displayName: string
  email: string
  password: string
  phone?: string
  lineId?: string
}

export const getCurrentUser = async () => {
  const response = await apiRequest<AuthProfile | null>("/auth/me")
  return response.data
}

export const signIn = async (payload: SignInPayload) => {
  const response = await apiRequest<AuthProfile>("/auth/sign-in", {
    method: "POST",
    body: JSON.stringify(payload),
  })
  return response.data
}

export const signUp = async (payload: SignUpPayload) => {
  const response = await apiRequest<AuthProfile>("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(payload),
  })
  return response.data
}

export const signOut = async () => {
  await apiRequest<{ signedOut: boolean }>("/auth/sign-out", {
    method: "POST",
  })
}
