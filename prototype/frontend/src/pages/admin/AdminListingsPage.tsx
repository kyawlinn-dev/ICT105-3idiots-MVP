import { Check, Edit, Filter, Search, Trash2, X } from "lucide-react"
import { useMemo, useState } from "react"
import { StatusBadge } from "../../components/shared/StatusBadge"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Select } from "../../components/ui/select"
import type { Apartment, ApprovalStatus } from "../../data/mockData"
import { formatCurrency } from "../../lib/utils"

type AdminListingsPageProps = {
  listings: Apartment[]
  onUpdateApproval: (id: string, status: ApprovalStatus) => void
  onDeleteListing: (id: string) => void
}

export function AdminListingsPage({ listings, onUpdateApproval, onDeleteListing }: AdminListingsPageProps) {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("")

  const filteredListings = useMemo(() => {
    const keyword = query.trim().toLowerCase()

    return listings.filter((listing) => {
      const matchesQuery =
        !keyword ||
        listing.name.toLowerCase().includes(keyword) ||
        listing.location.toLowerCase().includes(keyword) ||
        listing.ownerName.toLowerCase().includes(keyword)
      const matchesStatus = !status || listing.approvalStatus === status

      return matchesQuery && matchesStatus
    })
  }, [listings, query, status])

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <div className="flex flex-col gap-3 rounded-lg border border-slate-200/80 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-violet-600">Admin Panel</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">Manage Apartment Listings</h1>
        </div>
        <Button>+ Add Listing</Button>
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold">
            <button className="rounded-lg bg-violet-50 px-3 py-1.5 text-violet-700">All ({listings.length})</button>
            <button className="rounded-lg px-3 py-1.5 text-slate-500 hover:bg-slate-50">Pending ({listings.filter((item) => item.approvalStatus === "Pending").length})</button>
            <button className="rounded-lg px-3 py-1.5 text-slate-500 hover:bg-slate-50">Approved ({listings.filter((item) => item.approvalStatus === "Approved").length})</button>
            <button className="rounded-lg px-3 py-1.5 text-slate-500 hover:bg-slate-50">Rejected ({listings.filter((item) => item.approvalStatus === "Rejected").length})</button>
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_160px_160px_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search apartment..." className="pl-9" />
            </div>
            <Select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </Select>
            <Select defaultValue="all">
              <option value="all">All Location</option>
              <option value="near">Rangsit University</option>
              <option value="station">Bangkok University</option>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Apartment</th>
                  <th className="px-5 py-3 font-semibold">Owner</th>
                  <th className="px-5 py-3 font-semibold">Location</th>
                  <th className="px-5 py-3 font-semibold">Price</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredListings.map((listing) => (
                  <tr key={listing.id}>
                    <td className="px-5 py-4 font-bold text-slate-950">{listing.name}</td>
                    <td className="px-5 py-4 text-slate-600">{listing.ownerName}</td>
                    <td className="px-5 py-4 text-slate-600">{listing.distanceFromCampus} km</td>
                    <td className="px-5 py-4 text-slate-600">{formatCurrency(listing.price)}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={listing.approvalStatus} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <IconAction label="Approve" onClick={() => onUpdateApproval(listing.id, "Approved")}>
                          <Check className="h-4 w-4" />
                        </IconAction>
                        <IconAction label="Reject" onClick={() => onUpdateApproval(listing.id, "Rejected")}>
                          <X className="h-4 w-4" />
                        </IconAction>
                        <IconAction label="Edit">
                          <Edit className="h-4 w-4" />
                        </IconAction>
                        <IconAction label="Delete" danger onClick={() => onDeleteListing(listing.id)}>
                          <Trash2 className="h-4 w-4" />
                        </IconAction>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center gap-2 border-t border-slate-100 p-4 text-xs">
            {[1, 2, 3, 4, 5].map((page) => (
              <button key={page} className={page === 1 ? "rounded-lg bg-violet-600 px-3 py-1.5 text-white" : "rounded-lg px-3 py-1.5 text-slate-500 hover:bg-slate-50"}>
                {page}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function IconAction({ label, danger, onClick, children }: { label: string; danger?: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={danger ? "rounded-lg p-2 text-rose-500 hover:bg-rose-50" : "rounded-lg p-2 text-slate-500 hover:bg-violet-50 hover:text-violet-700"}
    >
      {children}
    </button>
  )
}
