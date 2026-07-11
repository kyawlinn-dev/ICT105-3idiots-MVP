import { Router } from "express"
import { sendData } from "../lib/apiResponse.js"
import { requireAuth, requireRole } from "../middleware/auth.js"
import { createRoommatePost, getRoommatePostById, getRoommatePosts } from "../services/roommateService.js"
import { createRoommatePostSchema } from "../validation/roommateSchemas.js"

export const roommateRoutes = Router()

roommateRoutes.get("/roommate-posts", async (_req, res, next) => {
  try {
    sendData(res, await getRoommatePosts())
  } catch (error) {
    next(error)
  }
})

roommateRoutes.get("/roommate-posts/:id", async (req, res, next) => {
  try {
    sendData(res, await getRoommatePostById(req.params.id))
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
