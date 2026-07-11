import { requireSupabaseClient } from "./supabaseClient.js"

export const getAdminDashboard = async () => {
  const supabase = requireSupabaseClient()
  const { data: listings, error: listingError } = await supabase
    .from("apartment_listings")
    .select("approval_status, availability_status, price")

  if (listingError) {
    throw new Error(listingError.message)
  }

  const { data: roommatePosts, error: roommateError } = await supabase.from("roommate_posts").select("near_university")

  if (roommateError) {
    throw new Error(roommateError.message)
  }

  const listingRows = listings ?? []
  const roommateRows = roommatePosts ?? []
  const approved = listingRows.filter((listing) => listing.approval_status === "approved").length
  const pending = listingRows.filter((listing) => listing.approval_status === "pending").length
  const available = listingRows.filter((listing) => listing.availability_status === "available").length
  const avgRent = listingRows.length ? Math.round(listingRows.reduce((sum, listing) => sum + listing.price, 0) / listingRows.length) : 0

  return {
    metrics: [
      { id: "approvedListings", label: "Approved listings", value: approved, change: "Visible to students", type: "positive" },
      { id: "pendingReviews", label: "Pending reviews", value: pending, change: "Needs admin action", type: "warning" },
      { id: "availableRooms", label: "Available rooms", value: available, change: "Ready for students", type: "positive" },
      { id: "avgRent", label: "Avg. rent", value: avgRent, change: "THB/month", type: "neutral" },
    ],
    listingStatus: [
      { name: "Approved", value: approved },
      { name: "Pending", value: pending },
      { name: "Rejected", value: listingRows.filter((listing) => listing.approval_status === "rejected").length },
    ],
    painPoints: [
      { name: "Price", students: 42 },
      { name: "Distance", students: 34 },
      { name: "Safety", students: 28 },
      { name: "Roommate", students: 21 },
    ],
    roommateDemand: Object.entries(
      roommateRows.reduce<Record<string, number>>((counts, post) => {
        counts[post.near_university] = (counts[post.near_university] ?? 0) + 1
        return counts
      }, {}),
    ).map(([name, demand]) => ({ name, demand })),
  }
}
