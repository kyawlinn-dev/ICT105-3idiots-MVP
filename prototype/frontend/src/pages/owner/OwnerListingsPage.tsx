import { RefreshCcw } from "lucide-react"
import { PageHeader } from "../../components/shared/PageHeader"
import { StatusBadge } from "../../components/shared/StatusBadge"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import type { Apartment, AvailabilityStatus } from "../../data/mockData"
import { formatCurrency } from "../../lib/utils"

type OwnerListingsPageProps = {
  listings: Apartment[]
  onUpdateAvailability: (id: string, status: AvailabilityStatus) => void
}

export function OwnerListingsPage({ listings, onUpdateAvailability }: OwnerListingsPageProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Owner workflow"
        title="Manage my listings"
        description="Update mock availability and view each listing review status without creating a backend account."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard label="Total listings" value={`${listings.length}`} />
        <SummaryCard label="Approved" value={`${listings.filter((item) => item.approvalStatus === "Approved").length}`} />
        <SummaryCard label="Pending review" value={`${listings.filter((item) => item.approvalStatus === "Pending").length}`} />
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Apartment</th>
                  <th className="px-5 py-3 font-semibold">Price</th>
                  <th className="px-5 py-3 font-semibold">Availability</th>
                  <th className="px-5 py-3 font-semibold">Review</th>
                  <th className="px-5 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {listings.map((listing) => (
                  <tr key={listing.id}>
                    <td className="px-5 py-4">
                      <p className="font-bold text-slate-950">{listing.name}</p>
                      <p className="text-slate-500">{listing.location}</p>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-800">{formatCurrency(listing.price)}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={listing.availabilityStatus} />
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={listing.approvalStatus} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" onClick={() => onUpdateAvailability(listing.id, "Available")}>
                          <RefreshCcw className="h-4 w-4" />
                          Available
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => onUpdateAvailability(listing.id, "Unavailable")}>
                          Mark Unavailable
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm font-semibold text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
      </CardContent>
    </Card>
  )
}
