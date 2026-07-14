import { Bell, CheckCircle2, X, XCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import type { AuthProfile, AppNotification } from "../../services/api/types"
import { getNotifications, markNotificationRead } from "../../services/api/notifications"
import { Button } from "../ui/button"

export function NotificationBox({ session }: { session: AuthProfile | null }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([])

  useEffect(() => {
    if (!session || (session.role !== "student" && session.role !== "owner")) {
      setNotifications([])
      return
    }
    let active = true
    const load = () => getNotifications().then((items) => {
      if (active) setNotifications(items.filter((item) => !item.readAt))
    }).catch((error) => console.error(error))
    load()
    const interval = window.setInterval(load, 30_000)
    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [session])

  const dismiss = async (id: string) => {
    setNotifications((current) => current.filter((item) => item.id !== id))
    try {
      await markNotificationRead(id)
    } catch (error) {
      console.error(error)
    }
  }

  if (!notifications.length) return null

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8" aria-label="Account notifications">
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 shadow-sm">
        <div className="mb-2 flex items-center gap-2 text-sm font-extrabold text-blue-950">
          <Bell className="h-4 w-4 text-blue-600" />
          Listing notifications
          <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] text-white">{notifications.length}</span>
        </div>
        <div className="grid gap-2">
          {notifications.slice(0, 3).map((notification) => {
            const approved = notification.type.endsWith("approved")
            const Icon = approved ? CheckCircle2 : XCircle
            return (
              <div key={notification.id} className="flex items-start gap-3 rounded-lg border border-blue-100 bg-white p-3">
                <Icon className={approved ? "mt-0.5 h-5 w-5 shrink-0 text-emerald-600" : "mt-0.5 h-5 w-5 shrink-0 text-rose-600"} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-950">{notification.title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{notification.message}</p>
                  {notification.link ? <Link to={notification.link} className="mt-1.5 inline-block text-xs font-bold text-blue-600 hover:text-blue-700" onClick={() => dismiss(notification.id)}>View details</Link> : null}
                </div>
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7 shrink-0" aria-label="Dismiss notification" onClick={() => dismiss(notification.id)}><X className="h-4 w-4" /></Button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
