import { Router } from "express"
import { sendData } from "../lib/apiResponse.js"
import { requireAuth, requireRole } from "../middleware/auth.js"
import { getMessageConversations, getMessageThread, sendListingMessage } from "../services/messageService.js"
import { getRoommateMessageConversations, getRoommateMessageThread, sendRoommateMessage } from "../services/roommateMessageService.js"
import { sendListingMessageSchema, sendRoommateMessageSchema } from "../validation/messageSchemas.js"

export const messageRoutes = Router()

messageRoutes.use("/messages", requireAuth, requireRole(["student", "owner"]))

messageRoutes.get("/messages/conversations", async (req, res, next) => {
  try {
    const [listingConversations, roommateConversations] = await Promise.all([
      getMessageConversations(req.auth!.profile),
      getRoommateMessageConversations(req.auth!.profile),
    ])
    sendData(res, [...listingConversations, ...roommateConversations].sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()))
  } catch (error) {
    next(error)
  }
})

messageRoutes.get("/messages/:listingId/:studentId", async (req, res, next) => {
  try {
    sendData(res, await getMessageThread(req.auth!.profile, String(req.params.listingId), String(req.params.studentId)))
  } catch (error) {
    next(error)
  }
})

messageRoutes.post("/messages", async (req, res, next) => {
  try {
    const input = sendListingMessageSchema.parse(req.body)
    sendData(res.status(201), await sendListingMessage(req.auth!.profile, input), "Message sent.")
  } catch (error) {
    next(error)
  }
})

messageRoutes.get("/messages/roommates/:postId/:initiatorId", requireRole(["student"]), async (req, res, next) => {
  try {
    sendData(res, await getRoommateMessageThread(req.auth!.profile, String(req.params.postId), String(req.params.initiatorId)))
  } catch (error) {
    next(error)
  }
})

messageRoutes.post("/messages/roommates", requireRole(["student"]), async (req, res, next) => {
  try {
    const input = sendRoommateMessageSchema.parse(req.body)
    sendData(res.status(201), await sendRoommateMessage(req.auth!.profile, input), "Message sent.")
  } catch (error) {
    next(error)
  }
})
