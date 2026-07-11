import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

type ChartCardProps = {
  title: string
  description: string
  children: React.ReactNode
}

export function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <Card>
      <CardHeader className="p-3 pb-1.5">
        <CardTitle className="text-sm">{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-3 pt-1.5">{children}</CardContent>
    </Card>
  )
}
