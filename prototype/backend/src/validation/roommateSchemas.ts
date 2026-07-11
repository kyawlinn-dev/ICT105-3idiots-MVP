import { z } from "zod"

export const createRoommatePostSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  nearUniversity: z.string().trim().min(1).default("Rangsit University"),
  budgetMin: z.coerce.number().min(0).optional(),
  budgetMax: z.coerce.number().positive("Budget must be greater than 0."),
  moveInDate: z.string().trim().min(1, "Move-in date is required."),
  locationPreference: z.string().trim().min(1, "Location preference is required."),
  lifestyleTags: z.array(z.string().trim().min(1)).default([]),
  description: z.string().trim().min(1, "Description is required."),
}).refine((input) => input.budgetMin === undefined || input.budgetMin <= input.budgetMax, {
  message: "Minimum budget cannot be higher than maximum budget.",
  path: ["budgetMin"],
})

export type CreateRoommatePostInput = z.infer<typeof createRoommatePostSchema>
