import "dotenv/config"

const parsePort = (value: string | undefined) => {
  if (!value) {
    return 4000
  }

  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 4000
}

const defaultDevOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
]

const parseOrigins = (value: string | undefined) => {
  const configuredOrigins = value?.split(",").map((origin) => origin.trim()).filter(Boolean) ?? []
  return Array.from(new Set([...defaultDevOrigins, ...configuredOrigins]))
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: parsePort(process.env.PORT),
  corsOrigins: parseOrigins(process.env.CORS_ORIGIN),
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  supabaseSecretKey: process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY,
}

export const hasSupabaseConfig = Boolean(env.supabaseUrl && env.supabaseSecretKey)
