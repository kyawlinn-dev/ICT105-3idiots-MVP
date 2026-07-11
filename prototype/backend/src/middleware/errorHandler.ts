import type { ErrorRequestHandler } from "express"
import { ZodError } from "zod"
import { sendError } from "../lib/apiResponse.js"
import { ServiceError } from "../lib/serviceError.js"

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ServiceError) {
    sendError(res, error.statusCode, error.message, error.fields)
    return
  }

  if (error instanceof ZodError) {
    const fields = Object.fromEntries(
      error.issues.map((issue) => [issue.path.join(".") || "form", issue.message]),
    )

    sendError(res, 400, "Please complete required fields.", fields)
    return
  }

  console.error(error)
  sendError(res, 500, "Something went wrong. Please try again.")
}
