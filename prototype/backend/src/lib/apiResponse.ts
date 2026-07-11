import type { Response } from "express"

export const sendData = <T>(res: Response, data: T, message?: string) => {
  return res.json({ data, ...(message ? { message } : {}) })
}

export const sendError = (res: Response, status: number, message: string, fields?: Record<string, string>) => {
  return res.status(status).json({
    error: {
      message,
      ...(fields ? { fields } : {}),
    },
  })
}
