import { ClipboardCheck, Heart, Home, LineChart } from "lucide-react"
import type { DashboardMetric } from "../../data/mockData"
import { apiRequest } from "./client"
import type { ApiDashboard } from "./types"

const metricIcons = [ClipboardCheck, Home, Heart, LineChart]

export const getAdminDashboard = async () => {
  const response = await apiRequest<ApiDashboard>("/admin/dashboard")

  return {
    metrics: response.data.metrics.map((metric, index): DashboardMetric => ({
      id: metric.id,
      label: metric.label,
      value: String(metric.value),
      change: metric.change ?? "",
      type: metric.type,
      icon: metricIcons[index] ?? LineChart,
    })),
    listingStatus: response.data.listingStatus,
    painPoints: response.data.painPoints,
    roommateDemand: response.data.roommateDemand,
  }
}
