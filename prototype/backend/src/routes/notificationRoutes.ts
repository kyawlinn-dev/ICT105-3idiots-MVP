import { Router } from "express"
import { sendData } from "../lib/apiResponse.js"
import { requireAuth, requireRole } from "../middleware/auth.js"
import { getNotifications, markNotificationRead, markNotificationsRead } from "../services/notificationService.js"

export const notificationRoutes = Router()

notificationRoutes.use("/notifications", requireAuth, requireRole(["student", "owner"]))

notificationRoutes.get("/notifications", async (req, res, next) => {
  try {
    sendData(res, await getNotifications(req.auth!.profile.id))
  } catch (error) {
    next(error)
  }
})

notificationRoutes.patch("/notifications/read", async (req, res, next) => {
  try {
    sendData(res, await markNotificationsRead(req.auth!.profile.id))
  } catch (error) {
    next(error)
  }
})

notificationRoutes.patch("/notifications/:id/read", async (req, res, next) => {
  try {
    sendData(res, await markNotificationRead(String(req.params.id), req.auth!.profile.id))
  } catch (error) {
    next(error)
  }
})
