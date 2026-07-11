import { apiRequest } from "./client"

export type UploadedListingPhoto = {
  url: string
  path: string
}

export const uploadListingPhoto = async (file: File) => {
  const formData = new FormData()
  formData.set("file", file)

  const response = await apiRequest<UploadedListingPhoto>("/uploads/listing-photo", {
    method: "POST",
    body: formData,
  })

  return response.data
}
