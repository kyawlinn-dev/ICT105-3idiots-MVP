import { createApp } from "./app.js"
import { env, hasSupabaseConfig } from "./config/env.js"

const app = createApp()

app.listen(env.port, () => {
  console.log(`Student Apartment backend running on http://localhost:${env.port}`)
  console.log(`Supabase configured: ${hasSupabaseConfig ? "yes" : "no"}`)
})
