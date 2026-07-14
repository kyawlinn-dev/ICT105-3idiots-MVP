import { ServiceError } from "../lib/serviceError.js"
import { requireSupabaseClient } from "./supabaseClient.js"

type NotificationType = "listing_approved" | "listing_rejected" | "roommate_approved" | "roommate_rejected"

type NotificationRow = {
  id: string
  recipient_id: string
  type: NotificationType
  title: string
  message: string
  link: string | null
  created_at: string
  read_at: string | null
}

const mapNotification = (row: NotificationRow) => ({
  id: row.id,
  type: row.type,
  title: row.title,
  message: row.message,
  link: row.link,
  createdAt: row.created_at,
  readAt: row.read_at,
})

export const createNotification = async (input: { recipientId: string; type: NotificationType; title: string; message: string; link?: string }) => {
  const { error } = await requireSupabaseClient().from("app_notifications").insert({
    id: `notification-${crypto.randomUUID()}`,
    recipient_id: input.recipientId,
    type: input.type,
    title: input.title,
    message: input.message,
    link: input.link ?? null,
  })
  if (error) throw new ServiceError(500, error.message)
}

export const getNotifications = async (recipientId: string) => {
  const { data, error } = await requireSupabaseClient().from("app_notifications").select("*").eq("recipient_id", recipientId).is("read_at", null).order("created_at", { ascending: false }).limit(20)
  if (error) throw new ServiceError(500, error.message)
  return ((data as NotificationRow[] | null) ?? []).map(mapNotification)
}

export const markNotificationRead = async (id: string, recipientId: string) => {
  const { data, error } = await requireSupabaseClient().from("app_notifications").update({ read_at: new Date().toISOString() }).eq("id", id).eq("recipient_id", recipientId).select("*").maybeSingle()
  if (error) throw new ServiceError(500, error.message)
  if (!data) throw new ServiceError(404, "Notification not found.")
  return mapNotification(data as NotificationRow)
}
