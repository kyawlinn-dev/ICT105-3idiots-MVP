import { Bell, LogOut, Menu, Search } from "lucide-react"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { adminNavItems } from "../../data/mockData"
import { cn } from "../../lib/utils"
import type { AuthProfile } from "../../services/api/types"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { DashboardSidebar } from "./DashboardSidebar"

type AdminLayoutProps = {
  session: AuthProfile | null
  onSignOut: () => void | Promise<void>
}

export function AdminLayout({ session, onSignOut }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar
        title="Admin Console"
        subtitle="Listing review"
        profileName={session?.displayName ?? "Admin User"}
        profileRole="Platform Admin"
        collapsed={collapsed}
        onToggle={() => setCollapsed((current) => !current)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        navItems={adminNavItems}
      />
      <div className={cn("transition-all duration-300 xl:pl-52", collapsed && "xl:pl-14")}>
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-11 items-center justify-between gap-3 px-3 sm:px-4 lg:px-5">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open sidebar" onClick={() => setMobileOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <p className="text-xs font-bold text-slate-950">Admin dashboard</p>
                <p className="hidden text-[11px] text-slate-500 sm:block">Review listings, landlords, users, and analytics</p>
              </div>
            </div>
            <div className="hidden max-w-sm flex-1 items-center gap-2 md:flex">
              <div className="relative w-full">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <Input className="h-8 pl-8 text-xs" placeholder="Search listings, landlords, or users" />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Sign out" onClick={onSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
        <main className="min-w-0 px-3 py-3 sm:px-4 lg:px-5">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
