import { Navigate } from "react-router-dom"
import { MessagesInbox } from "../../components/messages/MessagesInbox"
import type { AuthProfile } from "../../services/api/types"

export function StudentMessagesPage({ session, loading }: { session: AuthProfile | null; loading: boolean }) {
  if (loading) return null
  if (!session) return <Navigate to="/signin" replace />
  if (session.role !== "student") return <Navigate to="/" replace />
  return <MessagesInbox session={session} mode="student" />
}
