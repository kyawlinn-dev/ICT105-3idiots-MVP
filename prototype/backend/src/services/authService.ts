import type { Response } from "express"
import type { Session, User } from "@supabase/supabase-js"
import { getSupabaseAuthClient } from "../config/supabase.js"
import { setAuthCookies } from "../lib/authCookies.js"
import { ServiceError } from "../lib/serviceError.js"
import type { AuthProfile, UserRole } from "../types/auth.js"
import { requireSupabaseClient } from "./supabaseClient.js"

type AppUserRow = {
  id: string
  auth_user_id: string | null
  role: UserRole
  display_name: string
  email: string | null
  phone: string | null
  line_id: string | null
}

type SignUpInput = {
  role: Exclude<UserRole, "admin">
  displayName: string
  email: string
  password: string
  phone?: string
  lineId?: string
}

type SignInInput = {
  email: string
  password: string
  expectedRole?: UserRole
}

const normalizeEmail = (email: string) => email.trim().toLowerCase()

const getAuthClient = () => {
  const client = getSupabaseAuthClient()
  if (!client) {
    throw new ServiceError(503, "Supabase Auth is not configured.")
  }

  return client
}

const mapProfile = (row: AppUserRow): AuthProfile => {
  if (!row.auth_user_id) {
    throw new ServiceError(403, "This account is not linked to Supabase Auth yet.")
  }

  return {
    id: row.id,
    authUserId: row.auth_user_id,
    role: row.role,
    displayName: row.display_name,
    email: row.email ?? "",
    phone: row.phone,
    lineId: row.line_id,
  }
}

const findProfileByAuthId = async (authUserId: string) => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase.from("app_users").select("*").eq("auth_user_id", authUserId).maybeSingle()

  if (error) {
    throw new ServiceError(500, error.message)
  }

  return data ? mapProfile(data as AppUserRow) : null
}

const findProfileByEmail = async (email: string) => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase.from("app_users").select("*").eq("email", normalizeEmail(email)).maybeSingle()

  if (error) {
    throw new ServiceError(500, error.message)
  }

  return data as AppUserRow | null
}

const linkProfileToAuthUser = async (row: AppUserRow, user: User) => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase
    .from("app_users")
    .update({ auth_user_id: user.id })
    .eq("id", row.id)
    .select("*")
    .single()

  if (error) {
    throw new ServiceError(500, error.message)
  }

  return mapProfile(data as AppUserRow)
}

const getOrLinkProfileForUser = async (user: User) => {
  const linked = await findProfileByAuthId(user.id)
  if (linked) {
    return linked
  }

  const email = user.email
  if (!email) {
    throw new ServiceError(403, "Authenticated user has no email address.")
  }

  const existing = await findProfileByEmail(email)
  if (!existing) {
    throw new ServiceError(403, "No platform profile exists for this account.")
  }

  if (existing.auth_user_id && existing.auth_user_id !== user.id) {
    throw new ServiceError(403, "This email is already linked to another auth user.")
  }

  return linkProfileToAuthUser(existing, user)
}

const createOrLinkProfile = async (input: SignUpInput, user: User) => {
  const supabase = requireSupabaseClient()
  const email = normalizeEmail(input.email)
  const existing = await findProfileByEmail(email)

  if (existing) {
    if (existing.role !== input.role) {
      throw new ServiceError(409, "An account with this email already exists for another portal.")
    }

    const { data, error } = await supabase
      .from("app_users")
      .update({
        auth_user_id: user.id,
        display_name: input.displayName,
        phone: input.phone ?? existing.phone,
        line_id: input.lineId ?? existing.line_id,
      })
      .eq("id", existing.id)
      .select("*")
      .single()

    if (error) {
      throw new ServiceError(500, error.message)
    }

    return mapProfile(data as AppUserRow)
  }

  const { data, error } = await supabase
    .from("app_users")
    .insert({
      id: `${input.role}-${crypto.randomUUID()}`,
      auth_user_id: user.id,
      role: input.role,
      display_name: input.displayName,
      email,
      phone: input.phone,
      line_id: input.lineId,
    })
    .select("*")
    .single()

  if (error) {
    throw new ServiceError(500, error.message)
  }

  return mapProfile(data as AppUserRow)
}

export const signUp = async (input: SignUpInput) => {
  const supabase = requireSupabaseClient()
  const auth = getAuthClient()
  const email = normalizeEmail(input.email)
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: input.password,
    email_confirm: true,
    user_metadata: {
      display_name: input.displayName,
      role: input.role,
    },
  })

  if (error || !data.user) {
    throw new ServiceError(400, error?.message ?? "Unable to create account.")
  }

  const profile = await createOrLinkProfile({ ...input, email }, data.user)
  const signedIn = await auth.auth.signInWithPassword({ email, password: input.password })

  if (signedIn.error || !signedIn.data.session) {
    throw new ServiceError(401, signedIn.error?.message ?? "Account created, but sign in failed.")
  }

  return { profile, session: signedIn.data.session }
}

export const signIn = async ({ email, password, expectedRole }: SignInInput) => {
  const auth = getAuthClient()
  const signedIn = await auth.auth.signInWithPassword({ email: normalizeEmail(email), password })

  if (signedIn.error || !signedIn.data.session || !signedIn.data.user) {
    throw new ServiceError(401, signedIn.error?.message ?? "Invalid email or password.")
  }

  const profile = await getOrLinkProfileForUser(signedIn.data.user)

  if (expectedRole && profile.role !== expectedRole) {
    throw new ServiceError(403, `This account cannot access the ${expectedRole} portal.`)
  }

  return { profile, session: signedIn.data.session }
}

export const getSessionProfile = async (accessToken: string | undefined, refreshToken: string | undefined, res?: Response) => {
  if (!accessToken && !refreshToken) {
    return null
  }

  const auth = getAuthClient()
  let user: User | null = null
  let refreshedSession: Session | null = null

  if (accessToken) {
    const current = await auth.auth.getUser(accessToken)
    user = current.data.user
  }

  if (!user && refreshToken) {
    const refreshed = await auth.auth.refreshSession({ refresh_token: refreshToken })
    if (refreshed.data.session && refreshed.data.user) {
      refreshedSession = refreshed.data.session
      user = refreshed.data.user
    }
  }

  if (!user) {
    return null
  }

  if (res && refreshedSession) {
    setAuthCookies(res, refreshedSession)
  }

  const profile = await getOrLinkProfileForUser(user)
  return { profile, user }
}
