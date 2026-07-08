import { useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { AdminLayout } from "./components/layout/AdminLayout"
import { OwnerLayout } from "./components/layout/OwnerLayout"
import { PublicLayout } from "./components/layout/PublicLayout"
import { apartments as mockApartments, type ApprovalStatus, type AvailabilityStatus } from "./data/mockData"
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage"
import { AdminListingsPage } from "./pages/admin/AdminListingsPage"
import { OwnerAddListingPage } from "./pages/owner/OwnerAddListingPage"
import { OwnerDashboardPage } from "./pages/owner/OwnerDashboardPage"
import { OwnerListingsPage } from "./pages/owner/OwnerListingsPage"
import { ApartmentDetailPage } from "./pages/public/ApartmentDetailPage"
import { ApartmentsPage } from "./pages/public/ApartmentsPage"
import { HomePage } from "./pages/public/HomePage"
import { RoommatesPage } from "./pages/public/RoommatesPage"
import { SavedPage } from "./pages/public/SavedPage"
import { SignInPage } from "./pages/public/SignInPage"

function App() {
  const [apartments, setApartments] = useState(mockApartments)
  const [savedIds, setSavedIds] = useState<string[]>(["apt-001"])

  const toggleSavedApartment = (id: string) => {
    setSavedIds((current) => (current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]))
  }

  const updateAvailability = (id: string, status: AvailabilityStatus) => {
    setApartments((current) => current.map((apartment) => (apartment.id === id ? { ...apartment, availabilityStatus: status } : apartment)))
  }

  const updateApproval = (id: string, status: ApprovalStatus) => {
    setApartments((current) => current.map((apartment) => (apartment.id === id ? { ...apartment, approvalStatus: status } : apartment)))
  }

  const deleteListing = (id: string) => {
    setApartments((current) => current.filter((apartment) => apartment.id !== id))
    setSavedIds((current) => current.filter((savedId) => savedId !== id))
  }

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage apartments={apartments} savedIds={savedIds} onToggleSave={toggleSavedApartment} />} />
        <Route path="/apartments" element={<ApartmentsPage apartments={apartments} savedIds={savedIds} onToggleSave={toggleSavedApartment} />} />
        <Route path="/apartments/:id" element={<ApartmentDetailPage apartments={apartments} savedIds={savedIds} onToggleSave={toggleSavedApartment} />} />
        <Route path="/roommates" element={<RoommatesPage />} />
        <Route path="/saved" element={<SavedPage apartments={apartments} savedIds={savedIds} onToggleSave={toggleSavedApartment} />} />
        <Route path="/signin" element={<SignInPage />} />
      </Route>
      <Route element={<OwnerLayout />}>
        <Route path="/owner/dashboard" element={<OwnerDashboardPage listings={apartments} />} />
        <Route path="/owner/add-listing" element={<OwnerAddListingPage />} />
        <Route path="/owner/listings" element={<OwnerListingsPage listings={apartments} onUpdateAvailability={updateAvailability} />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage listings={apartments} />} />
        <Route path="/admin/listings" element={<AdminListingsPage listings={apartments} onUpdateApproval={updateApproval} onDeleteListing={deleteListing} />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
