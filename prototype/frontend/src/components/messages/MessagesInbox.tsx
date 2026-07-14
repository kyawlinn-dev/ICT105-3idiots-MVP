import { ArrowLeft, Building2, MessageCircle, Send, ShieldAlert, Users } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { toast } from "sonner"
import { EmptyState } from "../shared/EmptyState"
import { LoadingState } from "../shared/LoadingState"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Textarea } from "../ui/textarea"
import { cn } from "../../lib/utils"
import { getMessageConversations, getMessageThread, getRoommateMessageThread, sendListingMessage, sendRoommateMessage } from "../../services/api/messages"
import type { AuthProfile, MessageConversation, MessageThread } from "../../services/api/types"

type MessagesInboxProps = {
  session: AuthProfile
  mode: "student" | "landlord"
}

type Selection = { kind: "listing" | "roommate"; listingId: string; studentId: string }

const formatMessageTime = (value: string) => new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
}).format(new Date(value))

export function MessagesInbox({ session, mode }: MessagesInboxProps) {
  const [searchParams] = useSearchParams()
  const requestedListingId = mode === "student" ? searchParams.get("listing") ?? "" : ""
  const requestedRoommatePostId = mode === "student" ? searchParams.get("roommate") ?? "" : ""
  const [conversations, setConversations] = useState<MessageConversation[]>([])
  const [selection, setSelection] = useState<Selection | null>(
    requestedRoommatePostId
      ? { kind: "roommate", listingId: requestedRoommatePostId, studentId: session.id }
      : requestedListingId
        ? { kind: "listing", listingId: requestedListingId, studentId: session.id }
        : null,
  )
  const [thread, setThread] = useState<MessageThread | null>(null)
  const [loadingConversations, setLoadingConversations] = useState(true)
  const [loadingThread, setLoadingThread] = useState(false)
  const [body, setBody] = useState("")
  const [sending, setSending] = useState(false)

  const loadConversations = useCallback(async () => {
    try {
      const items = await getMessageConversations()
      setConversations(items)
      setSelection((current) => current ?? (items[0] ? { kind: items[0].kind, listingId: items[0].listingId, studentId: items[0].studentId } : null))
    } catch (error) {
      console.error(error)
      toast.error("Messages could not be loaded.")
    } finally {
      setLoadingConversations(false)
    }
  }, [])

  useEffect(() => {
    loadConversations()
  }, [loadConversations])

  useEffect(() => {
    if (!selection) {
      setThread(null)
      return
    }
    setLoadingThread(true)
    const request = selection.kind === "roommate"
      ? getRoommateMessageThread(selection.listingId, selection.studentId)
      : getMessageThread(selection.listingId, selection.studentId)
    request
      .then(setThread)
      .catch((error) => {
        console.error(error)
        toast.error("This conversation could not be opened.")
      })
      .finally(() => setLoadingThread(false))
  }, [selection])

  const selectedConversation = useMemo(() => conversations.find((item) => item.kind === selection?.kind && item.listingId === selection?.listingId && item.studentId === selection?.studentId), [conversations, selection])
  const otherName = thread?.counterpartName ?? selectedConversation?.counterpartName ?? (selection?.kind === "roommate" ? "Student" : mode === "student" ? "Landlord" : "Student")

  const handleSend = async (event: React.FormEvent) => {
    event.preventDefault()
    const message = body.trim()
    if (!selection || !message || sending) return

    setSending(true)
    try {
      const sent = selection.kind === "roommate"
        ? await sendRoommateMessage({ postId: selection.listingId, initiatorId: selection.studentId, body: message })
        : await sendListingMessage({ listingId: selection.listingId, studentId: mode === "landlord" ? selection.studentId : undefined, body: message })
      setBody("")
      setThread((current) => current ? { ...current, messages: [...current.messages, sent] } : current)
      await loadConversations()
    } catch (error) {
      console.error(error)
      toast.error("Message was not sent. Please try again.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600">{mode === "student" ? "Student inbox" : "Landlord inbox"}</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Messages</h1>
        <p className="mt-1 text-sm text-slate-500">Keep apartment and roommate conversations together in one secure inbox.</p>
      </div>

      <div className="mb-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950" role="note" aria-label="Message safety warning">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <div>
          <p className="text-sm font-extrabold">Protect your private information</p>
          <p className="mt-1 text-xs leading-5 text-amber-800">Never share bank account or card details, passwords, OTP codes, passport information, national ID numbers, or photos of identity documents in messages.</p>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="grid min-h-[560px] p-0 md:grid-cols-[310px_minmax(0,1fr)]">
          <aside className={cn("border-slate-200 bg-slate-50/70 md:border-r", selection && "hidden md:block")}>
            <div className="border-b border-slate-200 bg-white px-4 py-3">
              <p className="text-sm font-extrabold text-slate-950">Conversations</p>
              <p className="text-xs text-slate-500">{conversations.length} active</p>
            </div>
            {loadingConversations ? <LoadingState compact label="Loading conversations…" /> : conversations.length ? (
              <div className="divide-y divide-slate-200">
                {conversations.map((conversation) => {
                  const active = selection?.kind === conversation.kind && selection.listingId === conversation.listingId && selection.studentId === conversation.studentId
                  const counterpart = conversation.counterpartName
                  return (
                    <button
                      key={`${conversation.kind}:${conversation.listingId}:${conversation.studentId}`}
                      type="button"
                      onClick={() => setSelection({ kind: conversation.kind, listingId: conversation.listingId, studentId: conversation.studentId })}
                      className={cn("w-full px-4 py-4 text-left transition hover:bg-blue-50", active && "bg-blue-50")}
                    >
                      <div className="flex items-start gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-100 text-xs font-extrabold text-blue-700">{counterpart.slice(0, 2).toUpperCase()}</span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-2">
                            <span className="truncate text-sm font-extrabold text-slate-950">{counterpart}</span>
                            {conversation.unreadCount ? <span className="grid h-5 min-w-5 place-items-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">{conversation.unreadCount}</span> : null}
                          </span>
                          <span className="mt-0.5 block truncate text-xs font-semibold text-blue-700">{conversation.kind === "roommate" ? "Roommate: " : "Apartment: "}{conversation.listingName}</span>
                          <span className="mt-1 block truncate text-xs text-slate-500">{conversation.lastMessage}</span>
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : <div className="p-4"><EmptyState title="No messages yet" description={mode === "student" ? "Message a landlord or another student to begin." : "Student enquiries will appear here."} /></div>}
          </aside>

          <section className={cn("flex min-w-0 flex-col bg-white", !selection && "hidden md:flex")}>
            {selection ? (
              <>
                <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
                  <Button type="button" variant="ghost" size="icon" className="md:hidden" onClick={() => setSelection(null)} aria-label="Back to conversations"><ArrowLeft className="h-5 w-5" /></Button>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-600 text-white">{selection.kind === "roommate" ? <Users className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-slate-950">{thread?.listingName ?? selectedConversation?.listingName ?? "Apartment conversation"}</p>
                    <p className="truncate text-xs text-slate-500">Chatting with {otherName}</p>
                  </div>
                  <Button asChild variant="outline" size="sm" className="ml-auto hidden sm:inline-flex"><Link to={selection.kind === "roommate" ? "/roommates" : `/apartments/${selection.listingId}`}>{selection.kind === "roommate" ? "View posts" : "View apartment"}</Link></Button>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50/60 p-4 sm:p-5">
                  {loadingThread ? <LoadingState label="Loading messages…" /> : thread?.messages.length ? thread.messages.map((message) => {
                    const mine = message.senderId === session.id
                    return (
                      <div key={message.id} className={cn("flex", mine ? "justify-end" : "justify-start")}>
                        <div className={cn("max-w-[84%] rounded-2xl px-4 py-2.5 text-sm shadow-sm", mine ? "rounded-br-md bg-blue-600 text-white" : "rounded-bl-md border border-slate-200 bg-white text-slate-700")}>
                          <p className="whitespace-pre-wrap break-words leading-6">{message.body}</p>
                          <p className={cn("mt-1 text-[10px]", mine ? "text-blue-100" : "text-slate-400")}>{formatMessageTime(message.createdAt)}</p>
                        </div>
                      </div>
                    )
                  }) : (
                    <div className="grid h-full min-h-64 place-items-center text-center">
                      <div>
                        <MessageCircle className="mx-auto h-10 w-10 text-blue-300" />
                        <p className="mt-3 font-extrabold text-slate-800">Start the conversation</p>
                        <p className="mt-1 text-sm text-slate-500">Introduce yourself and ask respectful questions about the apartment or roommate post.</p>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSend} className="border-t border-slate-200 bg-white p-3 sm:p-4">
                  <div className="flex items-end gap-2">
                    <Textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="Write a message…" maxLength={2000} rows={2} className="min-h-[44px] resize-none" />
                    <Button type="submit" disabled={!body.trim() || sending} className="h-11 shrink-0 px-4"><Send className="h-4 w-4" /><span className="hidden sm:inline">{sending ? "Sending…" : "Send"}</span></Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="grid flex-1 place-items-center p-6 text-center">
                <div>
                  <MessageCircle className="mx-auto h-12 w-12 text-blue-200" />
                  <p className="mt-3 font-extrabold text-slate-800">Choose a conversation</p>
                  <p className="mt-1 text-sm text-slate-500">Your apartment and roommate messages will appear here.</p>
                </div>
              </div>
            )}
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
