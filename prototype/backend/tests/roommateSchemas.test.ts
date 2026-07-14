import { describe, expect, it } from "vitest"
import { createRoommatePostSchema, updateRoommatePostStatusSchema } from "../src/validation/roommateSchemas.js"

const validPost = {
  title: "Looking for a quiet roommate",
  nearUniversity: "Rangsit University",
  budgetMin: 4000,
  budgetMax: 6500,
  moveInDate: "2026-08",
  locationPreference: "Muang Ake",
  lifestyleTags: ["Quiet", "Clean"],
  description: "I prefer a quiet shared apartment near campus.",
}

describe("roommate post validation", () => {
  it("accepts a complete roommate post", () => {
    expect(createRoommatePostSchema.parse(validPost)).toMatchObject(validPost)
  })

  it("rejects a minimum budget above the maximum", () => {
    const result = createRoommatePostSchema.safeParse({ ...validPost, budgetMin: 7000 })
    expect(result.success).toBe(false)
  })

  it("accepts only student-managed public statuses", () => {
    expect(updateRoommatePostStatusSchema.parse({ status: "matched" })).toEqual({ status: "matched" })
    expect(updateRoommatePostStatusSchema.safeParse({ status: "expired" }).success).toBe(false)
  })
})
