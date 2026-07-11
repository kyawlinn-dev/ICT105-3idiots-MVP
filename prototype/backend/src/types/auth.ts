export type UserRole = "student" | "owner" | "admin"

export type AuthProfile = {
  id: string
  authUserId: string
  role: UserRole
  displayName: string
  email: string
  phone: string | null
  lineId: string | null
}
