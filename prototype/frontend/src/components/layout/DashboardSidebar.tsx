import type { LucideIcon } from "lucide-react"
import { Building2, PanelLeftClose, PanelLeftOpen } from "lucide-react"
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
  navItems: Array<{
    label: string
    to: string
    icon: LucideIcon
  }>
}

export function DashboardSidebar({ title, subtitle, profileName, profileRole, collapsed, onToggle, navItems }: DashboardSidebarProps) {
  const primaryActiveItemByPath = new Map<string, string>()

  for (const item of navItems) {
    if (item.label !== "Logout" && !primaryActiveItemByPath.has(item.to)) {
      primaryActiveItemByPath.set(item.to, item.label)
    }
  }

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 hidden border-r border-slate-200 bg-white transition-all duration-300 lg:block",
        collapsed ? "w-20" : "w-72",
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between gap-3 border-b border-slate-100 px-4">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-200">
              <Building2 className="h-5 w-5" />
            </span>
            {!collapsed ? (
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-slate-950">{title}</span>
                <span className="block truncate text-xs text-slate-500">{subtitle}</span>
              </span>
            ) : null}
          </Link>
          <Button type="button" variant="ghost" size="icon" onClick={onToggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
        </div>

        <div className={cn("border-b border-slate-100 p-4", collapsed && "px-3")}>
          <div className={cn("flex items-center gap-3 rounded-lg bg-slate-50 p-3", collapsed && "justify-center p-2")}>
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              {profileName.slice(0, 2).toUpperCase()}
            </div>
            {!collapsed ? (
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-950">{profileName}</p>
                <p className="truncate text-xs text-slate-500">{profileRole}</p>
              </div>
            ) : null}
          </div>
        </div>

        <nav className="grid gap-1 p-3">
          {navItems.map((item) => {
            const canShowActiveState = primaryActiveItemByPath.get(item.to) === item.label

            return (
              <NavLink
                key={`${item.label}-${item.to}`}
                to={item.to}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700",
                    collapsed && "justify-center px-2",
                    isActive &&
                      canShowActiveState &&
                      "bg-blue-600 text-white shadow-sm shadow-blue-200 hover:bg-blue-600 hover:text-white",
                    item.label === "Logout" && "mt-2 text-rose-600 hover:bg-rose-50 hover:text-rose-700",
                  )
                }
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed ? <span>{item.label}</span> : null}
              </NavLink>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
