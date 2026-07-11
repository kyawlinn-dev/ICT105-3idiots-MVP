import { Router } from "express"
import multer from "multer"
import { sendData } from "../lib/apiResponse.js"
import { ServiceError } from "../lib/serviceError.js"
import { requireAuth, requireRole } from "../middleware/auth.js"
import { requireSupabaseClient } from "../services/supabaseClient.js"

export const uploadRoutes = Router()

const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"])
const extensionByMimeType: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

const uploadSingle = upload.single("file")

uploadRoutes.post("/uploads/listing-photo", requireAuth, requireRole(["owner"]), (req, res, next) => {
  uploadSingle(req, res, (error) => {
    if (error) {
      next(new ServiceError(400, "Photo must be 5 MB or smaller."))
      return
    }

    next()
  })
}, async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ServiceError(400, "Photo file is required.")
    }

    if (!allowedMimeTypes.has(req.file.mimetype)) {
      throw new ServiceError(400, "Photo must be JPG, PNG, or WebP.")
    }

    const supabase = requireSupabaseClient()
    const extension = extensionByMimeType[req.file.mimetype]
    const path = `owners/${req.auth!.profile.id}/${Date.now()}-${crypto.randomUUID()}.${extension}`
    const { error } = await supabase.storage.from("listing-photos").upload(path, req.file.buffer, {
      contentType: req.file.mimetype,
      upsert: false,
    })

    if (error) {
      throw new ServiceError(500, error.message)
    }

    const { data } = supabase.storage.from("listing-photos").getPublicUrl(path)
    sendData(res.status(201), { url: data.publicUrl, path }, "Photo uploaded.")
  } catch (error) {
    next(error)
  }
})
