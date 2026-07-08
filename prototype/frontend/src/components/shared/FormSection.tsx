import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

type FormSectionProps = {
  title: string
  description: string
  children: React.ReactNode
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid gap-4 md:grid-cols-3">{children}</div>
      </CardContent>
    </Card>
  )
}
