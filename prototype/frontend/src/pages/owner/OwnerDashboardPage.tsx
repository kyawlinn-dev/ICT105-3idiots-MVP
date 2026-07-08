import { Eye, Inbox, LineChart, PlusCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { MetricCard } from "../../components/shared/MetricCard"
import { StatusBadge } from "../../components/shared/StatusBadge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import type { Apartment } from "../../data/mockData"
import { formatCurrency } from "../../lib/utils"

type OwnerDashboardPageProps = {
  listings: Apartment[]
}

export function OwnerDashboardPage({ listings }: OwnerDashboardPageProps) {
  const ownerListings = listings.slice(0, 6)

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">Owner overview</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Welcome back, Krit</h1>
          <p className="mt-2 text-sm text-slate-600">Track listing status, room availability, and student interest around Rangsit.</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link to="/owner/add-listing">
            <PlusCircle className="h-4 w-4" />
            Add Listing
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="My Listings" value={`${ownerListings.length}`} change="Active mock records" type="neutral" icon={Eye} />
        <MetricCard label="Available Rooms" value={`${ownerListings.filter((item) => item.availabilityStatus === "Available").length}`} change="Ready for students" type="positive" icon={Inbox} />
        <MetricCard label="Pending Review" value={`${ownerListings.filter((item) => item.approvalStatus === "Pending").length}`} change="Admin queue" type="warning" icon={LineChart} />
        <MetricCard label="Avg. Rent" value={formatCurrency(Math.round(ownerListings.reduce((sum, item) => sum + item.price, 0) / ownerListings.length))} change="THB/month" type="neutral" icon={LineChart} />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-5">
          <CardTitle>Recent owner listings</CardTitle>
          <Button asChild variant="outline" size="sm">
            <Link to="/owner/listings">Manage all</Link>
          </Button>
        </CardHeader>
        <CardContent className="grid gap-3 p-5 pt-0">
          {ownerListings.map((listing) => (
            <div key={listing.id} className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold text-slate-950">{listing.name}</p>
                <p className="mt-1 text-sm text-slate-500">{listing.location} - {formatCurrency(listing.price)} THB/month</p>
              </div>
              <div className="flex gap-2">
                <StatusBadge status={listing.availabilityStatus} />
                <StatusBadge status={listing.approvalStatus} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
