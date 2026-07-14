import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { PageHeader } from "../../components/shared/PageHeader"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import type { Apartment } from "../../data/mockData"
import { OwnerAddListingPage } from "./OwnerAddListingPage"

type OwnerEditListingPageProps = {
  listings: Apartment[]
  onListingUpdated?: () => void | Promise<void>
}

export function OwnerEditListingPage({ listings, onListingUpdated }: OwnerEditListingPageProps) {
  const { id } = useParams()
  const listing = listings.find((item) => item.id === id)

  if (!listing) {
    return (
      <div className="mx-auto max-w-4xl space-y-4">
        <PageHeader
          eyebrow="Landlord workflow"
          title="Listing not found"
          description="This listing may still be loading, or it may not belong to your landlord account."
          action={
            <Button asChild variant="outline">
              <Link to="/owner/listings">
                <ArrowLeft className="h-4 w-4" />
                Back to listings
              </Link>
            </Button>
          }
        />
        <Card>
          <CardContent className="p-5 text-sm font-semibold text-slate-500">
            Open My Listings again after landlord records finish loading. Landlords can only edit listings connected to their account.
          </CardContent>
        </Card>
      </div>
    )
  }

  return <OwnerAddListingPage listing={listing} onListingCreated={onListingUpdated} />
}
