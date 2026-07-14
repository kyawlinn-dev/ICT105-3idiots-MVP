import { z } from "zod"

export const sendListingMessageSchema = z.object({
  listingId: z.string().trim().min(1, "Apartment is required."),
  studentId: z.string().trim().min(1).optional(),
  body: z.string().trim().min(1, "Message cannot be empty.").max(2000, "Message is too long."),
})

export type SendListingMessageInput = z.infer<typeof sendListingMessageSchema>

export const sendRoommateMessageSchema = z.object({
  postId: z.string().trim().min(1, "Roommate post is required."),
  initiatorId: z.string().trim().min(1).optional(),
  body: z.string().trim().min(1, "Message cannot be empty.").max(2000, "Message is too long."),
})

export type SendRoommateMessageInput = z.infer<typeof sendRoommateMessageSchema>
