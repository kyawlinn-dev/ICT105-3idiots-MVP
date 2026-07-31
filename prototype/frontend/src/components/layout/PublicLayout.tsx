import { Outlet } from "react-router-dom"
import type { AuthProfile } from "../../services/api/types"
import { PublicNavbar } from "./PublicNavbar"

type PublicLayoutProps = {
  session: AuthProfile | null
  sessionLoading: boolean
  onSignOut: () => void | Promise<void>
}

export function PublicLayout({ session, sessionLoading, onSignOut }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f5f7fb] pb-16 lg:pb-0">
      <PublicNavbar session={session} sessionLoading={sessionLoading} onSignOut={onSignOut} />
      <Outlet />
    </div>
  )
}
