import * as React from "react"
import { cn } from "../../lib/utils"

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-none outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100",
        className,
      )}
      {...props}
    />
  )
}
