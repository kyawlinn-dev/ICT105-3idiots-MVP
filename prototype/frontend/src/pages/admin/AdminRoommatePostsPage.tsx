import { CheckCircle2, Search, XCircle } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { EmptyState } from "../../components/shared/EmptyState"
import { LoadingState } from "../../components/shared/LoadingState"
import { PageHeader } from "../../components/shared/PageHeader"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import type { RoommateApprovalStatus, RoommatePost } from "../../data/mockData"
import { formatCurrency } from "../../lib/utils"
import { getAdminRoommatePosts, updateAdminRoommateApproval } from "../../services/api/roommates"

export function AdminRoommatePostsPage() {
  const [posts, setPosts] = useState<RoommatePost[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState("")
  const [query, setQuery] = useState("")

  useEffect(() => {
    getAdminRoommatePosts().then(setPosts).catch((error) => {
      console.error(error)
      toast.error("Roommate posts could not be loaded.")
    }).finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return posts.filter((post) => !keyword || post.title.toLowerCase().includes(keyword) || post.posterName.toLowerCase().includes(keyword) || post.nearUniversity.toLowerCase().includes(keyword))
  }, [posts, query])

  const review = async (post: RoommatePost, approvalStatus: RoommateApprovalStatus) => {
    setUpdatingId(post.id)
    try {
      const updated = await updateAdminRoommateApproval(post.id, approvalStatus)
      setPosts((current) => current.map((item) => item.id === post.id ? updated : item))
      toast.success(approvalStatus === "approved" ? "Roommate post approved" : "Roommate post rejected")
    } catch (error) {
      console.error(error)
      toast.error("Review status could not be updated.")
    } finally {
      setUpdatingId("")
    }
  }

  if (loading) return <LoadingState label="Loading roommate posts…" />

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <PageHeader eyebrow="Admin moderation" title="Review roommate posts" description="Approve useful student roommate posts and reject unsafe, incomplete, or inappropriate submissions." />
      <Card><CardContent className="p-4">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, student, or university" className="pl-9" />
        </div>
      </CardContent></Card>
      <div className="grid gap-3">
        {filtered.length ? filtered.map((post) => (
          <Card key={post.id}><CardContent className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-bold text-slate-950">{post.title}</h2>
                  <span className={post.approvalStatus === "approved" ? "rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700" : post.approvalStatus === "rejected" ? "rounded-full bg-rose-50 px-2 py-1 text-xs font-bold text-rose-700" : "rounded-full bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700"}>{post.approvalStatus}</span>
                </div>
                <p className="mt-1 text-sm font-semibold text-blue-700">{post.posterName} · {post.nearUniversity}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{post.description}</p>
                <p className="mt-2 text-xs text-slate-500">Budget up to {formatCurrency(post.budget)} · {post.locationPreference}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button type="button" size="sm" onClick={() => review(post, "approved")} disabled={updatingId === post.id || post.approvalStatus === "approved"}><CheckCircle2 className="h-4 w-4" />Approve</Button>
                <Button type="button" size="sm" variant="danger" onClick={() => review(post, "rejected")} disabled={updatingId === post.id || post.approvalStatus === "rejected"}><XCircle className="h-4 w-4" />Reject</Button>
              </div>
            </div>
          </CardContent></Card>
        )) : <EmptyState title="No roommate posts found" description="New student submissions will appear here for review." />}
      </div>
    </div>
  )
}
