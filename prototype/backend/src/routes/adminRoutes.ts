import { Router } from "express"
import { sendData } from "../lib/apiResponse.js"
import { requireAuth, requireRole } from "../middleware/auth.js"
import { deleteListing, getListings, updateListingApproval } from "../services/listingService.js"
import { getAdminDashboard } from "../services/dashboardService.js"
import { listingFiltersSchema, updateApprovalSchema } from "../validation/listingSchemas.js"

export const adminRoutes = Router()

adminRoutes.use("/admin", requireAuth, requireRole(["admin"]))

adminRoutes.get("/admin/listings", async (req, res, next) => {
  try {
    const filters = listingFiltersSchema.parse(req.query)
    const listings = await getListings(filters)
    sendData(res, listings)
  } catch (error) {
    next(error)
  }
})

adminRoutes.patch("/admin/listings/:id/approval", async (req, res, next) => {
  try {
    const input = updateApprovalSchema.parse(req.body)
    const listing = await updateListingApproval(req.params.id, input)
    sendData(res, listing, "Listing review status updated.")
  } catch (error) {
    next(error)
  }
})

adminRoutes.delete("/admin/listings/:id", async (req, res, next) => {
  try {
    const result = await deleteListing(req.params.id)
    sendData(res, result, "Listing deleted.")
  } catch (error) {
    next(error)
  }
})

adminRoutes.get("/admin/dashboard", async (_req, res, next) => {
  try {
    const dashboard = await getAdminDashboard()
    sendData(res, dashboard)
  } catch (error) {
    next(error)
  }
})
