import { Router } from "express"
import { hasSupabaseConfig } from "../config/env.js"
import { sendData } from "../lib/apiResponse.js"

export const healthRoutes = Router()

healthRoutes.get("/health", (_req, res) => {
  sendData(res, {
    status: "ok",
    service: "student-apartment-backend",
    supabaseConfigured: hasSupabaseConfig,
  })
})
