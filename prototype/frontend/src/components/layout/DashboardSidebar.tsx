import type { LucideIcon } from "lucide-react"
import { Building2, PanelLeftClose, PanelLeftOpen, X } from "lucide-react"
import { Link, NavLink } from "react-router-dom"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"

type DashboardSidebarProps = {
  title: string
  subtitle: string
  profileName: string
  profileRole: string
  collapsed: boolean
  onToggle: () => void
  mobileOpen?: boolean
  onMobileClose?: () => void
  navItems: Array<{
    label: string
    to: string
    icon: LucideIcon
  }>
}

export function DashboardSidebar({ title, subtitle, profileName, profileRole, collapsed, onToggle, mobileOpen = false, onMobileClose, navItems }: DashboardSidebarProps) {
  const primaryActiveItemByPath = new Map<string, string>()

  for (const item of navItems) {
    if (item.label !== "Logout" && !primaryActiveItemByPath.has(item.to)) {
      primaryActiveItemByPath.set(item.to, item.label)
    }
  }

  return (
    <>
    {mobileOpen ? <button type="button" className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden" aria-label="Close navigation" onClick={onMobileClose} /> : null}
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white transition-all duration-300 lg:z-40 lg:block",
        mobileOpen ? "block" : "hidden",
        collapsed ? "lg:w-14" : "lg:w-52",
      )}
      aria-label={`${title} navigation`}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-11 items-center justify-between gap-2 border-b border-slate-100 px-2.5">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-blue-600 text-white shadow-sm shadow-blue-200">
              <Building2 className="h-3.5 w-3.5" />
            </span>
            <span className={cn("min-w-0", collapsed && "lg:hidden")}>
                <span className="block truncate text-xs font-bold text-slate-950">{title}</span>
                <span className="block truncate text-[11px] text-slate-500">{subtitle}</span>
            </span>
          </Link>
          <Button type="button" variant="ghost" size="icon" className="hidden lg:inline-flex" onClick={onToggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
          <Button type="button" variant="ghost" size="icon" className="lg:hidden" onClick={onMobileClose} aria-label="Close navigation">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className={cn("border-b border-slate-100 p-2.5", collapsed && "px-2")}>
          <div className={cn("flex items-center gap-2 rounded-lg bg-slate-50 p-2", collapsed && "justify-center p-1.5")}>
            <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-100 text-[11px] font-bold text-blue-700">
              {profileName.slice(0, 2).toUpperCase()}
            </div>
            <div className={cn("min-w-0", collapsed && "lg:hidden")}>
                <p className="truncate text-xs font-bold text-slate-950">{profileName}</p>
                <p className="truncate text-[11px] text-slate-500">{profileRole}</p>
            </div>
          </div>
        </div>

        <nav className="grid gap-1 p-2">
          {navItems.map((item) => {
            const canShowActiveState = primaryActiveItemByPath.get(item.to) === item.label

            return (
              <NavLink
                key={`${item.label}-${item.to}`}
                to={item.to}
                title={collapsed ? item.label : undefined}
                onClick={onMobileClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700",
                    collapsed && "justify-center px-2",
                    isActive &&
                      canShowActiveState &&
                      "bg-blue-600 text-white shadow-sm shadow-blue-200 hover:bg-blue-600 hover:text-white",
                    item.label === "Logout" && "mt-2 text-rose-600 hover:bg-rose-50 hover:text-rose-700",
                  )
                }
              >
                <item.icon className="h-3.5 w-3.5 shrink-0" />
                <span className={cn(collapsed && "lg:hidden")}>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </div>
    </aside>
    </>
  )
}
