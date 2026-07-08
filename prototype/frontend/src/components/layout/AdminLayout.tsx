import { Bell, Menu, Search } from "lucide-react"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { adminNavItems } from "../../data/mockData"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { DashboardSidebar } from "./DashboardSidebar"

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar
        title="Admin Console"
        subtitle="Listing review"
        profileName="Admin User"
        profileRole="Platform Admin"
        collapsed={collapsed}
        onToggle={() => setCollapsed((current) => !current)}
        navItems={adminNavItems}
      />
      <div className={cn("transition-all duration-300 lg:pl-72", collapsed && "lg:pl-20")}>
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open sidebar">
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <p className="text-sm font-bold text-slate-950">Admin dashboard</p>
                <p className="text-xs text-slate-500">Review listings, owners, users, and analytics</p>
              </div>
            </div>
            <div className="hidden max-w-md flex-1 items-center gap-2 md:flex">
              <div className="relative w-full">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input className="pl-9" placeholder="Search listings, owners, or users" />
              </div>
            </div>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>
        <main className="min-w-0 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
