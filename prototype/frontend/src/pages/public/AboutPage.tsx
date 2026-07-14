import { Building2, CheckCircle2, MapPin, ShieldCheck, UsersRound } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"

const values = [
  {
    title: "Verified listing flow",
    text: "Landlords submit real room details, photos, and a confirmed Google map location before a listing goes live.",
    icon: ShieldCheck,
  },
  {
    title: "Student-first search",
    text: "Students compare rent, distance, facilities, availability, and location in one focused housing view.",
    icon: Building2,
  },
  {
    title: "Location confidence",
    text: "Map views help students understand where a room is before they contact a landlord or arrange a visit.",
    icon: MapPin,
  },
]

export function AboutPage() {
  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8 lg:py-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-blue-600">About Student Apartment Finder</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              A practical housing search platform for students around Pathum Thani campuses.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Student Apartment Finder connects students with landlord-submitted apartment listings near Rangsit University, Bangkok University, and nearby student areas. The platform focuses on useful details, real photos, and map-based confidence before students contact landlords.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to="/apartments">Browse apartments</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/owner/signup">List a property</Link>
              </Button>
            </div>
          </div>
          <Card className="bg-blue-600 text-white">
            <CardContent className="grid h-full content-center gap-5 p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/15">
                <UsersRound className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-blue-100">Built for student decisions</p>
                <p className="mt-2 text-3xl font-bold">Search. Compare. Visit prepared.</p>
              </div>
              <p className="text-sm leading-6 text-blue-50">
                Every public listing is designed to answer the questions students ask first: price, distance, facilities, photos, availability, and exact location.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
        {values.map((value) => (
          <Card key={value.title}>
            <CardContent className="p-5">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-600">
                <value.icon className="h-5 w-5" />
              </div>
              <h2 className="text-base font-bold text-slate-950">{value.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{value.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="grid gap-5 p-5 md:grid-cols-3">
            {[
              ["For students", "Find landlord-submitted apartment options and save rooms for later comparison."],
              ["For landlords", "Upload room information, photos, and Google Places location data from one portal."],
              ["For admins", "Review submitted listings before they become visible to students."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-lg bg-slate-50 p-4">
                <div className="mb-3 flex items-center gap-2 text-blue-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <p className="text-sm font-bold">{title}</p>
                </div>
                <p className="text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
