import { MessagesInbox } from "../../components/messages/MessagesInbox"
import type { AuthProfile } from "../../services/api/types"

export function LandlordMessagesPage({ session }: { session: AuthProfile }) {
  return <MessagesInbox session={session} mode="landlord" />
}
