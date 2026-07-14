import { Calendar, Heart, MapPin, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { ApartmentListItem } from "../../components/shared/ApartmentCard"
import { EmptyState } from "../../components/shared/EmptyState"
import { LoadingState } from "../../components/shared/LoadingState"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import type { Apartment, RoommatePost } from "../../data/mockData"
import { formatCurrency } from "../../lib/utils"
import { getRoommatePosts, getSavedRoommatePosts, removeSavedRoommatePost } from "../../services/api/roommates"
import type { AuthProfile } from "../../services/api/types"

type SavedPageProps = {
  apartments: Apartment[]
  savedIds: string[]
  onToggleSave: (id: string) => void
  session: AuthProfile | null
  apartmentsLoading?: boolean
}

export function SavedPage({ apartments, savedIds, onToggleSave, session, apartmentsLoading }: SavedPageProps) {
  const [tab, setTab] = useState<"apartments" | "roommates">("apartments")
  const [savedRoommates, setSavedRoommates] = useState<RoommatePost[]>([])
  const [roommatesLoading, setRoommatesLoading] = useState(false)
  const savedApartments = apartments.filter((apartment) => savedIds.includes(apartment.id))
  const isStudent = session?.role === "student"

  useEffect(() => {
    let active = true
    if (!isStudent) {
      setSavedRoommates([])
      return () => { active = false }
    }

    setRoommatesLoading(true)
    Promise.all([getRoommatePosts(), getSavedRoommatePosts()])
      .then(([posts, ids]) => {
        if (active) setSavedRoommates(posts.filter((post) => ids.includes(post.id)))
      })
      .catch((error) => {
        console.error(error)
        if (active) toast.error("Saved roommate posts could not be loaded.")
      })
      .finally(() => {
        if (active) setRoommatesLoading(false)
      })

    return () => { active = false }
  }, [isStudent, session?.id])

  const removeRoommate = async (id: string) => {
    const previous = savedRoommates
    setSavedRoommates((current) => current.filter((post) => post.id !== id))
    try {
      await removeSavedRoommatePost(id)
      toast.success("Removed from saved roommate posts.")
    } catch (error) {
      console.error(error)
      setSavedRoommates(previous)
      toast.error("Roommate post could not be removed.")
    }
  }

  return (
    <main className="bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl">
        <Card>
          <CardHeader className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-blue-600">Student shortlist</p>
              <CardTitle className="mt-1 text-xl">My saved items</CardTitle>
            </div>
            <Button asChild variant="outline" className="h-11 w-full sm:w-auto">
              <Link to={tab === "apartments" ? "/apartments" : "/roommates"}>Browse more</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="mb-4 grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
              <button type="button" onClick={() => setTab("apartments")} className={tab === "apartments" ? "rounded-md bg-white px-3 py-2 text-sm font-bold text-blue-700 shadow-sm" : "rounded-md px-3 py-2 text-sm font-semibold text-slate-600"}>
                Apartments ({savedApartments.length})
              </button>
              <button type="button" onClick={() => setTab("roommates")} className={tab === "roommates" ? "rounded-md bg-white px-3 py-2 text-sm font-bold text-blue-700 shadow-sm" : "rounded-md px-3 py-2 text-sm font-semibold text-slate-600"}>
                Roommates ({savedRoommates.length})
              </button>
            </div>

            {tab === "apartments" ? (
              <div className="grid gap-3">
                {apartmentsLoading ? <LoadingState label="Loading saved apartments…" /> : savedApartments.length > 0 ? savedApartments.map((apartment) => (
                  <ApartmentListItem key={apartment.id} apartment={apartment} isSaved onToggleSave={onToggleSave} />
                )) : (
                  <EmptyState title="No saved apartments yet" description="Open the apartment listing page and use the heart button to add apartments to your shortlist." />
                )}
              </div>
            ) : !isStudent ? (
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-6 text-center">
                <Users className="mx-auto h-8 w-8 text-blue-600" />
                <h2 className="mt-3 font-bold text-slate-950">Sign in to view saved roommate posts</h2>
                <p className="mt-2 text-sm text-slate-600">Saved roommate posts are connected to your student account.</p>
                <Button asChild className="mt-4">
                  <Link to="/signin" state={{ redirectTo: "/saved" }}>Student sign in</Link>
                </Button>
              </div>
            ) : roommatesLoading ? (
              <LoadingState label="Loading saved roommate posts…" />
            ) : savedRoommates.length ? (
              <div className="grid gap-3">
                {savedRoommates.map((post) => (
                  <article key={post.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="font-bold text-slate-950">{post.title}</h2>
                        <p className="mt-1 text-sm text-slate-500">Posted by {post.posterName}</p>
                      </div>
                      <button type="button" className="shrink-0 rounded-full bg-rose-50 p-2 text-rose-500" onClick={() => removeRoommate(post.id)} aria-label="Remove saved roommate post">
                        <Heart className="h-4 w-4 fill-rose-500" />
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-600">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-blue-600" />{post.locationPreference}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-blue-600" />{formatMoveIn(post.moveInDate)}</span>
                      <span>{budgetLabel(post)}</span>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button asChild size="sm" variant="outline">
                        <Link to="/roommates">View roommate board</Link>
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState title="No saved roommate posts yet" description="Open the roommate board and use the heart button to save posts here." />
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

function budgetLabel(post: RoommatePost) {
  return post.budgetMin ? `${formatCurrency(post.budgetMin)} – ${formatCurrency(post.budget)}` : `Up to ${formatCurrency(post.budget)}`
}

function formatMoveIn(value: string) {
  const match = /^(\d{4})-(\d{2})$/.exec(value)
  if (!match) return value
  return new Intl.DateTimeFormat("en", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, 1)))
}
