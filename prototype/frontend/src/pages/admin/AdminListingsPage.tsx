import { CheckCircle2, Eye, Filter, MoreHorizontal, Search, Trash2, XCircle } from "lucide-react"
import type { RefObject } from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { PageHeader } from "../../components/shared/PageHeader"
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
  const [location, setLocation] = useState("")
  const [openMenuId, setOpenMenuId] = useState("")
  const menuRootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!openMenuId) {
      return
    }

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (menuRootRef.current?.contains(event.target as Node)) {
        return
      }
      setOpenMenuId("")
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenuId("")
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick)
    document.addEventListener("keydown", closeOnEscape)

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [openMenuId])

  const filteredListings = useMemo(() => {
    const keyword = query.trim().toLowerCase()

    return listings.filter((listing) => {
      const matchesQuery =
        !keyword ||
        listing.name.toLowerCase().includes(keyword) ||
        listing.location.toLowerCase().includes(keyword) ||
        listing.ownerName.toLowerCase().includes(keyword)
      const matchesStatus = !status || listing.approvalStatus === status
      const matchesLocation = !location || listing.nearUniversity === location

      return matchesQuery && matchesStatus && matchesLocation
    })
  }, [listings, location, query, status])

  const setApproval = (listing: Apartment, nextStatus: ApprovalStatus) => {
    setOpenMenuId("")
    if (listing.approvalStatus !== nextStatus) {
      onUpdateApproval(listing.id, nextStatus)
    }
  }

  const deleteListing = (id: string) => {
    setOpenMenuId("")
    onDeleteListing(id)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <PageHeader
        eyebrow="Admin panel"
        title="Manage apartment listings"
        description="Review owner submissions, approve valid rooms, reject incomplete records, and remove outdated listings."
      />

      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold">
            <FilterTab active={!status} label={`All (${listings.length})`} onClick={() => setStatus("")} />
            <FilterTab active={status === "Pending"} label={`Pending (${listings.filter((item) => item.approvalStatus === "Pending").length})`} onClick={() => setStatus("Pending")} />
            <FilterTab active={status === "Approved"} label={`Approved (${listings.filter((item) => item.approvalStatus === "Approved").length})`} onClick={() => setStatus("Approved")} />
            <FilterTab active={status === "Rejected"} label={`Rejected (${listings.filter((item) => item.approvalStatus === "Rejected").length})`} onClick={() => setStatus("Rejected")} />
          </div>
          <div className="grid gap-2 md:grid-cols-[1fr_150px_170px_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search apartment, owner, or location" className="pl-9" />
            </div>
            <Select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">All status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </Select>
            <Select value={location} onChange={(event) => setLocation(event.target.value)}>
              <option value="">All universities</option>
              <option value="Rangsit University">Rangsit University</option>
              <option value="Bangkok University">Bangkok University</option>
            </Select>
            <Button variant="outline" onClick={() => { setQuery(""); setStatus(""); setLocation("") }}>
              <Filter className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 md:hidden">
        {filteredListings.length ? filteredListings.map((listing) => (
          <Card key={listing.id}>
            <CardContent className="space-y-3 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="break-words font-bold text-slate-950">{listing.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{listing.ownerName}</p>
                </div>
                <AdminListingActions
                  listing={listing}
                  open={openMenuId === listing.id}
                  menuRootRef={openMenuId === listing.id ? menuRootRef : undefined}
                  onToggle={() => setOpenMenuId((current) => (current === listing.id ? "" : listing.id))}
                  onApproval={setApproval}
                  onDelete={deleteListing}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <InfoBlock label="Price" value={formatCurrency(listing.price)} />
                <InfoBlock label="Distance" value={`${listing.distanceFromCampus} km`} />
                <InfoBlock label="Review" value={<StatusBadge status={listing.approvalStatus} />} />
                <InfoBlock label="Owner" value={listing.ownerName} />
              </div>
            </CardContent>
          </Card>
        )) : <EmptyListings />}
      </div>

      <Card className="hidden overflow-visible md:block">
        <CardContent className="overflow-visible p-0">
          <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(120px,0.8fr)_110px_110px_130px_64px] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-500">
            <span>Apartment</span>
            <span>Owner</span>
            <span>Location</span>
            <span>Price</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>
          <div className="divide-y divide-slate-100 overflow-visible">
            {filteredListings.length ? filteredListings.map((listing) => (
              <div key={listing.id} className="grid grid-cols-[minmax(0,1.4fr)_minmax(120px,0.8fr)_110px_110px_130px_64px] items-center gap-3 px-4 py-3 text-xs">
                <div className="min-w-0">
                  <p className="truncate font-bold text-slate-950">{listing.name}</p>
                  <p className="truncate text-slate-500">{listing.location}</p>
                </div>
                <p className="truncate text-slate-600">{listing.ownerName}</p>
                <p className="text-slate-600">{listing.distanceFromCampus} km</p>
                <p className="font-semibold text-slate-800">{formatCurrency(listing.price)}</p>
                <div>
                  <StatusBadge status={listing.approvalStatus} />
                </div>
                <div className="text-right">
                  <AdminListingActions
                    listing={listing}
                    open={openMenuId === listing.id}
                    menuRootRef={openMenuId === listing.id ? menuRootRef : undefined}
                    onToggle={() => setOpenMenuId((current) => (current === listing.id ? "" : listing.id))}
                    onApproval={setApproval}
                    onDelete={deleteListing}
                  />
                </div>
              </div>
            )) : (
              <div className="p-4">
                <EmptyListings />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AdminListingActions({
  listing,
  open,
  menuRootRef,
  onToggle,
  onApproval,
  onDelete,
}: {
  listing: Apartment
  open: boolean
  menuRootRef?: RefObject<HTMLDivElement | null>
  onToggle: () => void
  onApproval: (listing: Apartment, status: ApprovalStatus) => void
  onDelete: (id: string) => void
}) {
  const canViewPublic = listing.approvalStatus === "Approved"

  return (
    <div ref={menuRootRef} className="relative inline-flex justify-end">
      <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={onToggle} aria-haspopup="menu" aria-expanded={open}>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
      {open ? (
        <div className="absolute right-0 top-9 z-50 w-52 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 text-left shadow-xl shadow-slate-200/80">
          {canViewPublic ? (
            <ActionLink to={`/apartments/${listing.id}`} icon={Eye} label="View public listing" />
          ) : (
            <ActionButton icon={Eye} label="Public view unavailable" disabled />
          )}
          <div className="my-1 border-t border-slate-100" />
          <ActionButton icon={CheckCircle2} label="Approve listing" onClick={() => onApproval(listing, "Approved")} />
          <ActionButton icon={XCircle} label="Reject listing" onClick={() => onApproval(listing, "Rejected")} />
          <div className="my-1 border-t border-slate-100" />
          <ActionButton icon={Trash2} label="Delete listing" danger onClick={() => onDelete(listing.id)} />
        </div>
      ) : null}
    </div>
  )
}

function FilterTab({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={active ? "rounded-lg bg-violet-50 px-3 py-1.5 text-violet-700" : "rounded-lg px-3 py-1.5 text-slate-500 hover:bg-slate-50"}>
      {label}
    </button>
  )
}

function ActionLink({ to, icon: Icon, label }: { to: string; icon: typeof Eye; label: string }) {
  return (
    <Link to={to} className="flex w-full items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-violet-50 hover:text-violet-700">
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  )
}

function ActionButton({ icon: Icon, label, onClick, disabled = false, danger = false }: { icon: typeof Eye; label: string; onClick?: () => void; disabled?: boolean; danger?: boolean }) {
  return (
    <button
      type="button"
      className={danger ? "flex w-full items-center gap-2 px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:bg-white" : "flex w-full items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:bg-white"}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  )
}

function InfoBlock({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-slate-50 p-2">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <div className="mt-1 text-sm font-bold text-slate-950">{value}</div>
    </div>
  )
}

function EmptyListings() {
  return (
    <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-5 text-center text-sm font-semibold text-slate-500">
      No listings match the current filters.
    </div>
  )
}
