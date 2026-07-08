import { Building2, ShieldCheck, UserRound } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"

export function SignInPage() {
  return (
    <main className="bg-slate-50 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-600">Choose prototype role</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Continue to Student Apartment Finder</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
          This is a frontend-only prototype. Pick a role to jump into the matching experience.
        </p>
      </section>
      <section className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
        {[
          { label: "Continue as Student", to: "/", icon: UserRound, text: "Browse apartments and manage your shortlist." },
          { label: "Continue as Apartment Owner", to: "/owner/dashboard", icon: Building2, text: "Manage listings and owner workflows." },
          { label: "Continue as Admin", to: "/admin/dashboard", icon: ShieldCheck, text: "Review listings and platform analytics." },
        ].map((role) => (
          <Card key={role.label} className="transition hover:-translate-y-0.5 hover:shadow-lg">
            <CardContent className="flex h-full flex-col p-6">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-blue-600">
                <role.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-lg font-bold text-slate-950">{role.label}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{role.text}</p>
              <Button asChild className="mt-5 h-11 w-full bg-blue-600 hover:bg-blue-700">
                <Link to={role.to}>{role.label}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}
