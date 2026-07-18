import cors from "cors"
import cookieParser from "cookie-parser"
import express from "express"
import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { env } from "./config/env.js"
import { errorHandler } from "./middleware/errorHandler.js"
import { notFound } from "./middleware/notFound.js"
import { apiRoutes } from "./routes/index.js"

const moduleDir = path.dirname(fileURLToPath(import.meta.url))
const frontendDistPath = path.resolve(moduleDir, "../../frontend/dist")
const frontendIndexPath = path.join(frontendDistPath, "index.html")

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

  if (env.nodeEnv === "production" && existsSync(frontendIndexPath)) {
    app.use(express.static(frontendDistPath))
    app.get(/^(?!\/api).*/, (_req, res) => {
      res.sendFile(frontendIndexPath)
    })
  }

  app.use(notFound)
  app.use(errorHandler)

  return app
}
