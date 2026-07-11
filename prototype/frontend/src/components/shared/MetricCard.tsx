import type { LucideIcon } from "lucide-react"
import { cn } from "../../lib/utils"
import { Card, CardContent } from "../ui/card"

type MetricCardProps = {
  label: string
  value: string
  change: string
  type?: "positive" | "neutral" | "warning"
  icon: LucideIcon
}

export function MetricCard({ label, value, change, type = "neutral", icon: Icon }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-2 p-2.5">
        <div>
          <p className="text-[11px] font-semibold text-slate-500">{label}</p>
          <p className="mt-1 text-lg font-bold text-slate-950">{value}</p>
          <p
            className={cn(
              "mt-1 text-[11px] font-semibold",
              type === "positive" && "text-emerald-600",
              type === "warning" && "text-amber-600",
              type === "neutral" && "text-blue-600",
            )}
          >
            {change}
          </p>
        </div>
        <div className="rounded-md bg-blue-50 p-1.5 text-blue-600">
          <Icon className="h-3.5 w-3.5" />
        </div>
      </CardContent>
    </Card>
  )
}
