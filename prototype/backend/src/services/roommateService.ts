import { ServiceError } from "../lib/serviceError.js"
import type { AuthProfile } from "../types/auth.js"
import type { CreateRoommatePostInput, UpdateRoommatePostInput, UpdateRoommatePostStatusInput } from "../validation/roommateSchemas.js"
import { requireSupabaseClient } from "./supabaseClient.js"
import { createNotification } from "./notificationService.js"

type RoommatePostStatus = "active" | "paused" | "matched" | "expired"

type RoommatePostRow = {
  id: string
  student_id: string | null
  title: string
  poster_name: string
  near_university: string
  budget_min: number | null
  budget_max: number
  move_in_date: string
  location_preference: string
  lifestyle_tags: string[]
  description: string
  status: RoommatePostStatus
  created_at: string
  updated_at: string
  expires_at: string
  approval_status: "pending" | "approved" | "rejected"
}

type StudentContactRow = {
  id: string
  display_name: string
  email: string | null
  phone: string | null
  line_id: string | null
}

const mapPost = (row: RoommatePostRow, student?: StudentContactRow, includeContact = false) => ({
  id: row.id,
  studentId: row.student_id,
  title: row.title,
  posterName: student?.display_name ?? row.poster_name,
  posterEmail: includeContact ? student?.email ?? null : null,
  posterPhone: includeContact ? student?.phone ?? null : null,
  posterLineId: includeContact ? student?.line_id ?? null : null,
  nearUniversity: row.near_university,
  budgetMin: row.budget_min,
  budgetMax: row.budget_max,
  budget: row.budget_max,
  moveInDate: row.move_in_date,
  locationPreference: row.location_preference,
  lifestyleTags: row.lifestyle_tags,
  description: row.description,
  status: row.status === "active" && new Date(row.expires_at).getTime() <= Date.now() ? "expired" as const : row.status,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  expiresAt: row.expires_at,
  approvalStatus: row.approval_status,
})

const getStudentContacts = async (studentIds: string[]) => {
  if (studentIds.length === 0) {
    return new Map<string, StudentContactRow>()
  }

  const supabase = requireSupabaseClient()
  const { data, error } = await supabase.from("app_users").select("id, display_name, email, phone, line_id").in("id", studentIds)

  if (error) {
    throw new ServiceError(500, error.message)
  }

  return new Map(((data as StudentContactRow[] | null) ?? []).map((student) => [student.id, student]))
}

const mapRowsWithContacts = async (rows: RoommatePostRow[], includeContacts: boolean) => {
  const studentIds = Array.from(new Set(rows.map((row) => row.student_id).filter(Boolean) as string[]))
  const contacts = await getStudentContacts(studentIds)
  return rows.map((row) => mapPost(row, row.student_id ? contacts.get(row.student_id) : undefined, includeContacts))
}

export const getRoommatePosts = async (includeContacts = false) => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase
    .from("roommate_posts")
    .select("*")
    .eq("status", "active")
    .eq("approval_status", "approved")
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })

  if (error) {
    throw new ServiceError(500, error.message)
  }

  return mapRowsWithContacts((data as RoommatePostRow[] | null) ?? [], includeContacts)
}

export const getOwnRoommatePosts = async (student: AuthProfile) => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase.from("roommate_posts").select("*").eq("student_id", student.id).order("created_at", { ascending: false })

  if (error) {
    throw new ServiceError(500, error.message)
  }

  const contact: StudentContactRow = {
    id: student.id,
    display_name: student.displayName,
    email: student.email,
    phone: student.phone,
    line_id: student.lineId,
  }

  return ((data as RoommatePostRow[] | null) ?? []).map((row) => mapPost(row, contact, true))
}

export const getRoommatePostById = async (id: string, includeContact = false, viewerId?: string) => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase.from("roommate_posts").select("*").eq("id", id).maybeSingle()

  if (error) {
    throw new ServiceError(500, error.message)
  }

  if (!data) {
    throw new ServiceError(404, "Roommate post not found.")
  }

  const row = data as RoommatePostRow
  const isOwner = Boolean(viewerId && row.student_id === viewerId)
  if (!isOwner && (row.approval_status !== "approved" || row.status !== "active" || new Date(row.expires_at).getTime() <= Date.now())) {
    throw new ServiceError(404, "Roommate post not found.")
  }

  const contacts = await getStudentContacts(row.student_id ? [row.student_id] : [])
  return mapPost(row, row.student_id ? contacts.get(row.student_id) : undefined, includeContact)
}

const postValues = (input: CreateRoommatePostInput | UpdateRoommatePostInput) => ({
  title: input.title,
  near_university: input.nearUniversity,
  budget_min: input.budgetMin,
  budget_max: input.budgetMax,
  move_in_date: input.moveInDate,
  location_preference: input.locationPreference,
  lifestyle_tags: input.lifestyleTags,
  description: input.description,
})

export const createRoommatePost = async (input: CreateRoommatePostInput, student: AuthProfile) => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase
    .from("roommate_posts")
    .insert({
      id: `rm-${crypto.randomUUID()}`,
      student_id: student.id,
      poster_name: student.displayName,
      ...postValues(input),
      status: "active",
      approval_status: "pending",
      expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    })
    .select("*")
    .single()

  if (error) {
    throw new ServiceError(500, error.message)
  }

  return mapPost(data as RoommatePostRow, {
    id: student.id,
    display_name: student.displayName,
    email: student.email,
    phone: student.phone,
    line_id: student.lineId,
  }, true)
}

export const updateRoommatePost = async (id: string, input: UpdateRoommatePostInput, student: AuthProfile) => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase
    .from("roommate_posts")
    .update({ ...postValues(input), approval_status: "pending" })
    .eq("id", id)
    .eq("student_id", student.id)
    .select("*")
    .maybeSingle()

  if (error) {
    throw new ServiceError(500, error.message)
  }
  if (!data) {
    throw new ServiceError(404, "Roommate post not found or you do not own it.")
  }

  return mapPost(data as RoommatePostRow, {
    id: student.id,
    display_name: student.displayName,
    email: student.email,
    phone: student.phone,
    line_id: student.lineId,
  }, true)
}

export const updateRoommatePostStatus = async (id: string, input: UpdateRoommatePostStatusInput, student: AuthProfile) => {
  const supabase = requireSupabaseClient()
  const updates: Record<string, string> = { status: input.status }
  if (input.status === "active") {
    updates.expires_at = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
  }

  const { data, error } = await supabase.from("roommate_posts").update(updates).eq("id", id).eq("student_id", student.id).select("*").maybeSingle()

  if (error) {
    throw new ServiceError(500, error.message)
  }
  if (!data) {
    throw new ServiceError(404, "Roommate post not found or you do not own it.")
  }

  return getRoommatePostById(id, true, student.id)
}

export const deleteRoommatePost = async (id: string, studentId: string) => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase.from("roommate_posts").delete().eq("id", id).eq("student_id", studentId).select("id").maybeSingle()

  if (error) {
    throw new ServiceError(500, error.message)
  }
  if (!data) {
    throw new ServiceError(404, "Roommate post not found or you do not own it.")
  }

  return { id }
}

export const getSavedRoommatePostIds = async (studentId: string) => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase.from("saved_roommate_posts").select("roommate_post_id").eq("student_id", studentId)
  if (error) throw new ServiceError(500, error.message)
  return { ids: data?.map((item) => item.roommate_post_id) ?? [] }
}

export const saveRoommatePost = async (studentId: string, postId: string) => {
  await getRoommatePostById(postId)
  const supabase = requireSupabaseClient()
  const { error } = await supabase.from("saved_roommate_posts").upsert({ student_id: studentId, roommate_post_id: postId }, { onConflict: "student_id,roommate_post_id" })
  if (error) throw new ServiceError(500, error.message)
  return getSavedRoommatePostIds(studentId)
}

export const removeSavedRoommatePost = async (studentId: string, postId: string) => {
  const supabase = requireSupabaseClient()
  const { error } = await supabase.from("saved_roommate_posts").delete().eq("student_id", studentId).eq("roommate_post_id", postId)
  if (error) throw new ServiceError(500, error.message)
  return getSavedRoommatePostIds(studentId)
}

export const getAdminRoommatePosts = async () => {
  const { data, error } = await requireSupabaseClient().from("roommate_posts").select("*").order("created_at", { ascending: false })
  if (error) throw new ServiceError(500, error.message)
  return mapRowsWithContacts((data as RoommatePostRow[] | null) ?? [], false)
}

export const updateRoommatePostApproval = async (id: string, approvalStatus: "approved" | "pending" | "rejected") => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase.from("roommate_posts").update({ approval_status: approvalStatus }).eq("id", id).select("*").maybeSingle()
  if (error) throw new ServiceError(500, error.message)
  if (!data) throw new ServiceError(404, "Roommate post not found.")
  const post = data as RoommatePostRow
  if (post.student_id && approvalStatus !== "pending") {
    const approved = approvalStatus === "approved"
    await createNotification({
      recipientId: post.student_id,
      type: approved ? "roommate_approved" : "roommate_rejected",
      title: approved ? "Roommate post approved" : "Roommate post needs changes",
      message: approved ? `${post.title} is now visible to other students.` : `${post.title} was rejected by the admin. Review and update your post.`,
      link: "/roommates",
    })
  }
  return mapPost(post)
}
