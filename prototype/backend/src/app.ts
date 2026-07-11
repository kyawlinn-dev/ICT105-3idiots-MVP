import cors from "cors"
import cookieParser from "cookie-parser"
import express from "express"
import { env } from "./config/env.js"
import { errorHandler } from "./middleware/errorHandler.js"
import { notFound } from "./middleware/notFound.js"
import { apiRoutes } from "./routes/index.js"

export const createApp = () => {
  const app = express()

  app.use(
    cors({
      credentials: true,
      origin: (origin, callback) => {
        if (!origin || env.corsOrigins.includes(origin) || /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
          callback(null, true)
          return
        }

        callback(new Error(`CORS origin not allowed: ${origin}`))
      },
    }),
  )
  app.use(cookieParser())
  app.use(express.json())

  app.use("/api", apiRoutes)
  app.use(notFound)
  app.use(errorHandler)

  return app
}
