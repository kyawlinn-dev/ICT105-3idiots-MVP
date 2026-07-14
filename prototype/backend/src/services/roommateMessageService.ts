import { ServiceError } from "../lib/serviceError.js"
import type { AuthProfile } from "../types/auth.js"
import type { SendRoommateMessageInput } from "../validation/messageSchemas.js"
import { requireSupabaseClient } from "./supabaseClient.js"

type RoommateMessageRow = {
  id: string
  roommate_post_id: string
  initiator_id: string
  post_owner_id: string
  sender_id: string
  body: string
  created_at: string
  read_at: string | null
}

type PostRow = {
  id: string
  student_id: string | null
  title: string
  status: string
  expires_at: string
}

type UserRow = { id: string; display_name: string }

const getPost = async (postId: string) => {
  const { data, error } = await requireSupabaseClient().from("roommate_posts").select("id, student_id, title, status, expires_at").eq("id", postId).maybeSingle()
  if (error) throw new ServiceError(500, error.message)
  if (!data || !(data as PostRow).student_id) throw new ServiceError(404, "Roommate post not found.")
  return data as PostRow
}

const getPosts = async (ids: string[]) => {
  if (!ids.length) return new Map<string, PostRow>()
  const { data, error } = await requireSupabaseClient().from("roommate_posts").select("id, student_id, title, status, expires_at").in("id", ids)
  if (error) throw new ServiceError(500, error.message)
  return new Map(((data as PostRow[] | null) ?? []).map((row) => [row.id, row]))
}

const getUsers = async (ids: string[]) => {
  if (!ids.length) return new Map<string, UserRow>()
  const { data, error } = await requireSupabaseClient().from("app_users").select("id, display_name").in("id", ids)
  if (error) throw new ServiceError(500, error.message)
  return new Map(((data as UserRow[] | null) ?? []).map((row) => [row.id, row]))
}

const resolveThread = async (profile: AuthProfile, postId: string, requestedInitiatorId?: string) => {
  if (profile.role !== "student") throw new ServiceError(403, "Only students can access roommate messages.")
  const post = await getPost(postId)
  const postOwnerId = post.student_id!
  if (profile.id === postOwnerId) {
    if (!requestedInitiatorId || requestedInitiatorId === postOwnerId) throw new ServiceError(400, "Choose a student conversation first.")
    return { post, initiatorId: requestedInitiatorId, postOwnerId }
  }
  return { post, initiatorId: profile.id, postOwnerId }
}

const mapMessage = (row: RoommateMessageRow, users: Map<string, UserRow>) => ({
  id: row.id,
  listingId: row.roommate_post_id,
  studentId: row.initiator_id,
  landlordId: row.post_owner_id,
  senderId: row.sender_id,
  senderName: users.get(row.sender_id)?.display_name ?? "Student",
  body: row.body,
  createdAt: row.created_at,
  readAt: row.read_at,
})

export const getRoommateMessageConversations = async (profile: AuthProfile) => {
  if (profile.role !== "student") return []
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase.from("roommate_messages").select("*").or(`initiator_id.eq.${profile.id},post_owner_id.eq.${profile.id}`).order("created_at", { ascending: false })
  if (error) throw new ServiceError(500, error.message)
  const rows = (data as RoommateMessageRow[] | null) ?? []
  const latestByThread = new Map<string, RoommateMessageRow>()
  rows.forEach((row) => {
    const key = `${row.roommate_post_id}:${row.initiator_id}`
    if (!latestByThread.has(key)) latestByThread.set(key, row)
  })
  const latestRows = Array.from(latestByThread.values())
  const posts = await getPosts(Array.from(new Set(latestRows.map((row) => row.roommate_post_id))))
  const users = await getUsers(Array.from(new Set(latestRows.flatMap((row) => [row.initiator_id, row.post_owner_id]))))

  return latestRows.map((row) => ({
    kind: "roommate" as const,
    listingId: row.roommate_post_id,
    listingName: posts.get(row.roommate_post_id)?.title ?? "Roommate post",
    studentId: row.initiator_id,
    studentName: users.get(row.initiator_id)?.display_name ?? "Student",
    landlordId: row.post_owner_id,
    landlordName: users.get(row.post_owner_id)?.display_name ?? "Student poster",
    counterpartName: users.get(profile.id === row.initiator_id ? row.post_owner_id : row.initiator_id)?.display_name ?? "Student",
    lastMessage: row.body,
    lastMessageAt: row.created_at,
    unreadCount: rows.filter((message) => message.roommate_post_id === row.roommate_post_id && message.initiator_id === row.initiator_id && message.sender_id !== profile.id && !message.read_at).length,
  }))
}

export const getRoommateMessageThread = async (profile: AuthProfile, postId: string, requestedInitiatorId?: string) => {
  const { post, initiatorId, postOwnerId } = await resolveThread(profile, postId, requestedInitiatorId)
  const supabase = requireSupabaseClient()
  const { data, error } = await supabase.from("roommate_messages").select("*").eq("roommate_post_id", postId).eq("initiator_id", initiatorId).eq("post_owner_id", postOwnerId).order("created_at", { ascending: true })
  if (error) throw new ServiceError(500, error.message)
  const rows = (data as RoommateMessageRow[] | null) ?? []
  if (profile.id === postOwnerId && rows.length === 0) throw new ServiceError(404, "Roommate conversation not found.")
  const users = await getUsers(Array.from(new Set([...rows.map((row) => row.sender_id), initiatorId, postOwnerId])))

  if (rows.some((row) => row.sender_id !== profile.id && !row.read_at)) {
    const { error: readError } = await supabase.from("roommate_messages").update({ read_at: new Date().toISOString() }).eq("roommate_post_id", postId).eq("initiator_id", initiatorId).neq("sender_id", profile.id).is("read_at", null)
    if (readError) throw new ServiceError(500, readError.message)
  }

  return {
    kind: "roommate" as const,
    listingId: postId,
    listingName: post.title,
    studentId: initiatorId,
    studentName: users.get(initiatorId)?.display_name ?? "Student",
    landlordId: postOwnerId,
    landlordName: users.get(postOwnerId)?.display_name ?? "Student poster",
    counterpartName: users.get(profile.id === initiatorId ? postOwnerId : initiatorId)?.display_name ?? "Student",
    messages: rows.map((row) => mapMessage(row, users)),
  }
}

export const sendRoommateMessage = async (profile: AuthProfile, input: SendRoommateMessageInput) => {
  const { post, initiatorId, postOwnerId } = await resolveThread(profile, input.postId, input.initiatorId)
  const supabase = requireSupabaseClient()
  const { count, error: countError } = await supabase.from("roommate_messages").select("id", { count: "exact", head: true }).eq("roommate_post_id", input.postId).eq("initiator_id", initiatorId)
  if (countError) throw new ServiceError(500, countError.message)
  if (!count && profile.id === postOwnerId) throw new ServiceError(403, "The interested student must start the conversation first.")
  if (!count && profile.id === initiatorId && (post.status !== "active" || new Date(post.expires_at).getTime() <= Date.now())) {
    throw new ServiceError(404, "This roommate post is no longer accepting messages.")
  }

  const { data, error } = await supabase.from("roommate_messages").insert({
    id: `rmsg-${crypto.randomUUID()}`,
    roommate_post_id: input.postId,
    initiator_id: initiatorId,
    post_owner_id: postOwnerId,
    sender_id: profile.id,
    body: input.body,
  }).select("*").single()
  if (error) throw new ServiceError(500, error.message)
  return mapMessage(data as RoommateMessageRow, await getUsers([profile.id]))
}
