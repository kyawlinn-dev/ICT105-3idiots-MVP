import { useEffect, useMemo, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { AdminLayout } from "./components/layout/AdminLayout"
import { OwnerLayout } from "./components/layout/OwnerLayout"
import { PublicLayout } from "./components/layout/PublicLayout"
import type { Apartment, ApprovalStatus, AvailabilityStatus } from "./data/mockData"
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage"
import { AdminListingsPage } from "./pages/admin/AdminListingsPage"
import { AdminRoommatePostsPage } from "./pages/admin/AdminRoommatePostsPage"
import { AdminAnalyticsPage, AdminOwnersPage, AdminReportsPage, AdminSettingsPage, AdminSupportPage, AdminUsersPage } from "./pages/admin/AdminSupportPages"
import { OwnerAddListingPage } from "./pages/owner/OwnerAddListingPage"
import { OwnerDashboardPage } from "./pages/owner/OwnerDashboardPage"
import { OwnerEditListingPage } from "./pages/owner/OwnerEditListingPage"
import { OwnerListingsPage } from "./pages/owner/OwnerListingsPage"
import { OwnerAnalyticsPage, OwnerLeadsPage, OwnerProfilePage, OwnerSettingsPage } from "./pages/owner/OwnerSupportPages"
import { LandlordMessagesPage } from "./pages/owner/LandlordMessagesPage"
import { ApartmentDetailPage } from "./pages/public/ApartmentDetailPage"
import { ApartmentsPage } from "./pages/public/ApartmentsPage"
import { AboutPage } from "./pages/public/AboutPage"
import { HomePage } from "./pages/public/HomePage"
import { RoommatesPage } from "./pages/public/RoommatesPage"
import { SavedPage } from "./pages/public/SavedPage"
import { StudentMessagesPage } from "./pages/public/StudentMessagesPage"
import { PrivacyPolicyPage, TermsPage } from "./pages/public/LegalPages"
import { AdminLoginPage, OwnerLoginPage, OwnerSignUpPage, SignInPage, SignUpPage } from "./pages/public/SignInPage"
import { deleteListing as deleteListingApi, getAdminListings, getListings, getOwnerListings, updateListingApproval, updateListingAvailability } from "./services/api/apartments"
import { getCurrentUser, signOut } from "./services/api/auth"
import { getSavedListings, removeSavedListing, saveListing } from "./services/api/savedListings"
import type { AuthProfile, AuthRole } from "./services/api/types"
import { toast } from "sonner"
import { X } from "lucide-react"

type RequireRoleProps = {
  session: AuthProfile | null
  loading: boolean
  roles: AuthRole[]
  redirectTo: string
  children: React.ReactNode
}

function RequireRole({ session, loading, roles, redirectTo, children }: RequireRoleProps) {
  if (loading) {
    return <div className="grid min-h-screen place-items-center bg-slate-50 text-sm font-semibold text-slate-500">Checking session...</div>
  }

  if (!session) {
    return <Navigate to={redirectTo} replace />
  }

  if (!roles.includes(session.role)) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [apartmentsLoading, setApartmentsLoading] = useState(true)
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [session, setSession] = useState<AuthProfile | null>(null)
  const [sessionLoading, setSessionLoading] = useState(true)
  const [appMessage, setAppMessage] = useState("")

  const publicApartments = useMemo(() => apartments.filter((apartment) => apartment.approvalStatus === "Approved"), [apartments])

  const refreshApartments = async (activeSession = session) => {
    setApartmentsLoading(true)
    try {
      const listingsPromise =
        activeSession?.role === "admin" ? getAdminListings() :
        activeSession?.role === "owner" ? getOwnerListings() :
        getListings()
      const savedPromise = activeSession?.role === "student" ? getSavedListings() : Promise.resolve({ ids: [], listings: [] })
      const [listings, saved] = await Promise.all([listingsPromise, savedPromise])
      setApartments(listings)
      setSavedIds(saved.ids)
    } finally {
      setApartmentsLoading(false)
    }
  }

  const handleAuthenticated = async (profile: AuthProfile) => {
    setSession(profile)
    await refreshApartments(profile)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error(error)
      toast.error("Sign out failed. Please check your connection and try again.")
      return
    }
    setSession(null)
    setSavedIds([])
    await refreshApartments(null)
  }

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const profile = await getCurrentUser()
        setSession(profile)
        await refreshApartments(profile)
      } catch (error) {
        console.error(error)
        setAppMessage("Apartment data could not be loaded. Please check the backend connection.")
      } finally {
        setSessionLoading(false)
      }
    }

    bootstrap()
  }, [])

  useEffect(() => {
    if (!appMessage) return
    const timeout = window.setTimeout(() => setAppMessage(""), 6000)
    return () => window.clearTimeout(timeout)
  }, [appMessage])

  const toggleSavedApartment = async (id: string) => {
    if (session?.role !== "student") {
       toast.error("Please sign in as a student to save apartments.")
      setAppMessage("Please sign in as a student to save apartments.")
      return
    }

    const wasSaved = savedIds.includes(id)
    setSavedIds((current) => (wasSaved ? current.filter((savedId) => savedId !== id) : [...current, id]))

    try {
      const saved = wasSaved ? await removeSavedListing(id) : await saveListing(id)
      setSavedIds(saved.ids)
      toast.success(wasSaved ? "Removed from saved" : "Saved to your list")
    } catch (error) {
      console.error(error)
      setSavedIds((current) => (wasSaved ? [...current, id] : current.filter((savedId) => savedId !== id)))
      toast.error("Saved listing update failed. Please check the backend connection.")
      setAppMessage("Saved listing update failed. Please check the backend connection.")
    }
  }

  const updateAvailability = async (id: string, status: AvailabilityStatus) => {
    setApartments((current) => current.map((apartment) => (apartment.id === id ? { ...apartment, availabilityStatus: status } : apartment)))
    try {
      const updated = await updateListingAvailability(id, status)
      setApartments((current) => current.map((apartment) => (apartment.id === id ? updated : apartment)))
    } catch (error) {
       console.error(error)
      toast.error("Availability update failed. Please try again.")
      setAppMessage("Availability update failed. Please try again.")
      await refreshApartments()
    }
  }

  const updateApproval = async (id: string, status: ApprovalStatus) => {
    setApartments((current) => current.map((apartment) => (apartment.id === id ? { ...apartment, approvalStatus: status } : apartment)))
    try {
      const updated = await updateListingApproval(id, status)
      setApartments((current) => current.map((apartment) => (apartment.id === id ? updated : apartment)))
    toast.success(status === "Approved" ? "Listing approved" : status === "Rejected" ? "Listing rejected" : "Listing updated")
    } catch (error) {
      console.error(error)
       toast.error("Admin status update failed. Please try again.")
      setAppMessage("Admin status update failed. Please try again.")
      await refreshApartments()
    }
  }

  const deleteListing = async (id: string) => {
    setApartments((current) => current.filter((apartment) => apartment.id !== id))
    setSavedIds((current) => current.filter((savedId) => savedId !== id))
    try {
      await deleteListingApi(id)
      toast.success("Listing deleted")
    } catch (error) {
      console.error(error)
      toast.error("Delete failed. Please try again.")
      setAppMessage("Delete failed. Please try again.")
      await refreshApartments()
    }
  }

  return (
    <>
      {appMessage ? (
        <div className="fixed left-1/2 top-20 z-[60] flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 shadow-lg" role="status">
          <span className="min-w-0 flex-1">{appMessage}</span>
          <button type="button" onClick={() => setAppMessage("")} className="shrink-0 rounded p-0.5 hover:bg-amber-100" aria-label="Dismiss message">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : null}
      <Routes>
        <Route element={<PublicLayout session={session} sessionLoading={sessionLoading} onSignOut={handleSignOut} />}>
          <Route path="/" element={<HomePage apartments={publicApartments} savedIds={savedIds} onToggleSave={toggleSavedApartment} loading={apartmentsLoading} />} />
          <Route path="/apartments" element={<ApartmentsPage apartments={publicApartments} savedIds={savedIds} onToggleSave={toggleSavedApartment} loading={apartmentsLoading} />} />
          <Route path="/apartments/:id" element={<ApartmentDetailPage apartments={publicApartments} savedIds={savedIds} onToggleSave={toggleSavedApartment} loading={apartmentsLoading} session={session} />} />
          <Route path="/roommates" element={<RoommatesPage session={session} sessionLoading={sessionLoading} />} />
          <Route path="/saved" element={<SavedPage apartments={apartments} savedIds={savedIds} onToggleSave={toggleSavedApartment} session={session} apartmentsLoading={apartmentsLoading} />} />
          <Route path="/messages" element={<StudentMessagesPage session={session} loading={sessionLoading} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/signin" element={<SignInPage onAuthenticated={handleAuthenticated} />} />
          <Route path="/signup" element={<SignUpPage onAuthenticated={handleAuthenticated} />} />
          <Route path="/owner/login" element={<OwnerLoginPage onAuthenticated={handleAuthenticated} />} />
          <Route path="/owner/signup" element={<OwnerSignUpPage onAuthenticated={handleAuthenticated} />} />
          <Route path="/admin/login" element={<AdminLoginPage onAuthenticated={handleAuthenticated} />} />
        </Route>
        <Route element={<RequireRole session={session} loading={sessionLoading} roles={["owner"]} redirectTo="/owner/login"><OwnerLayout session={session} onSignOut={handleSignOut} /></RequireRole>}>
          <Route path="/owner/dashboard" element={<OwnerDashboardPage listings={apartments} loading={apartmentsLoading} />} />
          <Route path="/owner/add-listing" element={<OwnerAddListingPage onListingCreated={refreshApartments} />} />
          <Route path="/owner/listings" element={<OwnerListingsPage listings={apartments} onUpdateAvailability={updateAvailability} loading={apartmentsLoading} />} />
          <Route path="/owner/listings/:id/edit" element={<OwnerEditListingPage listings={apartments} onListingUpdated={refreshApartments} />} />
          <Route path="/owner/leads" element={<OwnerLeadsPage listings={apartments} session={session} />} />
          <Route path="/owner/messages" element={<LandlordMessagesPage session={session!} />} />
          <Route path="/owner/analytics" element={<OwnerAnalyticsPage listings={apartments} session={session} />} />
          <Route path="/owner/profile" element={<OwnerProfilePage listings={apartments} session={session} />} />
          <Route path="/owner/settings" element={<OwnerSettingsPage listings={apartments} session={session} />} />
        </Route>
        <Route element={<RequireRole session={session} loading={sessionLoading} roles={["admin"]} redirectTo="/admin/login"><AdminLayout session={session} onSignOut={handleSignOut} /></RequireRole>}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage listings={apartments} listingsLoading={apartmentsLoading} />} />
          <Route path="/admin/listings" element={<AdminListingsPage listings={apartments} onUpdateApproval={updateApproval} onDeleteListing={deleteListing} loading={apartmentsLoading} />} />
          <Route path="/admin/roommate-posts" element={<AdminRoommatePostsPage />} />
          <Route path="/admin/owners" element={<AdminOwnersPage listings={apartments} session={session} />} />
          <Route path="/admin/users" element={<AdminUsersPage listings={apartments} session={session} />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage listings={apartments} session={session} />} />
          <Route path="/admin/reports" element={<AdminReportsPage listings={apartments} session={session} />} />
          <Route path="/admin/settings" element={<AdminSettingsPage listings={apartments} session={session} />} />
          <Route path="/admin/support" element={<AdminSupportPage listings={apartments} session={session} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App

