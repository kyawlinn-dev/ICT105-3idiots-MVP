import { cn } from "../../lib/utils"

type StatusBadgeProps = {
  status: string
}

const statusStyles: Record<string, string> = {
  Available: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Limited: "bg-amber-50 text-amber-700 ring-amber-200",
  Unavailable: "bg-slate-100 text-slate-600 ring-slate-200",
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Pending: "bg-violet-50 text-violet-700 ring-violet-200",
  Rejected: "bg-rose-50 text-rose-700 ring-rose-200",
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset",
        statusStyles[status] ?? "bg-slate-100 text-slate-600 ring-slate-200",
      )}
    >
      {status}
    </span>
  )
}
