import { apiRequest } from "./client"
import type { AppNotification } from "./types"

export const getNotifications = async () => {
  const response = await apiRequest<AppNotification[]>("/notifications")
  return response.data
}

export const markNotificationRead = async (id: string) => {
  const response = await apiRequest<AppNotification>(`/notifications/${encodeURIComponent(id)}/read`, { method: "PATCH" })
  return response.data
}
