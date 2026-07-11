import { Router } from "express"
import { adminRoutes } from "./adminRoutes.js"
import { authRoutes } from "./authRoutes.js"
import { healthRoutes } from "./healthRoutes.js"
import { listingRoutes } from "./listingRoutes.js"
import { mapRoutes } from "./mapRoutes.js"
import { roommateRoutes } from "./roommateRoutes.js"
import { savedListingRoutes } from "./savedListingRoutes.js"
import { uploadRoutes } from "./uploadRoutes.js"

export const apiRoutes = Router()

apiRoutes.use(healthRoutes)
apiRoutes.use(authRoutes)
apiRoutes.use(listingRoutes)
apiRoutes.use(mapRoutes)
apiRoutes.use(adminRoutes)
apiRoutes.use(roommateRoutes)
apiRoutes.use(savedListingRoutes)
apiRoutes.use(uploadRoutes)
