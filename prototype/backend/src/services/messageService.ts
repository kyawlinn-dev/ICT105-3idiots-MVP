import { ServiceError } from "../lib/serviceError.js"
import type { AuthProfile } from "../types/auth.js"
import type { SendListingMessageInput } from "../validation/messageSchemas.js"
import { requireSupabaseClient } from "./supabaseClient.js"

type MessageRow = {
  id: string
  listing_id: string
  student_id: string
  landlord_id: string
  sender_id: string
  body: string
  created_at: string
  read_at: string | null
}

type ListingRow = {
  id: string
  name: string
  owner_id: string | null
  approval_status: string
}

type UserRow = {
  id: string
  display_name: string
}

const getListings = async (ids: string[]) => {
  if (!ids.length) return new Map<string, ListingRow>()
  const { data, error } = await requireSupabaseClient().from("apartment_listings").select("id, name, owner_id, approval_status").in("id", ids)
  if (error) throw new ServiceError(500, error.message)
  return new Map(((data as ListingRow[] | null) ?? []).map((row) => [row.id, row]))
}

const getUsers = async (ids: string[]) => {
  if (!ids.length) return new Map<string, UserRow>()
  const { data, error } = await requireSupabaseClient().from("app_users").select("id, display_name").in("id", ids)
  if (error) throw new ServiceError(500, error.message)
  return new Map(((data as UserRow[] | null) ?? []).map((row) => [row.id, row]))
}

const mapMessage = (row: MessageRow, users: Map<string, UserRow>) => ({
  id: row.id,
  listingId: row.listing_id,
  studentId: row.student_id,
  landlordId: row.landlord_id,
  senderId: row.sender_id,
  senderName: users.get(row.sender_id)?.display_name ?? "Account user",
  body: row.body,
  createdAt: row.created_at,
  readAt: row.read_at,
})

const resolveThread = async (profile: AuthProfile, listingId: string, requestedStudentId?: string) => {
  const listings = await getListings([listingId])
  const listing = listings.get(listingId)
  if (!listing?.owner_id) throw new ServiceError(404, "Apartment not found.")

  if (profile.role === "student") {
    return { listing, studentId: profile.id, landlordId: listing.owner_id }
  }

  if (profile.role === "owner") {
    if (listing.owner_id !== profile.id) throw new ServiceError(403, "You can only access messages for your apartments.")
    if (!requestedStudentId) throw new ServiceError(400, "Student is required for this conversation.")
    return { listing, studentId: requestedStudentId, landlordId: profile.id }
  }

  throw new ServiceError(403, "This account cannot access apartment messages.")
}

export const getMessageConversations = async (profile: AuthProfile) => {
  const supabase = requireSupabaseClient()
  let query = supabase.from("listing_messages").select("*").order("created_at", { ascending: false })
  query = profile.role === "student" ? query.eq("student_id", profile.id) : query.eq("landlord_id", profile.id)
  const { data, error } = await query
  if (error) throw new ServiceError(500, error.message)

  const rows = (data as MessageRow[] | null) ?? []
  const latestByThread = new Map<string, MessageRow>()
  rows.forEach((row) => {
    const key = `${row.listing_id}:${row.student_id}`
    if (!latestByThread.has(key)) latestByThread.set(key, row)
  })
  const latestRows = Array.from(latestByThread.values())
  const listings = await getListings(Array.from(new Set(latestRows.map((row) => row.listing_id))))
  const users = await getUsers(Array.from(new Set(latestRows.flatMap((row) => [row.student_id, row.landlord_id]))))

  return latestRows.map((row) => ({
    kind: "listing" as const,
    listingId: row.listing_id,
    listingName: listings.get(row.listing_id)?.name ?? "Apartment",
    studentId: row.student_id,
    studentName: users.get(row.student_id)?.display_name ?? "Student",
    landlordId: row.landlord_id,
    landlordName: users.get(row.landlord_id)?.display_name ?? "Landlord",
    counterpartName: profile.role === "student" ? users.get(row.landlord_id)?.display_name ?? "Landlord" : users.get(row.student_id)?.display_name ?? "Student",
    lastMessage: row.body,
    lastMessageAt: row.created_at,
    unreadCount: rows.filter((message) => message.listing_id === row.listing_id && message.student_id === row.student_id && message.sender_id !== profile.id && !message.read_at).length,
  }))
}

export const getMessageThread = async (profile: AuthProfile, listingId: string, requestedStudentId?: string) => {
  const { listing, studentId, landlordId } = await resolveThread(profile, listingId, requestedStudentId)
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase
    .from("listing_messages")
    .select("*")
    .eq("listing_id", listingId)
    .eq("student_id", studentId)
    .eq("landlord_id", landlordId)
    .order("created_at", { ascending: true })
  if (error) throw new ServiceError(500, error.message)

  const rows = (data as MessageRow[] | null) ?? []
  const userIds = Array.from(new Set([...rows.map((row) => row.sender_id), studentId, landlordId]))
  const users = await getUsers(userIds)

  if (rows.some((row) => row.sender_id !== profile.id && !row.read_at)) {
    const { error: readError } = await supabase
      .from("listing_messages")
      .update({ read_at: new Date().toISOString() })
      .eq("listing_id", listingId)
      .eq("student_id", studentId)
      .neq("sender_id", profile.id)
      .is("read_at", null)
    if (readError) throw new ServiceError(500, readError.message)
  }

  return {
    kind: "listing" as const,
    listingId,
    listingName: listing.name,
    studentId,
    studentName: users.get(studentId)?.display_name ?? "Student",
    landlordId,
    landlordName: users.get(landlordId)?.display_name ?? "Landlord",
    counterpartName: profile.role === "student" ? users.get(landlordId)?.display_name ?? "Landlord" : users.get(studentId)?.display_name ?? "Student",
    messages: rows.map((row) => mapMessage(row, users)),
  }
}

export const sendListingMessage = async (profile: AuthProfile, input: SendListingMessageInput) => {
  const { listing, studentId, landlordId } = await resolveThread(profile, input.listingId, input.studentId)
  const supabase = requireSupabaseClient()

  if (profile.role === "student" && listing.approval_status !== "approved") {
    throw new ServiceError(404, "This apartment is not available for messages.")
  }

  if (profile.role === "owner") {
    const { count, error: countError } = await supabase
      .from("listing_messages")
      .select("id", { count: "exact", head: true })
      .eq("listing_id", input.listingId)
      .eq("student_id", studentId)
      .eq("landlord_id", landlordId)
    if (countError) throw new ServiceError(500, countError.message)
    if (!count) throw new ServiceError(403, "A student must start the conversation first.")
  }

  const { data, error } = await supabase.from("listing_messages").insert({
    id: `msg-${crypto.randomUUID()}`,
    listing_id: input.listingId,
    student_id: studentId,
    landlord_id: landlordId,
    sender_id: profile.id,
    body: input.body,
  }).select("*").single()
  if (error) throw new ServiceError(500, error.message)

  const users = await getUsers([profile.id])
  return mapMessage(data as MessageRow, users)
}
