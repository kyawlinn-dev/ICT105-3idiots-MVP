import { Link } from "react-router-dom"
import { ApartmentListItem } from "../../components/shared/ApartmentCard"
import { EmptyState } from "../../components/shared/EmptyState"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import type { Apartment } from "../../data/mockData"

type SavedPageProps = {
  apartments: Apartment[]
  savedIds: string[]
  onToggleSave: (id: string) => void
}

export function SavedPage({ apartments, savedIds, onToggleSave }: SavedPageProps) {
  const savedApartments = apartments.filter((apartment) => savedIds.includes(apartment.id))

  return (
    <main className="bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl">
        <Card>
          <CardHeader className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-violet-600">Student shortlist</p>
              <CardTitle className="mt-1 text-xl">My Shortlist</CardTitle>
            </div>
            <Button asChild variant="outline" className="h-11 w-full sm:w-auto">
              <Link to="/apartments">Browse more</Link>
            </Button>
          </CardHeader>
          <CardContent className="grid gap-3 p-4 pt-0">
            {savedApartments.length > 0 ? (
              savedApartments.map((apartment) => (
                <ApartmentListItem key={apartment.id} apartment={apartment} isSaved onToggleSave={onToggleSave} />
              ))
            ) : (
              <EmptyState title="No saved apartments yet" description="Open the apartment listing page and use the heart button to add apartments to your shortlist." />
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
