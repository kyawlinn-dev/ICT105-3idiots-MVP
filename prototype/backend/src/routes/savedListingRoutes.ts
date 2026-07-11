import { Router } from "express"
import { z } from "zod"
import { sendData } from "../lib/apiResponse.js"
import { requireAuth, requireRole } from "../middleware/auth.js"
import { getSavedListings, removeSavedListing, saveListing } from "../services/savedListingService.js"

export const savedListingRoutes = Router()

savedListingRoutes.use("/saved-listings", requireAuth, requireRole(["student"]))

const saveListingSchema = z.object({
  listingId: z.string().trim().min(1),
})

savedListingRoutes.get("/saved-listings", async (req, res, next) => {
  try {
    sendData(res, await getSavedListings(req.auth!.profile.id))
  } catch (error) {
    next(error)
  }
})

savedListingRoutes.post("/saved-listings", async (req, res, next) => {
  try {
    const input = saveListingSchema.parse(req.body)
    sendData(res.status(201), await saveListing(req.auth!.profile.id, input.listingId), "Listing saved.")
  } catch (error) {
    next(error)
  }
})

savedListingRoutes.delete("/saved-listings/:listingId", async (req, res, next) => {
  try {
    sendData(res, await removeSavedListing(req.auth!.profile.id, req.params.listingId), "Listing removed from shortlist.")
  } catch (error) {
    next(error)
  }
})
