import { ServiceError } from "../lib/serviceError.js"
import type { AuthProfile } from "../types/auth.js"
import type { CreateRoommatePostInput } from "../validation/roommateSchemas.js"
import { requireSupabaseClient } from "./supabaseClient.js"

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
  created_at: string
}

type StudentContactRow = {
  id: string
  display_name: string
  email: string | null
  phone: string | null
  line_id: string | null
}

const mapPost = (row: RoommatePostRow, student?: StudentContactRow) => ({
  id: row.id,
  studentId: row.student_id,
  title: row.title,
  posterName: student?.display_name ?? row.poster_name,
  posterEmail: student?.email ?? null,
  posterPhone: student?.phone ?? null,
  posterLineId: student?.line_id ?? null,
  nearUniversity: row.near_university,
  budgetMin: row.budget_min,
  budgetMax: row.budget_max,
  budget: row.budget_max,
  moveInDate: row.move_in_date,
  locationPreference: row.location_preference,
  lifestyleTags: row.lifestyle_tags,
  description: row.description,
  createdAt: row.created_at,
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

  return new Map((data as StudentContactRow[] | null ?? []).map((student) => [student.id, student]))
}

export const getRoommatePosts = async () => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase.from("roommate_posts").select("*").order("created_at", { ascending: false })

  if (error) {
    throw new ServiceError(500, error.message)
  }

  const rows = (data as RoommatePostRow[] | null) ?? []
  const contacts = await getStudentContacts(Array.from(new Set(rows.map((row) => row.student_id).filter(Boolean) as string[])))

  return rows.map((row) => mapPost(row, row.student_id ? contacts.get(row.student_id) : undefined))
}

export const getRoommatePostById = async (id: string) => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase.from("roommate_posts").select("*").eq("id", id).maybeSingle()

  if (error) {
    throw new ServiceError(500, error.message)
  }

  if (!data) {
    throw new ServiceError(404, "Roommate post not found.")
  }

  const row = data as RoommatePostRow
  const contacts = await getStudentContacts(row.student_id ? [row.student_id] : [])

  return mapPost(row, row.student_id ? contacts.get(row.student_id) : undefined)
}

export const createRoommatePost = async (input: CreateRoommatePostInput, student: AuthProfile) => {
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase
    .from("roommate_posts")
    .insert({
      id: `rm-${crypto.randomUUID()}`,
      student_id: student.id,
      title: input.title,
      poster_name: student.displayName,
      near_university: input.nearUniversity,
      budget_min: input.budgetMin,
      budget_max: input.budgetMax,
      move_in_date: input.moveInDate,
      location_preference: input.locationPreference,
      lifestyle_tags: input.lifestyleTags,
      description: input.description,
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
  })
}
