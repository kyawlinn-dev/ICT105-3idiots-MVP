import { ArrowRight, Building2, CheckCircle2, MapPin, MessageCircle, Search, ShieldCheck } from "lucide-react"
import { type FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ApartmentCard } from "../../components/shared/ApartmentCard"
import { EmptyState } from "../../components/shared/EmptyState"
import { LoadingState } from "../../components/shared/LoadingState"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import landingStudentRoom from "../../assets/landing-student-room.webp"
import type { Apartment } from "../../data/mockData"

type HomePageProps = {
  apartments: Apartment[]
  savedIds: string[]
  onToggleSave: (id: string) => void
  loading?: boolean
}

export function HomePage({ apartments, savedIds, onToggleSave, loading }: HomePageProps) {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const featured = apartments.filter((apartment) => apartment.approvalStatus === "Approved").slice(0, 3)

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = search.trim()
    navigate(query ? `/apartments?search=${encodeURIComponent(query)}` : "/apartments")
  }

  return (
    <main className="bg-[#f5f7fb]">
      <section className="border-b border-slate-100 bg-gradient-to-b from-blue-50/80 to-white">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 py-7 sm:px-6 md:py-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-9 xl:py-10">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-600 sm:text-sm">Student housing around Pathum Thani</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-[1.12] tracking-tight text-slate-950 min-[420px]:text-4xl lg:text-[2.85rem] xl:text-5xl">
              Find student apartments near Rangsit and Bangkok University.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 lg:text-[1.05rem]">
              Compare verified landlord listings by university, area, price, distance, facilities, photos, and map location.
            </p>
            <form className="mt-5 flex max-w-2xl flex-col gap-3 rounded-xl border border-slate-200 bg-white p-2 shadow-[0_8px_28px_rgba(24,119,242,0.12)] sm:flex-row" onSubmit={submitSearch} role="search">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by apartment, area, or university" aria-label="Search apartments" className="h-12 border-0 pl-9 shadow-none focus:ring-0" />
              </div>
              <Button type="submit" className="h-12 w-full bg-blue-600 px-8 hover:bg-blue-700 sm:w-auto">Search</Button>
            </form>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild variant="outline" className="h-11 w-full sm:w-auto">
                <Link to="/apartments">Browse Apartments</Link>
              </Button>
              <Button asChild variant="ghost" className="h-11 w-full sm:w-auto">
                <Link to="/roommates">Find Roommates</Link>
              </Button>
            </div>
          </div>
          <div className="relative min-h-60 overflow-hidden rounded-xl border border-blue-100 bg-slate-100 shadow-xl shadow-blue-100 sm:min-h-72 lg:min-h-[320px] xl:min-h-[360px]">
            <img src={landingStudentRoom} alt="Bright furnished student apartment room" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent p-5 text-white">
              <p className="text-sm font-bold uppercase tracking-wide">Move with confidence</p>
              <p className="mt-2 max-w-md text-sm leading-6 text-blue-50">
                Explore real rooms, compare practical details, and open every listing on Google Maps before you visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-6 min-[520px]:grid-cols-2 sm:px-6 xl:grid-cols-4 xl:px-8">
        {[
          ["Apartments", apartments.length.toString(), Building2],
          ["Approved", apartments.filter((item) => item.approvalStatus === "Approved").length.toString(), ShieldCheck],
          ["Saved", savedIds.length.toString(), CheckCircle2],
          ["Roommate board", "Open", MessageCircle],
        ].map(([label, value, Icon]) => (
          <Card key={label as string}>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm font-semibold text-slate-500">{label as string}</p>
                <p className="mt-1 text-3xl font-bold text-slate-950">{loading && label !== "Saved" && label !== "Roommate board" ? "—" : value as string}</p>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <Icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="border-y border-slate-100 bg-slate-50" id="about">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-8 sm:px-6 md:grid-cols-3 xl:px-8">
          {[
            { title: "Near campus", text: "Filter by Rangsit University or Bangkok University and compare distance in km.", icon: MapPin },
            { title: "Student-ready", text: "Check facilities such as Wi-Fi, keycard, laundry, CCTV, gym, pool, and study area.", icon: ShieldCheck },
            { title: "Clear contact flow", text: "Shortlist rooms and message landlords from approved listing pages.", icon: MessageCircle },
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

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 xl:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-blue-600">Featured apartments</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Approved places near Rangsit campuses</h2>
          </div>
          <Button asChild variant="outline" className="h-11 w-full sm:w-auto">
            <Link to="/apartments">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        {loading ? (
          <LoadingState label="Loading featured apartments…" />
        ) : featured.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((apartment) => (
              <ApartmentCard key={apartment.id} apartment={apartment} isSaved={savedIds.includes(apartment.id)} onToggleSave={onToggleSave} />
            ))}
          </div>
        ) : (
          <EmptyState title="No approved apartments yet" description="After landlords submit real listings and admin approves them, they will appear here." />
        )}
      </section>

      <section className="bg-blue-600 text-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 xl:px-8">
          {[
            ["Search by university", "Find apartments around your campus area."],
            ["Compare details", "Review photos, price, facilities, distance, and map position."],
            ["Save or contact", "Shortlist approved rooms and message the landlord."],
          ].map(([step, text], index) => (
            <div key={step}>
              <p className="text-sm font-bold text-blue-100">Step {index + 1}</p>
              <h3 className="mt-2 text-xl font-bold">{step}</h3>
              <p className="mt-2 text-sm leading-6 text-blue-100">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-slate-950 px-4 py-8 text-sm text-slate-300 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-white">Student Apartment Finder</p>
          <p>Student housing search for Pathum Thani campuses.</p>
        </div>
      </footer>
    </main>
  )
}


