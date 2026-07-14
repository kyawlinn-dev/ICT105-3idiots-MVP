import { apiRequest } from "./client"
import type { ListingMessage, MessageConversation, MessageThread } from "./types"

export const getMessageConversations = async () => {
  const response = await apiRequest<MessageConversation[]>("/messages/conversations")
  return response.data
}

export const getMessageThread = async (listingId: string, studentId: string) => {
  const response = await apiRequest<MessageThread>(`/messages/${encodeURIComponent(listingId)}/${encodeURIComponent(studentId)}`)
  return response.data
}

export const sendListingMessage = async (payload: { listingId: string; studentId?: string; body: string }) => {
  const response = await apiRequest<ListingMessage>("/messages", {
    method: "POST",
    body: JSON.stringify(payload),
  })
  return response.data
}

export const getRoommateMessageThread = async (postId: string, initiatorId: string) => {
  const response = await apiRequest<MessageThread>(`/messages/roommates/${encodeURIComponent(postId)}/${encodeURIComponent(initiatorId)}`)
  return response.data
}

export const sendRoommateMessage = async (payload: { postId: string; initiatorId?: string; body: string }) => {
  const response = await apiRequest<ListingMessage>("/messages/roommates", {
    method: "POST",
    body: JSON.stringify(payload),
  })
  return response.data
}
