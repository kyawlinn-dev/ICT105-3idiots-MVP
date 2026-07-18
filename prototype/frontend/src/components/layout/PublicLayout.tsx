import { Link, Outlet } from "react-router-dom"
import type { AuthProfile } from "../../services/api/types"
import { PublicNavbar } from "./PublicNavbar"

type PublicLayoutProps = {
  session: AuthProfile | null
  sessionLoading: boolean
  onSignOut: () => void | Promise<void>
}

export function PublicLayout({ session, sessionLoading, onSignOut }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f5f7fb] pb-16 xl:pb-0">
      <PublicNavbar session={session} sessionLoading={sessionLoading} onSignOut={onSignOut} />
      <Outlet />
      <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center text-xs text-slate-500">
        <p>Student Apartment Finder · Housing information for students</p>
        <div className="mt-2 flex justify-center gap-4 font-semibold text-slate-600">
          <Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-blue-600">Terms of Use</Link>
        </div>
      </footer>
    </div>
  )
}
