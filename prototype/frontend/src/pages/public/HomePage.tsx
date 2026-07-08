import { ArrowRight, Building2, CheckCircle2, MapPin, MessageCircle, Search, ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"
import { ApartmentCard } from "../../components/shared/ApartmentCard"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import type { Apartment } from "../../data/mockData"

type HomePageProps = {
  apartments: Apartment[]
  savedIds: string[]
  onToggleSave: (id: string) => void
}

export function HomePage({ apartments, savedIds, onToggleSave }: HomePageProps) {
  const featured = apartments.filter((apartment) => apartment.approvalStatus === "Approved").slice(0, 3)

  return (
    <main className="bg-white">
      <section className="border-b border-slate-100 bg-gradient-to-b from-blue-50/70 to-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-wide text-blue-600">Student housing around Pathum Thani</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Find student apartments near Rangsit and Bangkok University.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Compare mock apartment and condo listings by university, area, price, distance, facilities, and availability. Built for the ICT105 frontend prototype.
            </p>
            <div className="mt-8 flex max-w-2xl flex-col gap-3 rounded-xl border border-slate-200 bg-white p-2 shadow-lg shadow-blue-100/60 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input placeholder="Search by apartment, area, or university" className="h-12 border-0 pl-9 shadow-none focus:ring-0" />
              </div>
              <Button asChild className="h-12 w-full bg-blue-600 px-8 hover:bg-blue-700 sm:w-auto">
                <Link to="/apartments">Search</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild variant="outline" className="h-11 w-full sm:w-auto">
                <Link to="/apartments">Browse Apartments</Link>
              </Button>
              <Button asChild variant="ghost" className="h-11 w-full sm:w-auto">
                <Link to="/roommates">Find Roommates</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80"
              alt="Bright student apartment interior"
              className="h-72 w-full rounded-2xl object-cover shadow-2xl shadow-blue-100 sm:h-96 lg:h-[520px]"
            />
            <Card className="mt-4 sm:absolute sm:bottom-6 sm:left-6 sm:mt-0 sm:max-w-xs">
              <CardContent className="p-5">
                <p className="text-sm font-bold text-slate-950">Rangsit area coverage</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Lak Hok, Muang Ake, Khlong Nueng, Khlong Luang, Thanyaburi, and Pathum Thani.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {[
          ["Apartments", apartments.length.toString(), Building2],
          ["Approved", apartments.filter((item) => item.approvalStatus === "Approved").length.toString(), ShieldCheck],
          ["Saved", savedIds.length.toString(), CheckCircle2],
          ["Roommate posts", "3", MessageCircle],
        ].map(([label, value, Icon]) => (
          <Card key={label as string}>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm font-semibold text-slate-500">{label as string}</p>
                <p className="mt-1 text-3xl font-bold text-slate-950">{value as string}</p>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <Icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="border-y border-slate-100 bg-slate-50" id="about">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            { title: "Near campus", text: "Filter by Rangsit University or Bangkok University and compare distance in km.", icon: MapPin },
            { title: "Student-ready", text: "Check facilities such as Wi-Fi, keycard, laundry, CCTV, gym, pool, and study area.", icon: ShieldCheck },
            { title: "Clear contact flow", text: "Shortlist rooms and use mock owner contact cards without real personal data.", icon: MessageCircle },
          ].map((feature) => (
            <Card key={feature.title}>
              <CardContent className="p-6">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-950">{feature.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-blue-600">Featured apartments</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Approved places near Rangsit campuses</h2>
          </div>
          <Button asChild variant="outline" className="h-11 w-full sm:w-auto">
            <Link to="/apartments">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {featured.map((apartment) => (
            <ApartmentCard key={apartment.id} apartment={apartment} isSaved={savedIds.includes(apartment.id)} onToggleSave={onToggleSave} />
          ))}
        </div>
      </section>

      <section className="bg-blue-600 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
          {["Search by university", "Compare details", "Save or contact"].map((step, index) => (
            <div key={step}>
              <p className="text-sm font-bold text-blue-100">Step {index + 1}</p>
              <h3 className="mt-2 text-xl font-bold">{step}</h3>
              <p className="mt-2 text-sm leading-6 text-blue-100">A focused frontend-only workflow for the student apartment finder prototype.</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-slate-950 px-4 py-8 text-sm text-slate-300 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-white">Student Apartment Finder</p>
          <p>Mock data only. Built for ICT105 Lab 05.</p>
        </div>
      </footer>
    </main>
  )
}
