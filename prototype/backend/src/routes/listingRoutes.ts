import { Router } from "express"
import { sendData } from "../lib/apiResponse.js"
import { optionalAuth, requireAuth, requireRole } from "../middleware/auth.js"
import { createListing, getListingById, getListings, getOwnerListings, updateListingAvailability, updateOwnerListing } from "../services/listingService.js"
import { createListingSchema, listingFiltersSchema, updateAvailabilitySchema, updateListingSchema } from "../validation/listingSchemas.js"

export const listingRoutes = Router()

listingRoutes.get("/listings", optionalAuth, async (req, res, next) => {
  try {
    const filters = listingFiltersSchema.parse({ ...req.query, approvalStatus: req.query.approvalStatus ?? "approved" })
    const listings = await getListings(filters)
    const canViewOwnerContact = req.auth?.profile.role === "student"
    sendData(res, canViewOwnerContact ? listings : listings.map((listing) => ({ ...listing, ownerContact: "" })))
  } catch (error) {
    next(error)
  }
})

listingRoutes.get("/listings/:id", optionalAuth, async (req, res, next) => {
  try {
    const listing = await getListingById(String(req.params.id))
    const canViewOwnerContact = req.auth?.profile.role === "student"
    sendData(res, canViewOwnerContact ? listing : { ...listing, ownerContact: "" })
  } catch (error) {
    next(error)
  }
})

listingRoutes.get("/owner/listings", requireAuth, requireRole(["owner"]), async (req, res, next) => {
  try {
    const listings = await getOwnerListings(req.auth!.profile.id)
    sendData(res, listings)
  } catch (error) {
    next(error)
  }
})

listingRoutes.post("/listings", requireAuth, requireRole(["owner"]), async (req, res, next) => {
  try {
    const input = createListingSchema.parse(req.body)
    const listing = await createListing(input, req.auth!.profile.id)
    sendData(res.status(201), listing, "Listing submitted for admin review.")
  } catch (error) {
    next(error)
  }
})

listingRoutes.patch("/listings/:id/availability", requireAuth, requireRole(["owner"]), async (req, res, next) => {
  try {
    const input = updateAvailabilitySchema.parse(req.body)
    const listing = await updateListingAvailability(String(req.params.id), input, req.auth!.profile.id)
    sendData(res, listing, "Availability updated.")
  } catch (error) {
    next(error)
  }
})

listingRoutes.patch("/owner/listings/:id", requireAuth, requireRole(["owner"]), async (req, res, next) => {
  try {
    const input = updateListingSchema.parse(req.body)
    const listing = await updateOwnerListing(String(req.params.id), input, req.auth!.profile.id)
    sendData(res, listing, "Listing updated and sent for admin review.")
  } catch (error) {
    next(error)
  }
})
