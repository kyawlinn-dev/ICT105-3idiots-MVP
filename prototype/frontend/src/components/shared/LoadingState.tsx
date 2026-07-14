import { LoaderCircle } from "lucide-react"

type LoadingStateProps = {
  label?: string
  compact?: boolean
}

export function LoadingState({ label = "Loading…", compact = false }: LoadingStateProps) {
  return (
    <div className={compact ? "flex items-center justify-center gap-2 py-4 text-sm font-semibold text-slate-500" : "flex min-h-40 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-8 text-sm font-semibold text-slate-500"} role="status" aria-live="polite">
      <LoaderCircle className="h-5 w-5 animate-spin text-blue-600" />
      <span>{label}</span>
    </div>
  )
}
