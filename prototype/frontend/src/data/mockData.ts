import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  Building2,
  ClipboardCheck,
  Headphones,
  Heart,
  Home,
  Inbox,
  LineChart,
  LogOut,
  MessageSquare,
  PlusCircle,
  Settings,
  UserRound,
  Users,
} from "lucide-react"

export type AvailabilityStatus = "Available" | "Limited" | "Unavailable"
export type ApprovalStatus = "Approved" | "Pending" | "Rejected"
export type NearUniversity = "Rangsit University" | "Bangkok University"

export type Apartment = {
  id: string
  name: string
  ownerId?: string | null
  propertyType: "Condo" | "Apartment"
  nearUniversity: NearUniversity
  location: string
  address?: string | null
  googleMapsUrl?: string | null
  googlePlaceId?: string | null
  latitude?: number
  longitude?: number
  distanceFromCampus: number
  price: number
  roomType: "Studio" | "Shared Room" | "Private Room" | "One Bedroom"
  bedrooms: number
  bathrooms: number
  size: string
  facilities: string[]
  availabilityStatus: AvailabilityStatus
  approvalStatus: ApprovalStatus
  image: string
  gallery: string[]
  ownerName: string
  ownerContact: string
  rating: number
  description: string
}

export type RoommatePost = {
  id: string
  studentId: string | null
  title: string
  posterName: string
  posterEmail: string | null
  posterPhone: string | null
  posterLineId: string | null
  nearUniversity: NearUniversity
  budgetMin: number | null
  budget: number
  moveInDate: string
  locationPreference: string
  lifestyleTags: string[]
  description: string
  createdAt: string
}

export type DashboardMetric = {
  id: string
  label: string
  value: string
  change: string
  type: "positive" | "neutral" | "warning"
  icon: LucideIcon
}

export const apartments: Apartment[] = []

export const roommatePosts: RoommatePost[] = []

export const dashboardMetrics: DashboardMetric[] = [
  { id: "m1", label: "Approved listings", value: "10", change: "Rangsit and BU area", type: "positive", icon: ClipboardCheck },
  { id: "m2", label: "Pending reviews", value: "1", change: "Needs admin action", type: "warning", icon: Building2 },
  { id: "m3", label: "Saved apartments", value: "126", change: "Mock student saves", type: "positive", icon: Heart },
  { id: "m4", label: "Roommate posts", value: "3", change: "Thailand sample data", type: "neutral", icon: Users },
]

export const listingStatusData = [
  { name: "Approved", value: 10 },
  { name: "Pending", value: 1 },
  { name: "Rejected", value: 1 },
]

export const painPointData = [
  { name: "Price", students: 42 },
  { name: "Distance", students: 34 },
  { name: "Safety", students: 28 },
  { name: "Roommate", students: 21 },
]

export const roommateDemandData = [
  { name: "Rangsit University", demand: 31 },
  { name: "Bangkok University", demand: 27 },
  { name: "Khlong Luang", demand: 18 },
]

export const ownerNavItems = [
  { label: "Dashboard", to: "/owner/dashboard", icon: Home },
  { label: "My Listings", to: "/owner/listings", icon: Building2 },
  { label: "Add Listing", to: "/owner/add-listing", icon: PlusCircle },
  { label: "Leads", to: "/owner/leads", icon: Inbox },
  { label: "Messages", to: "/owner/messages", icon: MessageSquare },
  { label: "Analytics", to: "/owner/analytics", icon: LineChart },
  { label: "Profile", to: "/owner/profile", icon: UserRound },
  { label: "Settings", to: "/owner/settings", icon: Settings },
  { label: "Logout", to: "/", icon: LogOut },
]

export const adminNavItems = [
  { label: "Overview", to: "/admin/dashboard", icon: BarChart3 },
  { label: "Listings", to: "/admin/listings", icon: Building2 },
  { label: "Owners", to: "/admin/owners", icon: UserRound },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Analytics", to: "/admin/analytics", icon: LineChart },
  { label: "Reports", to: "/admin/reports", icon: ClipboardCheck },
  { label: "Settings", to: "/admin/settings", icon: Settings },
  { label: "Support", to: "/admin/support", icon: Headphones },
  { label: "Logout", to: "/", icon: LogOut },
]


