import type { Request, Response } from "express"
import { sendError } from "../lib/apiResponse.js"

export const notFound = (req: Request, res: Response) => {
  sendError(res, 404, `Route not found: ${req.method} ${req.originalUrl}`)
}
