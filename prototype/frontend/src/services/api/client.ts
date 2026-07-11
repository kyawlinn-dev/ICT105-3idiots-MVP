const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api"

type ApiSuccess<T> = {
  data: T
  message?: string
}

type ApiFailure = {
  error?: {
    message?: string
    fields?: Record<string, string>
  }
}

export class ApiError extends Error {
  fields?: Record<string, string>

  constructor(message: string, fields?: Record<string, string>) {
    super(message)
    this.name = "ApiError"
    this.fields = fields
  }
}

export const apiRequest = async <T>(path: string, options?: RequestInit) => {
  const isFormData = options?.body instanceof FormData
  const response = await fetch(`${apiBaseUrl}${path}`, {
    credentials: "include",
    headers: isFormData
      ? options?.headers
      : {
          "Content-Type": "application/json",
          ...options?.headers,
        },
    ...options,
  })
  const payload = (await response.json()) as ApiSuccess<T> & ApiFailure

  if (!response.ok) {
    throw new ApiError(payload.error?.message ?? "Request failed.", payload.error?.fields)
  }

  return payload
}

export const buildQuery = (params: Record<string, string | number | undefined>) => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.set(key, String(value))
    }
  })

  const query = searchParams.toString()
  return query ? `?${query}` : ""
}
