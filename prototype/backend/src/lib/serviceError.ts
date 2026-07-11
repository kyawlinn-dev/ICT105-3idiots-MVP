export class ServiceError extends Error {
  statusCode: number
  fields?: Record<string, string>

  constructor(statusCode: number, message: string, fields?: Record<string, string>) {
    super(message)
    this.name = "ServiceError"
    this.statusCode = statusCode
    this.fields = fields
  }
}
