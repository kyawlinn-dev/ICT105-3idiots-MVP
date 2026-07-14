import type { RoommatePostStatus } from "../../data/mockData"
import { apiRequest } from "./client"
import { mapRoommatePostFromApi, type ApiRoommatePost, type CreateRoommatePostPayload } from "./types"

const mapPosts = (posts: ApiRoommatePost[]) => posts.map(mapRoommatePostFromApi)

export const getRoommatePosts = async () => {
  const response = await apiRequest<ApiRoommatePost[]>("/roommate-posts")
  return mapPosts(response.data)
}

export const getMyRoommatePosts = async () => {
  const response = await apiRequest<ApiRoommatePost[]>("/roommate-posts/mine")
  return mapPosts(response.data)
}

export const createRoommatePost = async (payload: CreateRoommatePostPayload) => {
  const response = await apiRequest<ApiRoommatePost>("/roommate-posts", {
    method: "POST",
    body: JSON.stringify(payload),
  })
  return mapRoommatePostFromApi(response.data)
}

export const updateRoommatePost = async (id: string, payload: CreateRoommatePostPayload) => {
  const response = await apiRequest<ApiRoommatePost>(`/roommate-posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  })
  return mapRoommatePostFromApi(response.data)
}

export const updateRoommatePostStatus = async (id: string, status: Exclude<RoommatePostStatus, "expired">) => {
  const response = await apiRequest<ApiRoommatePost>(`/roommate-posts/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  })
  return mapRoommatePostFromApi(response.data)
}

export const deleteRoommatePost = async (id: string) => {
  await apiRequest<{ id: string }>(`/roommate-posts/${id}`, { method: "DELETE" })
}

export const getSavedRoommatePosts = async () => {
  const response = await apiRequest<{ ids: string[] }>("/roommate-posts/saved")
  return response.data.ids
}

export const saveRoommatePost = async (id: string) => {
  const response = await apiRequest<{ ids: string[] }>(`/roommate-posts/${id}/save`, { method: "POST" })
  return response.data.ids
}

export const removeSavedRoommatePost = async (id: string) => {
  const response = await apiRequest<{ ids: string[] }>(`/roommate-posts/${id}/save`, { method: "DELETE" })
  return response.data.ids
}

export const getAdminRoommatePosts = async () => {
  const response = await apiRequest<ApiRoommatePost[]>("/admin/roommate-posts")
  return mapPosts(response.data)
}

export const updateAdminRoommateApproval = async (id: string, approvalStatus: "approved" | "pending" | "rejected") => {
  const response = await apiRequest<ApiRoommatePost>(`/admin/roommate-posts/${encodeURIComponent(id)}/approval`, {
    method: "PATCH",
    body: JSON.stringify({ approvalStatus }),
  })
  return mapRoommatePostFromApi(response.data)
}
