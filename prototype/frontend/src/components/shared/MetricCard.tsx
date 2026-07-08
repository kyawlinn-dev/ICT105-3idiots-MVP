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
      <CardContent className="flex items-start justify-between gap-4 p-4">
        <div>
          <p className="text-xs font-semibold text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
          <p
            className={cn(
              "mt-2 text-sm font-semibold",
              type === "positive" && "text-emerald-600",
              type === "warning" && "text-amber-600",
              type === "neutral" && "text-blue-600",
            )}
          >
            {change}
          </p>
        </div>
        <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  )
}
