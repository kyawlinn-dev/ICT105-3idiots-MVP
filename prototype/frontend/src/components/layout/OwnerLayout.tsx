import { LogOut, Menu, Search } from "lucide-react"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { ownerNavItems } from "../../data/mockData"
import { cn } from "../../lib/utils"
import type { AuthProfile } from "../../services/api/types"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { DashboardSidebar } from "./DashboardSidebar"
import { NotificationBox } from "../shared/NotificationBox"

type OwnerLayoutProps = {
  session: AuthProfile | null
  onSignOut: () => void | Promise<void>
}

export function OwnerLayout({ session, onSignOut }: OwnerLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar
        title="Landlord Portal"
        subtitle="Student Apartment Finder"
        profileName={session?.displayName ?? "Apartment Landlord"}
        profileRole="Apartment Landlord"
        collapsed={collapsed}
        onToggle={() => setCollapsed((current) => !current)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        navItems={ownerNavItems}
      />
      <div className={cn("transition-all duration-300 xl:pl-52", collapsed && "xl:pl-14")}>
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open sidebar" onClick={() => setMobileOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <p className="text-sm font-bold text-slate-950">Landlord dashboard</p>
                <p className="hidden text-xs text-slate-500 sm:block">Manage listings, leads, and student enquiries</p>
              </div>
            </div>
            <div className="hidden max-w-md flex-1 items-center gap-2 md:flex">
              <div className="relative w-full">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input className="pl-9" placeholder="Search listings or inquiries" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <NotificationBox session={session} />
              <Button variant="ghost" size="icon" aria-label="Sign out" onClick={onSignOut}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
        <main className="min-w-0 px-4 py-4 sm:px-6 xl:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
