import { Bell, Inbox, Mail, MessageSquare, Phone, UserRound } from "lucide-react"
import { PageHeader } from "../../components/shared/PageHeader"
import { StatusBadge } from "../../components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select } from "../../components/ui/select"
import type { Apartment } from "../../data/mockData"
import { formatCurrency } from "../../lib/utils"
import type { AuthProfile } from "../../services/api/types"

type OwnerPageProps = {
  listings: Apartment[]
  session: AuthProfile | null
}

export function OwnerLeadsPage({ listings }: OwnerPageProps) {
  const approved = listings.filter((listing) => listing.approvalStatus === "Approved")

  return (
    <OwnerPageShell
      eyebrow="Student interest"
      title="Leads"
      description="Track student interest signals for your approved listings. Full lead capture can be connected after the MVP."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <SummaryCard label="Approved listings" value={`${approved.length}`} />
        <SummaryCard label="Contact-ready listings" value={`${approved.filter((listing) => listing.ownerContact).length}`} />
        <SummaryCard label="Saved/contact leads" value="MVP placeholder" />
      </div>
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-base">Lead sources</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 p-4 pt-0">
          {approved.length ? approved.map((listing) => (
            <div key={listing.id} className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold text-slate-950">{listing.name}</p>
                <p className="mt-1 text-sm text-slate-500">{listing.location} - {formatCurrency(listing.price)} / month</p>
              </div>
              <StatusBadge status={listing.availabilityStatus} />
            </div>
          )) : (
            <EmptyOwnerState icon={Inbox} title="No lead-ready listings" description="Approved listings will appear here as student-facing lead sources." />
          )}
        </CardContent>
      </Card>
    </OwnerPageShell>
  )
}

export function OwnerMessagesPage({ listings }: OwnerPageProps) {
  return (
    <OwnerPageShell
      eyebrow="Owner inbox"
      title="Messages"
      description="Keep owner communication visible without adding real-time chat to the MVP."
    >
      <Card>
        <CardContent className="p-4">
          <EmptyOwnerState
            icon={MessageSquare}
            title="No direct message inbox yet"
            description={`${listings.length} listing records are ready for contact display. Real chat is outside the MVP, so students use the contact details shown on approved listings.`}
          />
        </CardContent>
      </Card>
    </OwnerPageShell>
  )
}

export function OwnerAnalyticsPage({ listings }: OwnerPageProps) {
  const averageRent = listings.length ? Math.round(listings.reduce((sum, listing) => sum + listing.price, 0) / listings.length) : 0

  return (
    <OwnerPageShell
      eyebrow="Listing performance"
      title="Analytics"
      description="Review simple owner-side listing metrics from your current records."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <SummaryCard label="Total listings" value={`${listings.length}`} />
        <SummaryCard label="Approved" value={`${listings.filter((listing) => listing.approvalStatus === "Approved").length}`} />
        <SummaryCard label="Pending" value={`${listings.filter((listing) => listing.approvalStatus === "Pending").length}`} />
        <SummaryCard label="Average rent" value={listings.length ? formatCurrency(averageRent) : "-"} />
      </div>
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-base">Availability mix</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 p-4 pt-0 md:grid-cols-3">
          {(["Available", "Limited", "Unavailable"] as const).map((status) => (
            <div key={status} className="rounded-lg border border-slate-200 bg-white p-4">
              <StatusBadge status={status} />
              <p className="mt-3 text-2xl font-bold text-slate-950">{listings.filter((listing) => listing.availabilityStatus === status).length}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </OwnerPageShell>
  )
}

export function OwnerProfilePage({ session }: OwnerPageProps) {
  return (
    <OwnerPageShell
      eyebrow="Account"
      title="Profile"
      description="Your owner profile is used for portal access and listing contact context."
    >
      <Card>
        <CardContent className="grid gap-4 p-4 md:grid-cols-2">
          <ReadOnlyField label="Display name" value={session?.displayName ?? "Apartment Owner"} icon={UserRound} />
          <ReadOnlyField label="Email" value={session?.email || "Not provided"} icon={Mail} />
          <ReadOnlyField label="Phone" value={session?.phone || "Not provided"} icon={Phone} />
          <ReadOnlyField label="LINE ID" value={session?.lineId || "Not provided"} icon={MessageSquare} />
        </CardContent>
      </Card>
    </OwnerPageShell>
  )
}

export function OwnerSettingsPage(_props: OwnerPageProps) {
  return (
    <OwnerPageShell
      eyebrow="Preferences"
      title="Settings"
      description="MVP account preferences for owner notifications and listing workflow defaults."
    >
      <Card>
        <CardContent className="grid gap-4 p-4 md:grid-cols-2">
          <div>
            <Label>Review notifications</Label>
            <Select className="mt-2" defaultValue="email">
              <option value="email">Email me when admin reviews a listing</option>
              <option value="none">Do not send review notifications</option>
            </Select>
          </div>
          <div>
            <Label>Default availability</Label>
            <Select className="mt-2" defaultValue="available">
              <option value="available">Available</option>
              <option value="limited">Limited</option>
              <option value="unavailable">Unavailable</option>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label>Portal note</Label>
            <Input className="mt-2" defaultValue="Use confirmed Google locations and real room photos for every listing." />
          </div>
        </CardContent>
      </Card>
    </OwnerPageShell>
  )
}

function OwnerPageShell({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      {children}
    </div>
  )
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs font-semibold text-slate-500">{label}</p>
        <p className="mt-2 text-xl font-bold text-slate-950">{value}</p>
      </CardContent>
    </Card>
  )
}

function EmptyOwnerState({ icon: Icon, title, description }: { icon: typeof Bell; title: string; description: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
      <div className="mx-auto grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-blue-600">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="mt-3 text-base font-bold text-slate-950">{title}</h2>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">{description}</p>
    </div>
  )
}

function ReadOnlyField({ label, value, icon: Icon }: { label: string; value: string; icon: typeof UserRound }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <Icon className="h-4 w-4 text-blue-600" />
        {label}
      </p>
      <p className="mt-2 break-words text-sm font-bold text-slate-950">{value}</p>
    </div>
  )
}
