import { Router } from "express"
import { sendData } from "../lib/apiResponse.js"
import { getAvailableListingLocations, getListingLocation } from "../services/listingService.js"

export const mapRoutes = Router()

mapRoutes.get("/maps/listing-locations", async (_req, res, next) => {
  try {
    const markers = await getAvailableListingLocations()
    sendData(res, markers)
  } catch (error) {
    next(error)
  }
})

mapRoutes.get("/maps/listing-locations/:id", async (req, res, next) => {
  try {
    const marker = await getListingLocation(req.params.id)
    sendData(res, marker)
  } catch (error) {
    next(error)
  }
})
