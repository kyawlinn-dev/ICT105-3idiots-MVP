import { Building2, Heart, Home, LayoutDashboard, LogOut, MessageCircle, UserRound, Users, X } from "lucide-react"
import { useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"
import type { AuthProfile } from "../../services/api/types"
import { NotificationBox } from "../shared/NotificationBox"
import { Button } from "../ui/button"

const navItems = [
  { label: "Home", to: "/" },
  { label: "Apartments", to: "/apartments" },
  { label: "Roommates", to: "/roommates" },
  { label: "Saved", to: "/saved" },
  { label: "About", to: "/about" },
]

const mobileItems = [
  { label: "Home", to: "/", icon: Home },
  { label: "Apartments", to: "/apartments", icon: Building2 },
  { label: "Roommates", to: "/roommates", icon: Users },
  { label: "Saved", to: "/saved", icon: Heart },
]

type PublicNavbarProps = {
  session: AuthProfile | null
  sessionLoading: boolean
  onSignOut: () => void | Promise<void>
}

export function PublicNavbar({ session, sessionLoading, onSignOut }: PublicNavbarProps) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const closeMenu = () => setOpen(false)
  const dashboardPath = session?.role === "owner" ? "/owner/dashboard" : session?.role === "admin" ? "/admin/dashboard" : null
  const visibleNavItems = session?.role === "student"
    ? [...navItems.slice(0, 4), { label: "Inbox", to: "/messages" }, ...navItems.slice(4)]
    : navItems
  const visibleMobileItems = session?.role === "student"
    ? [...mobileItems, { label: "Inbox", to: "/messages", icon: MessageCircle }]
    : mobileItems
  const mobileTitle = pathname === "/"
    ? "Student Apartment Finder"
    : pathname.startsWith("/apartments/")
      ? "Apartment Details"
      : pathname.startsWith("/apartments")
        ? "Apartments"
        : pathname.startsWith("/roommates")
          ? "Find Your Roommate"
          : pathname.startsWith("/saved")
            ? "Saved"
            : pathname.startsWith("/messages")
              ? "Inbox"
              : pathname.startsWith("/about")
                ? "About"
                : "Student Apartment Finder"

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await onSignOut()
      closeMenu()
    } finally {
      setSigningOut(false)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 shadow-[0_1px_8px_rgba(15,23,42,0.04)] backdrop-blur">
        <div className="mx-auto hidden h-16 max-w-7xl items-center justify-between gap-5 px-6 lg:flex lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-2.5 text-[15px] font-extrabold tracking-tight text-slate-950" onClick={closeMenu}>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-200">
              <Building2 className="h-[18px] w-[18px]" />
            </span>
            <span className="truncate">Student Apartment Finder</span>
          </Link>

          <nav className="flex items-center gap-1" aria-label="Primary navigation">
            {visibleNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => cn(
                  "rounded-xl px-3.5 py-2 text-[15px] font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700",
                  isActive && "bg-blue-50 text-blue-700",
                )}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {sessionLoading ? (
              <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-100" aria-label="Checking account" />
            ) : session ? (
              <>
                <span className="hidden max-w-36 items-center gap-2 truncate text-sm font-semibold text-slate-600 xl:inline-flex">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-100 text-xs font-extrabold text-blue-700">{session.displayName.slice(0, 2).toUpperCase()}</span>
                  {session.displayName}
                </span>
                {dashboardPath ? <Button asChild variant="ghost"><Link to={dashboardPath}><LayoutDashboard className="h-4 w-4" />Dashboard</Link></Button> : null}
                <NotificationBox session={session} />
                <Button type="button" variant="outline" onClick={handleSignOut} disabled={signingOut}>
                  <LogOut className="h-4 w-4" />{signingOut ? "Signing out…" : "Sign out"}
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost"><Link to="/owner/login">Landlord portal</Link></Button>
                <Button asChild><Link to="/signin">Sign in</Link></Button>
              </>
            )}
          </div>
        </div>

        <div className="relative flex h-14 items-center justify-between px-4 lg:hidden">
          <Link to="/" className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-200" aria-label="Home">
            <Building2 className="h-[18px] w-[18px]" />
          </Link>
          <p className="pointer-events-none absolute left-1/2 max-w-[65%] -translate-x-1/2 truncate text-center text-sm font-extrabold tracking-tight text-slate-950">{mobileTitle}</p>
          <div className="grid h-9 w-9 place-items-center">
            <NotificationBox session={session} />
          </div>
        </div>
      </header>

      <nav className={cn("fixed inset-x-0 bottom-0 z-40 grid h-16 border-t border-slate-200 bg-white/98 px-1 pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_12px_rgba(15,23,42,0.06)] backdrop-blur lg:hidden", session?.role === "student" ? "grid-cols-6" : "grid-cols-5")} aria-label="Mobile navigation">
        {visibleMobileItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => cn("flex min-w-0 flex-col items-center justify-center gap-1 text-[10px] font-semibold text-slate-500", isActive && "text-blue-600")}>
            {({ isActive }) => <><item.icon className={cn("h-5 w-5", isActive && "fill-blue-50")} /><span className="truncate">{item.label}</span></>}
          </NavLink>
        ))}
        <button type="button" onClick={() => setOpen(true)} className={cn("flex min-w-0 flex-col items-center justify-center gap-1 text-[10px] font-semibold", open ? "text-blue-600" : "text-slate-500")}>
          <UserRound className="h-5 w-5" />
          <span>Account</span>
        </button>
      </nav>

      {open ? (
        <div className="fixed inset-0 z-[60]" onClick={closeMenu}>
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" />
          <div className="absolute inset-x-0 bottom-16 mx-auto w-full max-w-md rounded-t-2xl border border-b-0 border-slate-200 bg-white p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="text-lg font-extrabold text-slate-950">Account</p>
                <p className="text-xs text-slate-500">Sign in or manage your account</p>
              </div>
              <Button type="button" variant="ghost" size="icon" aria-label="Close account" onClick={closeMenu}><X className="h-5 w-5" /></Button>
            </div>

            {!sessionLoading && session ? (
              <div className="mb-5 flex items-center gap-3 rounded-xl bg-blue-50 p-3.5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue-600 text-sm font-extrabold text-white">{session.displayName.slice(0, 2).toUpperCase()}</div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold text-slate-950">{session.displayName}</p>
                  <p className="text-xs font-semibold capitalize text-blue-700">{session.role === "owner" ? "landlord" : session.role} account</p>
                </div>
              </div>
            ) : null}

            <div className="grid gap-2">
              {sessionLoading ? <div className="h-11 animate-pulse rounded-xl bg-slate-100" /> : session ? (
                <>
                  {session.role === "student" ? <Button asChild><Link to="/messages" onClick={closeMenu}><MessageCircle className="h-4 w-4" />Inbox</Link></Button> : null}
                  {dashboardPath ? <Button asChild><Link to={dashboardPath} onClick={closeMenu}><LayoutDashboard className="h-4 w-4" />Open dashboard</Link></Button> : null}
                  <Button type="button" variant="outline" onClick={handleSignOut} disabled={signingOut}><LogOut className="h-4 w-4" />{signingOut ? "Signing out…" : "Sign out"}</Button>
                </>
              ) : (
                <>
                  <Button asChild><Link to="/signin" onClick={closeMenu}>Student sign in</Link></Button>
                  <Button asChild variant="outline"><Link to="/owner/login" onClick={closeMenu}>Landlord sign in</Link></Button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
