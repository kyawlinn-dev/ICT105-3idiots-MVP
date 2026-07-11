import { apiRequest } from "./client"
import { mapRoommatePostFromApi, type ApiRoommatePost, type CreateRoommatePostPayload } from "./types"

export const getRoommatePosts = async () => {
  const response = await apiRequest<ApiRoommatePost[]>("/roommate-posts")
  return response.data.map(mapRoommatePostFromApi)
}

export const createRoommatePost = async (payload: CreateRoommatePostPayload) => {
  const response = await apiRequest<ApiRoommatePost>("/roommate-posts", {
    method: "POST",
    body: JSON.stringify(payload),
  })

  return mapRoommatePostFromApi(response.data)
}
