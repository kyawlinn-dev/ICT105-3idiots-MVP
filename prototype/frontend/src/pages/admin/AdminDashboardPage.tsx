import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useEffect, useState } from "react"
import { ChartCard } from "../../components/shared/ChartCard"
import { MetricCard } from "../../components/shared/MetricCard"
import { StatusBadge } from "../../components/shared/StatusBadge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import type { Apartment } from "../../data/mockData"
import { dashboardMetrics, listingStatusData, painPointData, roommateDemandData } from "../../data/mockData"
import { formatCurrency } from "../../lib/utils"
import { getAdminDashboard } from "../../services/api/dashboard"

type AdminDashboardPageProps = {
  listings: Apartment[]
}

const statusColors = ["#7c3aed", "#f59e0b", "#fb7185"]

export function AdminDashboardPage({ listings }: AdminDashboardPageProps) {
  const [metrics, setMetrics] = useState(dashboardMetrics)
  const [statusData, setStatusData] = useState(listingStatusData)
  const [painPoints, setPainPoints] = useState(painPointData)
  const [roommateDemand, setRoommateDemand] = useState(roommateDemandData)

  useEffect(() => {
    getAdminDashboard()
      .then((dashboard) => {
        setMetrics(dashboard.metrics)
        setStatusData(dashboard.listingStatus)
        setPainPoints(dashboard.painPoints)
        setRoommateDemand(dashboard.roommateDemand.length ? dashboard.roommateDemand : roommateDemandData)
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <div className="mx-auto max-w-7xl space-y-3 text-xs">
      <div className="flex flex-col gap-2 rounded-lg border border-slate-200/80 bg-white p-3 shadow-[0_12px_35px_rgba(15,23,42,0.04)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-violet-600">Admin Panel</p>
          <h1 className="mt-0.5 text-base font-bold tracking-tight text-slate-950">Dashboard Overview</h1>
          <p className="mt-0.5 text-xs text-slate-500">Welcome back, Admin</p>
        </div>
        <Button variant="outline" size="sm">May 11 - May 17, 2026</Button>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
        <ChartCard title="Listings by Status" description="Current review status mix.">
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={34} outerRadius={56} paddingAngle={3}>
                  {statusData.map((entry, index) => (
                    <Cell key={entry.name} fill={statusColors[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Top Student Pain Points" description="Common search and housing decision factors.">
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={painPoints} layout="vertical" margin={{ left: 8, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={76} tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="students" fill="#7c3aed" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-3 lg:grid-cols-[0.75fr_1.25fr]">
        <ChartCard title="Roommate Demand" description="Room preference demand from student posts.">
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roommateDemand}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="demand" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-3">
            <CardTitle className="text-sm">Recent Listings</CardTitle>
            <Button variant="ghost" size="sm">View all</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-xs">
                <thead className="border-y border-slate-100 bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Apartment Name</th>
                    <th className="px-3 py-2 font-semibold">Owner</th>
                    <th className="px-3 py-2 font-semibold">Location</th>
                    <th className="px-3 py-2 font-semibold">Price</th>
                    <th className="px-3 py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {listings.slice(0, 5).map((listing) => (
                    <tr key={listing.id}>
                      <td className="px-3 py-2 font-bold text-slate-950">{listing.name}</td>
                      <td className="px-3 py-2 text-slate-600">{listing.ownerName}</td>
                      <td className="px-3 py-2 text-slate-600">{listing.distanceFromCampus} km</td>
                      <td className="px-3 py-2 text-slate-600">{formatCurrency(listing.price)}</td>
                      <td className="px-3 py-2">
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
