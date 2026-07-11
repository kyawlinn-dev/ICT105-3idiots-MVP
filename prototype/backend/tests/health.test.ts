import request from "supertest"
import { describe, expect, it } from "vitest"
import { createApp } from "../src/app.js"

describe("health route", () => {
  it("returns backend health status", async () => {
    const response = await request(createApp()).get("/api/health")

    expect(response.status).toBe(200)
    expect(response.body.data).toEqual({
      status: "ok",
      service: "student-apartment-backend",
      supabaseConfigured: expect.any(Boolean),
    })
  })
})
