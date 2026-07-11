import { CheckCircle2, Clock, Edit3, Eye, MoreHorizontal, PowerOff } from "lucide-react"
import type { RefObject } from "react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
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

  const handleAvailability = (listing: Apartment, status: AvailabilityStatus) => {
    setOpenMenuId("")
    if (listing.availabilityStatus !== status) {
      onUpdateAvailability(listing.id, status)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <PageHeader
        eyebrow="Owner workflow"
        title="Manage my listings"
        description="Review listing status, update availability, and edit submitted apartment records."
      />
      <div className="grid gap-3 md:grid-cols-3">
        <SummaryCard label="Total listings" value={`${listings.length}`} />
        <SummaryCard label="Approved" value={`${listings.filter((item) => item.approvalStatus === "Approved").length}`} />
        <SummaryCard label="Pending review" value={`${listings.filter((item) => item.approvalStatus === "Pending").length}`} />
      </div>

      <div className="grid gap-3 md:hidden">
        {listings.length ? listings.map((listing) => (
          <Card key={listing.id}>
            <CardContent className="space-y-3 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="break-words font-bold text-slate-950">{listing.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{listing.location}</p>
                </div>
                <OwnerListingActions
                  listing={listing}
                  open={openMenuId === listing.id}
                  menuRootRef={openMenuId === listing.id ? menuRootRef : undefined}
                  onToggle={() => setOpenMenuId((current) => (current === listing.id ? "" : listing.id))}
                  onAvailability={handleAvailability}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <InfoBlock label="Price" value={formatCurrency(listing.price)} />
                <InfoBlock label="Review" value={<StatusBadge status={listing.approvalStatus} />} />
                <InfoBlock label="Availability" value={<StatusBadge status={listing.availabilityStatus} />} />
                <InfoBlock label="Room" value={listing.roomType} />
              </div>
            </CardContent>
          </Card>
        )) : <EmptyListings />}
      </div>

      <Card className="hidden overflow-visible md:block">
        <CardContent className="overflow-visible p-0">
          <div className="grid grid-cols-[minmax(0,1.5fr)_120px_150px_130px_64px] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-500">
            <span>Apartment</span>
            <span>Price</span>
            <span>Availability</span>
            <span>Review</span>
            <span className="text-right">Actions</span>
          </div>
          <div className="divide-y divide-slate-100 overflow-visible">
            {listings.length ? listings.map((listing) => (
              <div key={listing.id} className="grid grid-cols-[minmax(0,1.5fr)_120px_150px_130px_64px] items-center gap-3 px-4 py-3 text-xs">
                <div className="min-w-0">
                  <p className="truncate font-bold text-slate-950">{listing.name}</p>
                  <p className="truncate text-slate-500">{listing.location}</p>
                </div>
                <p className="font-semibold text-slate-800">{formatCurrency(listing.price)}</p>
                <div>
                  <StatusBadge status={listing.availabilityStatus} />
                </div>
                <div>
                  <StatusBadge status={listing.approvalStatus} />
                </div>
                <div className="text-right">
                  <OwnerListingActions
                    listing={listing}
                    open={openMenuId === listing.id}
                    menuRootRef={openMenuId === listing.id ? menuRootRef : undefined}
                    onToggle={() => setOpenMenuId((current) => (current === listing.id ? "" : listing.id))}
                    onAvailability={handleAvailability}
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

function OwnerListingActions({
  listing,
  open,
  menuRootRef,
  onToggle,
  onAvailability,
}: {
  listing: Apartment
  open: boolean
  menuRootRef?: RefObject<HTMLDivElement | null>
  onToggle: () => void
  onAvailability: (listing: Apartment, status: AvailabilityStatus) => void
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
          <ActionLink to={`/owner/listings/${listing.id}/edit`} icon={Edit3} label="Edit listing" />
          <div className="my-1 border-t border-slate-100" />
          <ActionButton icon={CheckCircle2} label="Mark available" onClick={() => onAvailability(listing, "Available")} />
          <ActionButton icon={Clock} label="Mark limited" onClick={() => onAvailability(listing, "Limited")} />
          <ActionButton icon={PowerOff} label="Mark unavailable" onClick={() => onAvailability(listing, "Unavailable")} />
        </div>
      ) : null}
    </div>
  )
}

function ActionLink({ to, icon: Icon, label }: { to: string; icon: typeof Eye; label: string }) {
  return (
    <Link to={to} className="flex w-full items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700">
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  )
}

function ActionButton({ icon: Icon, label, onClick, disabled = false }: { icon: typeof Eye; label: string; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:bg-white"
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
      No owner listings yet. Add an apartment to submit it for admin review.
    </div>
  )
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs font-semibold text-slate-500">{label}</p>
        <p className="mt-1.5 text-2xl font-bold text-slate-950">{value}</p>
      </CardContent>
    </Card>
  )
}
