import { Router } from "express"
import { sendData } from "../lib/apiResponse.js"
import { optionalAuth, requireAuth, requireRole } from "../middleware/auth.js"
import {
  createRoommatePost,
  deleteRoommatePost,
  getOwnRoommatePosts,
  getRoommatePostById,
  getRoommatePosts,
  getSavedRoommatePostIds,
  removeSavedRoommatePost,
  saveRoommatePost,
  updateRoommatePost,
  updateRoommatePostStatus,
} from "../services/roommateService.js"
import { createRoommatePostSchema, updateRoommatePostSchema, updateRoommatePostStatusSchema } from "../validation/roommateSchemas.js"

export const roommateRoutes = Router()

roommateRoutes.get("/roommate-posts", optionalAuth, async (req, res, next) => {
  try {
    sendData(res, await getRoommatePosts(req.auth?.profile.role === "student", req.auth?.profile.role === "student" ? req.auth.profile.id : undefined))
  } catch (error) {
    next(error)
  }
})

roommateRoutes.get("/roommate-posts/mine", requireAuth, requireRole(["student"]), async (req, res, next) => {
  try {
    sendData(res, await getOwnRoommatePosts(req.auth!.profile))
  } catch (error) {
    next(error)
  }
})

roommateRoutes.get("/roommate-posts/saved", requireAuth, requireRole(["student"]), async (req, res, next) => {
  try {
    sendData(res, await getSavedRoommatePostIds(req.auth!.profile.id))
  } catch (error) {
    next(error)
  }
})

roommateRoutes.get("/roommate-posts/:id", optionalAuth, async (req, res, next) => {
  try {
    const isStudent = req.auth?.profile.role === "student"
    sendData(res, await getRoommatePostById(String(req.params.id), isStudent, isStudent ? req.auth!.profile.id : undefined))
  } catch (error) {
    next(error)
  }
})

roommateRoutes.post("/roommate-posts", requireAuth, requireRole(["student"]), async (req, res, next) => {
  try {
    const input = createRoommatePostSchema.parse(req.body)
    sendData(res.status(201), await createRoommatePost(input, req.auth!.profile), "Roommate post created.")
  } catch (error) {
    next(error)
  }
})

roommateRoutes.patch("/roommate-posts/:id", requireAuth, requireRole(["student"]), async (req, res, next) => {
  try {
    const input = updateRoommatePostSchema.parse(req.body)
    sendData(res, await updateRoommatePost(String(req.params.id), input, req.auth!.profile), "Roommate post updated.")
  } catch (error) {
    next(error)
  }
})

roommateRoutes.patch("/roommate-posts/:id/status", requireAuth, requireRole(["student"]), async (req, res, next) => {
  try {
    const input = updateRoommatePostStatusSchema.parse(req.body)
    sendData(res, await updateRoommatePostStatus(String(req.params.id), input, req.auth!.profile), "Roommate post status updated.")
  } catch (error) {
    next(error)
  }
})

roommateRoutes.delete("/roommate-posts/:id", requireAuth, requireRole(["student"]), async (req, res, next) => {
  try {
    sendData(res, await deleteRoommatePost(String(req.params.id), req.auth!.profile.id), "Roommate post deleted.")
  } catch (error) {
    next(error)
  }
})

roommateRoutes.post("/roommate-posts/:id/save", requireAuth, requireRole(["student"]), async (req, res, next) => {
  try {
    sendData(res.status(201), await saveRoommatePost(req.auth!.profile.id, String(req.params.id)), "Roommate post saved.")
  } catch (error) {
    next(error)
  }
})

roommateRoutes.delete("/roommate-posts/:id/save", requireAuth, requireRole(["student"]), async (req, res, next) => {
  try {
    sendData(res, await removeSavedRoommatePost(req.auth!.profile.id, String(req.params.id)), "Roommate post removed from saved posts.")
  } catch (error) {
    next(error)
  }
})
