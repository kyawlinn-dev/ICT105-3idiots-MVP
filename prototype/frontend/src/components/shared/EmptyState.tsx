import { SearchX } from "lucide-react"
import { Card, CardContent } from "../ui/card"

type EmptyStateProps = {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center px-6 py-8 text-center sm:py-10">
        <div className="mb-4 rounded-full bg-blue-50 p-3 text-blue-600">
          <SearchX className="h-7 w-7" />
        </div>
        <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
      </CardContent>
    </Card>
  )
}
