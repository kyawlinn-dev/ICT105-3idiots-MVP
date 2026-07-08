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
  propertyType: "Condo" | "Apartment"
  nearUniversity: NearUniversity
  location: string
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
  title: string
  posterName: string
  nearUniversity: NearUniversity
  budget: number
  moveInDate: string
  locationPreference: string
  lifestyleTags: string[]
  description: string
}

export type DashboardMetric = {
  id: string
  label: string
  value: string
  change: string
  type: "positive" | "neutral" | "warning"
  icon: LucideIcon
}

const condoGallery = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80",
]

const apartmentGallery = [
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=900&q=80",
]

export const apartments: Apartment[] = [
  {
    id: "apt-001",
    name: "Atmoz Kanaal Rangsit",
    propertyType: "Condo",
    nearUniversity: "Rangsit University",
    location: "Prachathipat, Thanyaburi, Pathum Thani",
    distanceFromCampus: 2.8,
    price: 13000,
    roomType: "One Bedroom",
    bedrooms: 1,
    bathrooms: 1,
    size: "26 sqm",
    facilities: ["Wi-Fi", "Air Conditioning", "Laundry", "Parking", "Security", "CCTV", "Keycard", "Pool", "Gym"],
    availabilityStatus: "Available",
    approvalStatus: "Approved",
    image: condoGallery[0],
    gallery: condoGallery,
    ownerName: "Krit S.",
    ownerContact: "krit.owner@example.com",
    rating: 4.7,
    description:
      "Modern furnished condo in the Rangsit area with student-friendly facilities, security, pool, and convenient access to Rangsit University.",
  },
  {
    id: "apt-002",
    name: "Sena Eco Town Rangsit Station",
    propertyType: "Condo",
    nearUniversity: "Rangsit University",
    location: "Lak Hok, Muang Ake, Pathum Thani",
    distanceFromCampus: 1.4,
    price: 9500,
    roomType: "One Bedroom",
    bedrooms: 1,
    bathrooms: 1,
    size: "28 sqm",
    facilities: ["Wi-Fi", "Air Conditioning", "Laundry", "Parking", "Security", "CCTV", "Near Red Line"],
    availabilityStatus: "Available",
    approvalStatus: "Approved",
    image: apartmentGallery[0],
    gallery: apartmentGallery,
    ownerName: "Narin P.",
    ownerContact: "narin.owner@example.com",
    rating: 4.5,
    description:
      "Ready-to-move-in condo near Rangsit University and Red Line connections. Suitable for students who want convenience and a quiet living space.",
  },
  {
    id: "apt-003",
    name: "The Enrich Rungsit",
    propertyType: "Apartment",
    nearUniversity: "Rangsit University",
    location: "Rangsit, Pathum Thani",
    distanceFromCampus: 3.5,
    price: 4200,
    roomType: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    size: "24 sqm",
    facilities: ["Wi-Fi", "Air Conditioning", "Laundry", "Parking", "Security"],
    availabilityStatus: "Available",
    approvalStatus: "Approved",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    gallery: apartmentGallery,
    ownerName: "Somchai R.",
    ownerContact: "somchai.owner@example.com",
    rating: 4.2,
    description:
      "Budget-friendly apartment in the Rangsit area with basic facilities for students who want affordable monthly rent.",
  },
  {
    id: "apt-004",
    name: "Naleenplace Apartment",
    propertyType: "Apartment",
    nearUniversity: "Rangsit University",
    location: "Muang Ake, Lak Hok, Pathum Thani",
    distanceFromCampus: 2.5,
    price: 4000,
    roomType: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    size: "22 sqm",
    facilities: ["Wi-Fi", "Air Conditioning", "Laundry", "Parking", "Near Campus"],
    availabilityStatus: "Available",
    approvalStatus: "Approved",
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=900&q=80",
    gallery: apartmentGallery,
    ownerName: "May S.",
    ownerContact: "may.owner@example.com",
    rating: 4.1,
    description:
      "Simple apartment option for students looking for low monthly rent and basic living facilities around Rangsit University.",
  },
  {
    id: "apt-005",
    name: "Prima Residence",
    propertyType: "Apartment",
    nearUniversity: "Rangsit University",
    location: "Lak Hok, Pathum Thani",
    distanceFromCampus: 4.2,
    price: 6500,
    roomType: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    size: "26 sqm",
    facilities: ["Wi-Fi", "Air Conditioning", "Laundry", "Parking", "Security", "CCTV"],
    availabilityStatus: "Limited",
    approvalStatus: "Approved",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=900&q=80",
    gallery: condoGallery,
    ownerName: "Pimchanok T.",
    ownerContact: "pim.owner@example.com",
    rating: 4.3,
    description:
      "Comfortable residence with monthly room options and convenient travel access to the Rangsit and Lak Hok area.",
  },
  {
    id: "apt-006",
    name: "Kave Town Island",
    propertyType: "Condo",
    nearUniversity: "Bangkok University",
    location: "Khlong Nueng, Khlong Luang, Pathum Thani",
    distanceFromCampus: 0.6,
    price: 12500,
    roomType: "One Bedroom",
    bedrooms: 1,
    bathrooms: 1,
    size: "23 sqm",
    facilities: ["Wi-Fi", "Air Conditioning", "Laundry", "Parking", "Security", "CCTV", "Pool", "Gym", "Study Area"],
    availabilityStatus: "Available",
    approvalStatus: "Approved",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
    gallery: condoGallery,
    ownerName: "Thanakorn W.",
    ownerContact: "thanakorn.owner@example.com",
    rating: 4.8,
    description:
      "Popular student condo near Bangkok University with lifestyle facilities, study spaces, and convenient access to campus.",
  },
  {
    id: "apt-007",
    name: "Kave Town Shift",
    propertyType: "Condo",
    nearUniversity: "Bangkok University",
    location: "Khlong Nueng, Khlong Luang, Pathum Thani",
    distanceFromCampus: 0.8,
    price: 12000,
    roomType: "One Bedroom",
    bedrooms: 1,
    bathrooms: 1,
    size: "25 sqm",
    facilities: ["Wi-Fi", "Air Conditioning", "Laundry", "Security", "CCTV", "Gym", "Study Area"],
    availabilityStatus: "Available",
    approvalStatus: "Pending",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80",
    gallery: condoGallery,
    ownerName: "Benjamas L.",
    ownerContact: "benjamas.owner@example.com",
    rating: 4.6,
    description:
      "Fully furnished condo near Bangkok University, suitable for students who want a modern room close to campus.",
  },
  {
    id: "apt-008",
    name: "Plum Condo Park Rangsit",
    propertyType: "Condo",
    nearUniversity: "Bangkok University",
    location: "Khlong Nueng, Khlong Luang, Pathum Thani",
    distanceFromCampus: 1.2,
    price: 8000,
    roomType: "One Bedroom",
    bedrooms: 1,
    bathrooms: 1,
    size: "22 sqm",
    facilities: ["Wi-Fi", "Air Conditioning", "Laundry", "Parking", "Security", "CCTV"],
    availabilityStatus: "Available",
    approvalStatus: "Approved",
    image: "https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=900&q=80",
    gallery: condoGallery,
    ownerName: "Piyawat K.",
    ownerContact: "piyawat.owner@example.com",
    rating: 4.4,
    description:
      "Affordable condo near Bangkok University with furnished room options and easy access to the Rangsit area.",
  },
  {
    id: "apt-009",
    name: "Plum Condo Rangsit Alive",
    propertyType: "Condo",
    nearUniversity: "Bangkok University",
    location: "Khlong Nueng, Khlong Luang, Pathum Thani",
    distanceFromCampus: 1.5,
    price: 8500,
    roomType: "One Bedroom",
    bedrooms: 1,
    bathrooms: 1,
    size: "24 sqm",
    facilities: ["Wi-Fi", "Air Conditioning", "Laundry", "Parking", "Security", "CCTV", "Near Future Park"],
    availabilityStatus: "Limited",
    approvalStatus: "Approved",
    image: "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=900&q=80",
    gallery: condoGallery,
    ownerName: "Siriporn C.",
    ownerContact: "siriporn.owner@example.com",
    rating: 4.5,
    description:
      "Student-friendly condo in the Rangsit area with convenient access to Bangkok University and Future Park Rangsit.",
  },
  {
    id: "apt-010",
    name: "Attitude BU",
    propertyType: "Condo",
    nearUniversity: "Bangkok University",
    location: "Khlong Nueng, Khlong Luang, Pathum Thani",
    distanceFromCampus: 0.9,
    price: 10500,
    roomType: "One Bedroom",
    bedrooms: 1,
    bathrooms: 1,
    size: "27 sqm",
    facilities: ["Wi-Fi", "Air Conditioning", "Laundry", "Security", "CCTV", "Gym", "Near Campus"],
    availabilityStatus: "Available",
    approvalStatus: "Approved",
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=900&q=80",
    gallery: condoGallery,
    ownerName: "Patchara N.",
    ownerContact: "patchara.owner@example.com",
    rating: 4.5,
    description:
      "Modern condo near Bangkok University with useful daily facilities and a strong student living atmosphere.",
  },
  {
    id: "apt-011",
    name: "dcondo Campus Hideaway",
    propertyType: "Condo",
    nearUniversity: "Bangkok University",
    location: "Khlong Nueng, Khlong Luang, Pathum Thani",
    distanceFromCampus: 1.0,
    price: 9500,
    roomType: "One Bedroom",
    bedrooms: 1,
    bathrooms: 1,
    size: "26 sqm",
    facilities: ["Wi-Fi", "Air Conditioning", "Laundry", "Parking", "Security", "CCTV", "Pool", "Gym"],
    availabilityStatus: "Available",
    approvalStatus: "Approved",
    image: "https://images.unsplash.com/photo-1560185009-dddeb820c7b7?auto=format&fit=crop&w=900&q=80",
    gallery: condoGallery,
    ownerName: "Chanida V.",
    ownerContact: "chanida.owner@example.com",
    rating: 4.6,
    description:
      "Campus-style condo near Bangkok University with pool, gym, and security for student renters.",
  },
  {
    id: "apt-012",
    name: "Lalin Place",
    propertyType: "Apartment",
    nearUniversity: "Bangkok University",
    location: "Thanyaburi, Pathum Thani",
    distanceFromCampus: 6.0,
    price: 3500,
    roomType: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    size: "22 sqm",
    facilities: ["Wi-Fi", "Air Conditioning", "Laundry", "Parking"],
    availabilityStatus: "Available",
    approvalStatus: "Approved",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
    gallery: apartmentGallery,
    ownerName: "Anong M.",
    ownerContact: "anong.owner@example.com",
    rating: 4.0,
    description:
      "Low-cost apartment option for students who prioritize affordable rent over luxury facilities.",
  },
  {
    id: "apt-013",
    name: "K&O Apartment",
    propertyType: "Apartment",
    nearUniversity: "Rangsit University",
    location: "Pathum Thani, Rangsit Area",
    distanceFromCampus: 4.8,
    price: 3200,
    roomType: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    size: "21 sqm",
    facilities: ["Wi-Fi", "Air Conditioning", "Laundry", "Parking", "Near Campus"],
    availabilityStatus: "Unavailable",
    approvalStatus: "Rejected",
    image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=900&q=80",
    gallery: apartmentGallery,
    ownerName: "Worawit K.",
    ownerContact: "worawit.owner@example.com",
    rating: 3.9,
    description:
      "Very affordable student apartment sample in the Pathum Thani area. Currently unavailable while listing information is reviewed.",
  },
]

export const roommatePosts: RoommatePost[] = [
  {
    id: "rm-1",
    title: "Looking for roommate near Rangsit University",
    posterName: "Student A",
    nearUniversity: "Rangsit University",
    budget: 5500,
    moveInDate: "August 2026",
    locationPreference: "Muang Ake or Lak Hok",
    lifestyleTags: ["Quiet", "Clean", "No smoking"],
    description: "Looking for a roommate to share an apartment near Rangsit University. Prefer a clean and quiet student.",
  },
  {
    id: "rm-2",
    title: "Need roommate for condo near Bangkok University",
    posterName: "Student B",
    nearUniversity: "Bangkok University",
    budget: 7500,
    moveInDate: "July 2026",
    locationPreference: "Khlong Nueng or Kave Town area",
    lifestyleTags: ["Student", "Study focused", "Friendly"],
    description:
      "Looking for a roommate to share a condo near Bangkok University. Prefer someone who studies regularly and keeps the room clean.",
  },
  {
    id: "rm-3",
    title: "Budget room share around Rangsit",
    posterName: "Student C",
    nearUniversity: "Rangsit University",
    budget: 4000,
    moveInDate: "September 2026",
    locationPreference: "Rangsit, Prachathipat, or Thanyaburi",
    lifestyleTags: ["Budget-friendly", "Laundry nearby", "Early schedule"],
    description: "Searching for a budget-friendly room share around Rangsit with easy access to campus and local transport.",
  },
]

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
  { label: "Leads", to: "/owner/dashboard", icon: Inbox },
  { label: "Messages", to: "/owner/dashboard", icon: MessageSquare },
  { label: "Analytics", to: "/owner/dashboard", icon: LineChart },
  { label: "Profile", to: "/owner/dashboard", icon: UserRound },
  { label: "Settings", to: "/owner/dashboard", icon: Settings },
  { label: "Logout", to: "/", icon: LogOut },
]

export const adminNavItems = [
  { label: "Overview", to: "/admin/dashboard", icon: BarChart3 },
  { label: "Listings", to: "/admin/listings", icon: Building2 },
  { label: "Owners", to: "/admin/dashboard", icon: UserRound },
  { label: "Users", to: "/admin/dashboard", icon: Users },
  { label: "Analytics", to: "/admin/dashboard", icon: LineChart },
  { label: "Reports", to: "/admin/dashboard", icon: ClipboardCheck },
  { label: "Settings", to: "/admin/dashboard", icon: Settings },
  { label: "Support", to: "/admin/dashboard", icon: Headphones },
  { label: "Logout", to: "/", icon: LogOut },
]
