import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartCard } from "../../components/shared/ChartCard"
import { MetricCard } from "../../components/shared/MetricCard"
import { StatusBadge } from "../../components/shared/StatusBadge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import type { Apartment } from "../../data/mockData"
import { dashboardMetrics, listingStatusData, painPointData, roommateDemandData } from "../../data/mockData"
import { formatCurrency } from "../../lib/utils"

type AdminDashboardPageProps = {
  listings: Apartment[]
}

const statusColors = ["#7c3aed", "#f59e0b", "#fb7185"]

export function AdminDashboardPage({ listings }: AdminDashboardPageProps) {
  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <div className="flex flex-col gap-3 rounded-lg border border-slate-200/80 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-violet-600">Admin Panel</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-slate-500">Welcome back, Admin</p>
        </div>
        <Button variant="outline">May 11 - May 17, 2026</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <ChartCard title="Listings by Status" description="Current review status mix.">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={listingStatusData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={90} paddingAngle={3}>
                  {listingStatusData.map((entry, index) => (
                    <Cell key={entry.name} fill={statusColors[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Top Student Pain Points" description="Mock Lab-style evidence.">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={painPointData} layout="vertical" margin={{ left: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={92} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="students" fill="#7c3aed" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <ChartCard title="Roommate Demand" description="Room preference demand from mock posts.">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roommateDemandData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="demand" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <CardTitle className="text-base">Recent Listings</CardTitle>
            <Button variant="ghost" size="sm">View all</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-xs">
                <thead className="border-y border-slate-100 bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Apartment Name</th>
                    <th className="px-4 py-3 font-semibold">Owner</th>
                    <th className="px-4 py-3 font-semibold">Location</th>
                    <th className="px-4 py-3 font-semibold">Price</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {listings.slice(0, 5).map((listing) => (
                    <tr key={listing.id}>
                      <td className="px-4 py-3 font-bold text-slate-950">{listing.name}</td>
                      <td className="px-4 py-3 text-slate-600">{listing.ownerName}</td>
                      <td className="px-4 py-3 text-slate-600">{listing.distanceFromCampus} km</td>
                      <td className="px-4 py-3 text-slate-600">{formatCurrency(listing.price)}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={listing.approvalStatus} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
