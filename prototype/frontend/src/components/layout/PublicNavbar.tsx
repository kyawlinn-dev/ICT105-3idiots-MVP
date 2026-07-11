import { Building2, Menu, X } from "lucide-react"
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"

const navItems = [
  { label: "Home", to: "/" },
  { label: "Apartments", to: "/apartments" },
  { label: "Roommates", to: "/roommates" },
  { label: "Saved", to: "/saved" },
  { label: "About", to: "/about" },
]

export function PublicNavbar() {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2 text-sm font-bold text-slate-950" onClick={closeMenu}>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-200">
            <Building2 className="h-4 w-4" />
          </span>
          <span className="truncate">Student Apartment Finder</span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn("rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700", isActive && "bg-blue-50 text-blue-700")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden h-10 sm:inline-flex">
            <Link to="/owner/login">
              Owner portal
            </Link>
          </Button>
          <Button asChild className="hidden h-10 bg-blue-600 hover:bg-blue-700 sm:inline-flex">
            <Link to="/signin">
              Sign in
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((current) => !current)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {open ? (
        <div className="fixed inset-0 top-[49px] z-50 bg-slate-950/30 md:hidden" onClick={closeMenu}>
          <div className="ml-auto h-full w-full max-w-xs border-l border-slate-200 bg-white p-4 shadow-xl" onClick={(event) => event.stopPropagation()}>
            <nav className="grid gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    cn("rounded-lg px-4 py-3 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700", isActive && "bg-blue-50 text-blue-700")
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Button asChild className="mt-3 h-11 w-full bg-blue-600 hover:bg-blue-700">
                <Link to="/signin" onClick={closeMenu}>Sign in</Link>
              </Button>
              <Button asChild variant="outline" className="h-11 w-full">
                <Link to="/owner/login" onClick={closeMenu}>Owner portal</Link>
              </Button>
              <Button asChild variant="ghost" className="h-11 w-full">
                <Link to="/admin/login" onClick={closeMenu}>Admin login</Link>
              </Button>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  )
}
