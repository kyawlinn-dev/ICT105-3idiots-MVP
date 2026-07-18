import { Bell, CheckCircle2, X, XCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import type { AuthProfile, AppNotification } from "../../services/api/types"
import { getNotifications, markNotificationsRead } from "../../services/api/notifications"
import { Button } from "../ui/button"

export function NotificationBox({ session }: { session: AuthProfile | null }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!session || (session.role !== "student" && session.role !== "owner")) {
      setNotifications([])
      setOpen(false)
      return
    }
    let active = true
    const load = () => getNotifications().then((items) => {
      if (active) setNotifications(items)
    }).catch((error) => console.error(error))
    load()
    const interval = window.setInterval(load, 30_000)
    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [session])

  const unreadCount = notifications.filter((item) => !item.readAt).length

  const openNotifications = async () => {
    if (open) {
      await closeNotifications()
      return
    }

    setOpen(true)
  }

  const closeNotifications = async () => {
    setOpen(false)
    if (unreadCount === 0) return

    const readAt = new Date().toISOString()
    setNotifications((current) => current.map((item) => item.readAt ? item : { ...item, readAt }))
    try {
      await markNotificationsRead()
    } catch (error) {
      console.error(error)
    }
  }

  if (!session || (session.role !== "student" && session.role !== "owner")) return null

  return (
    <div className="relative">
      <Button type="button" variant="ghost" size="icon" className="relative h-9 w-9" aria-label={unreadCount ? `${unreadCount} unread notifications` : "Notifications"} onClick={openNotifications}>
        <Bell className="h-5 w-5" />
        {!open && unreadCount ? <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-blue-600 px-1 text-[9px] font-extrabold text-white ring-2 ring-white">{unreadCount}</span> : null}
      </Button>

      {open ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl" role="dialog" aria-label="Account notifications">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div>
              <p className="text-sm font-extrabold text-slate-950">Notifications</p>
              <p className="text-xs text-slate-500">{unreadCount ? `${unreadCount} unread` : notifications.length ? "All caught up" : "No updates yet"}</p>
            </div>
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8" aria-label="Close notifications" onClick={closeNotifications}><X className="h-4 w-4" /></Button>
          </div>
          {notifications.length ? (
            <div className="max-h-80 overflow-y-auto p-2">
              {notifications.slice(0, 5).map((notification) => {
                const approved = notification.type.endsWith("approved")
                const Icon = approved ? CheckCircle2 : XCircle
                const unread = !notification.readAt
                return (
                  <div key={notification.id} className={unread ? "flex items-start gap-3 rounded-lg bg-blue-50 p-3 hover:bg-blue-50" : "flex items-start gap-3 rounded-lg p-3 hover:bg-slate-50"}>
                    <Icon className={approved ? "mt-0.5 h-5 w-5 shrink-0 text-emerald-600" : "mt-0.5 h-5 w-5 shrink-0 text-rose-600"} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="min-w-0 flex-1 text-sm font-bold text-slate-950">{notification.title}</p>
                        {unread ? <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">New</span> : null}
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-600">{notification.message}</p>
                      {notification.link ? <Link to={notification.link} className="mt-1.5 inline-block text-xs font-bold text-blue-600 hover:text-blue-700" onClick={closeNotifications}>View details</Link> : null}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="px-4 py-8 text-center">
              <Bell className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-2 text-sm font-bold text-slate-800">No notifications</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Approval history will appear here.</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
