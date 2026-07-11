import { Headphones, LineChart, UserRound, Users } from "lucide-react"
import { PageHeader } from "../../components/shared/PageHeader"
import { StatusBadge } from "../../components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select } from "../../components/ui/select"
import type { Apartment } from "../../data/mockData"
import { formatCurrency } from "../../lib/utils"
import type { AuthProfile } from "../../services/api/types"

type AdminPageProps = {
  listings: Apartment[]
  session: AuthProfile | null
}

export function AdminOwnersPage({ listings }: AdminPageProps) {
  const owners = Array.from(new Map(listings.map((listing) => [listing.ownerName, listing])).values())

  return (
    <AdminPageShell eyebrow="Owner records" title="Owners" description="Review owner-submitted listing records and approval coverage.">
      <Card>
        <CardContent className="grid gap-3 p-4">
          {owners.length ? owners.map((owner) => {
            const ownerListings = listings.filter((listing) => listing.ownerName === owner.ownerName)
            return (
              <div key={owner.ownerName} className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold text-slate-950">{owner.ownerName}</p>
                  <p className="mt-1 text-sm text-slate-500">{owner.ownerContact}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusPill label={`${ownerListings.length} listings`} />
                  <StatusPill label={`${ownerListings.filter((listing) => listing.approvalStatus === "Approved").length} approved`} />
                </div>
              </div>
            )
          }) : <EmptyAdminState icon={UserRound} title="No owners yet" description="Owner profiles appear after listings are submitted." />}
        </CardContent>
      </Card>
    </AdminPageShell>
  )
}

export function AdminUsersPage({ listings }: AdminPageProps) {
  return (
    <AdminPageShell eyebrow="Platform users" title="Users" description="MVP user overview for student, owner, and admin records.">
      <div className="grid gap-3 md:grid-cols-3">
        <SummaryCard label="Student accounts" value="MVP auth records" />
        <SummaryCard label="Owner records" value={`${new Set(listings.map((listing) => listing.ownerName)).size}`} />
        <SummaryCard label="Admin session" value="Active" />
      </div>
      <Card>
        <CardContent className="p-4">
          <EmptyAdminState icon={Users} title="Detailed user management is future scope" description="The MVP uses role-based Supabase Auth, with full account administration planned after the class demo." />
        </CardContent>
      </Card>
    </AdminPageShell>
  )
}

export function AdminAnalyticsPage({ listings }: AdminPageProps) {
  const averageRent = listings.length ? Math.round(listings.reduce((sum, listing) => sum + listing.price, 0) / listings.length) : 0

  return (
    <AdminPageShell eyebrow="Review analytics" title="Analytics" description="Monitor listing review status and owner submission quality.">
      <div className="grid gap-3 md:grid-cols-4">
        <SummaryCard label="All listings" value={`${listings.length}`} />
        <SummaryCard label="Approved" value={`${listings.filter((listing) => listing.approvalStatus === "Approved").length}`} />
        <SummaryCard label="Pending" value={`${listings.filter((listing) => listing.approvalStatus === "Pending").length}`} />
        <SummaryCard label="Average rent" value={listings.length ? formatCurrency(averageRent) : "-"} />
      </div>
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-base">Status overview</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 p-4 pt-0 md:grid-cols-3">
          {(["Approved", "Pending", "Rejected"] as const).map((status) => (
            <div key={status} className="rounded-lg border border-slate-200 bg-white p-4">
              <StatusBadge status={status} />
              <p className="mt-3 text-2xl font-bold text-slate-950">{listings.filter((listing) => listing.approvalStatus === status).length}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </AdminPageShell>
  )
}

export function AdminReportsPage({ listings }: AdminPageProps) {
  return (
    <AdminPageShell eyebrow="Admin reports" title="Reports" description="Export-ready review summaries for the MVP demo.">
      <Card>
        <CardContent className="grid gap-3 p-4">
          <ReportRow label="Listings needing review" value={`${listings.filter((listing) => listing.approvalStatus === "Pending").length}`} />
          <ReportRow label="Visible student listings" value={`${listings.filter((listing) => listing.approvalStatus === "Approved").length}`} />
          <ReportRow label="Unavailable approved rooms" value={`${listings.filter((listing) => listing.approvalStatus === "Approved" && listing.availabilityStatus === "Unavailable").length}`} />
        </CardContent>
      </Card>
    </AdminPageShell>
  )
}

export function AdminSettingsPage({ session }: AdminPageProps) {
  return (
    <AdminPageShell eyebrow="Console preferences" title="Settings" description="MVP preferences for the admin review console.">
      <Card>
        <CardContent className="grid gap-4 p-4 md:grid-cols-2">
          <div>
            <Label>Signed in admin</Label>
            <Input className="mt-2" value={session?.displayName ?? "Admin"} readOnly />
          </div>
          <div>
            <Label>Default listing filter</Label>
            <Select className="mt-2" defaultValue="pending">
              <option value="pending">Pending first</option>
              <option value="all">All listings</option>
            </Select>
          </div>
        </CardContent>
      </Card>
    </AdminPageShell>
  )
}

export function AdminSupportPage(_props: AdminPageProps) {
  return (
    <AdminPageShell eyebrow="Support" title="Support" description="Operational notes for the class MVP admin console.">
      <Card>
        <CardContent className="p-4">
          <EmptyAdminState icon={Headphones} title="Support workflow is lightweight for MVP" description="Admins can resolve most demo issues by approving, rejecting, deleting, or asking owners to edit listings." />
        </CardContent>
      </Card>
    </AdminPageShell>
  )
}

function AdminPageShell({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: React.ReactNode }) {
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

function StatusPill({ label }: { label: string }) {
  return <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-700">{label}</span>
}

function ReportRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-3">
      <span className="text-sm font-semibold text-slate-600">{label}</span>
      <span className="text-lg font-bold text-slate-950">{value}</span>
    </div>
  )
}

function EmptyAdminState({ icon: Icon, title, description }: { icon: typeof LineChart; title: string; description: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
      <div className="mx-auto grid h-11 w-11 place-items-center rounded-lg bg-violet-50 text-violet-700">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="mt-3 text-base font-bold text-slate-950">{title}</h2>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">{description}</p>
    </div>
  )
}
