import {
  Calendar,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  Search,
  SlidersHorizontal,
  UserRound,
  X,
} from "lucide-react"
import { type FormEvent, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { EmptyState } from "../../components/shared/EmptyState"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select } from "../../components/ui/select"
import { Textarea } from "../../components/ui/textarea"
import type { NearUniversity, RoommatePost } from "../../data/mockData"
import { formatCurrency } from "../../lib/utils"
import { ApiError } from "../../services/api/client"
import { createRoommatePost, getRoommatePosts } from "../../services/api/roommates"
import type { AuthProfile } from "../../services/api/types"

type RoommatesPageProps = {
  session: AuthProfile | null
  sessionLoading: boolean
}

const universities: NearUniversity[] = ["Rangsit University", "Bangkok University"]

const emptyPostForm = {
  title: "",
  nearUniversity: "Rangsit University" as NearUniversity,
  budgetMin: "",
  budgetMax: "",
  moveInDate: "",
  locationPreference: "",
  lifestyleTags: "",
  description: "",
}

export function RoommatesPage({ session, sessionLoading }: RoommatesPageProps) {
  const navigate = useNavigate()
  const [roommatePosts, setRoommatePosts] = useState<RoommatePost[]>([])
  const [selectedId, setSelectedId] = useState("")
  const [savedPosts, setSavedPosts] = useState<string[]>([])
  const [keyword, setKeyword] = useState("")
  const [university, setUniversity] = useState("")
  const [maxBudget, setMaxBudget] = useState("")
  const [moveIn, setMoveIn] = useState("")
  const [tag, setTag] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [postForm, setPostForm] = useState(emptyPostForm)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let active = true

    getRoommatePosts()
      .then((posts) => {
        if (!active) return
        setRoommatePosts(posts)
        setSelectedId(posts[0]?.id ?? "")
        setError("")
      })
      .catch((requestError) => {
        console.error(requestError)
        if (active) setError("Roommate posts could not be loaded. Please check the backend connection.")
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const tags = useMemo(() => Array.from(new Set(roommatePosts.flatMap((post) => post.lifestyleTags))).sort(), [roommatePosts])

  const filteredPosts = useMemo(() => {
    const query = keyword.trim().toLowerCase()
    const budgetLimit = maxBudget ? Number(maxBudget) : null
    const moveInQuery = moveIn.trim().toLowerCase()

    return roommatePosts.filter((post) => {
      const searchable = [post.title, post.posterName, post.nearUniversity, post.locationPreference, post.description, ...post.lifestyleTags].join(" ").toLowerCase()
      const matchesKeyword = query ? searchable.includes(query) : true
      const matchesUniversity = university ? post.nearUniversity === university : true
      const matchesBudget = budgetLimit ? post.budget <= budgetLimit : true
      const matchesMoveIn = moveInQuery ? post.moveInDate.toLowerCase().includes(moveInQuery) : true
      const matchesTag = tag ? post.lifestyleTags.includes(tag) : true

      return matchesKeyword && matchesUniversity && matchesBudget && matchesMoveIn && matchesTag
    })
  }, [keyword, maxBudget, moveIn, roommatePosts, tag, university])

  const selectedPost = filteredPosts.find((post) => post.id === selectedId) ?? filteredPosts[0] ?? null

  useEffect(() => {
    if (filteredPosts.length > 0 && !filteredPosts.some((post) => post.id === selectedId)) {
      setSelectedId(filteredPosts[0].id)
    }
  }, [filteredPosts, selectedId])

  const openCreatePost = () => {
    if (sessionLoading) return

    if (session?.role !== "student") {
      navigate("/signin", { state: { redirectTo: "/roommates" } })
      return
    }

    setMessage("")
    setIsCreateOpen(true)
  }

  const clearFilters = () => {
    setKeyword("")
    setUniversity("")
    setMaxBudget("")
    setMoveIn("")
    setTag("")
  }

  const togglePost = (id: string) => {
    setSavedPosts((current) => (current.includes(id) ? current.filter((postId) => postId !== id) : [...current, id]))
  }

  const submitPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage("")

    if (!postForm.title.trim() || !postForm.budgetMax || !postForm.moveInDate.trim() || !postForm.locationPreference.trim() || !postForm.description.trim()) {
      setMessage("Please complete the required roommate post fields.")
      return
    }

    setSubmitting(true)
    try {
      const created = await createRoommatePost({
        title: postForm.title,
        nearUniversity: postForm.nearUniversity,
        budgetMin: postForm.budgetMin ? Number(postForm.budgetMin) : undefined,
        budgetMax: Number(postForm.budgetMax),
        moveInDate: postForm.moveInDate,
        locationPreference: postForm.locationPreference,
        lifestyleTags: postForm.lifestyleTags.split(",").map((item) => item.trim()).filter(Boolean),
        description: postForm.description,
      })

      setRoommatePosts((current) => [created, ...current])
      setSelectedId(created.id)
      setPostForm(emptyPostForm)
      setIsCreateOpen(false)
      setMessage("Roommate post created.")
    } catch (requestError) {
      console.error(requestError)
      setMessage(requestError instanceof ApiError ? requestError.message : "Roommate post failed. Please check the backend.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="bg-slate-50 px-4 py-4 sm:px-5 lg:px-6">
      <section className="mx-auto max-w-6xl space-y-3">
        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-[0_14px_40px_rgba(15,23,42,0.04)] sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-wide text-blue-600">Roommate board</p>
              <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">Find a roommate near campus</h1>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">
                Browse student roommate posts around Rangsit University and Bangkok University, then contact posters using their shared profile details.
              </p>
            </div>
            <Button className="h-9 w-full sm:w-auto" onClick={openCreatePost} disabled={sessionLoading}>
              <Plus className="h-4 w-4" />
              Create post
            </Button>
          </div>
          {message ? <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">{message}</div> : null}
        </div>

        <Card>
          <CardContent className="p-3">
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-[minmax(180px,1fr)_150px_112px_130px_130px_auto] lg:items-center">
              <label className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input className="pl-9" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Search title, area, lifestyle" />
              </label>
              <Select value={university} onChange={(event) => setUniversity(event.target.value)}>
                <option value="">All universities</option>
                {universities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
              <Input value={maxBudget} onChange={(event) => setMaxBudget(event.target.value)} type="number" min="0" placeholder="Max budget" />
              <Input value={moveIn} onChange={(event) => setMoveIn(event.target.value)} placeholder="Move-in month" />
              <Select value={tag} onChange={(event) => setTag(event.target.value)}>
                <option value="">All tags</option>
                {tags.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
              <Button type="button" variant="outline" className="h-9" onClick={clearFilters}>
                <SlidersHorizontal className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px]">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-3">
              <div>
                <CardTitle className="text-base">Available roommate posts</CardTitle>
                <p className="mt-1 text-xs text-slate-500">{filteredPosts.length} matching posts</p>
              </div>
            </CardHeader>
            <CardContent className="grid gap-2.5 p-3 pt-0">
              {loading ? (
                <div className="rounded-lg border border-slate-200 bg-white p-6 text-center text-sm font-semibold text-slate-500">Loading roommate posts...</div>
              ) : error ? (
                <EmptyState title="Roommate posts unavailable" description={error} />
              ) : filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <RoommatePostCard
                    key={post.id}
                    post={post}
                    active={selectedPost?.id === post.id}
                    saved={savedPosts.includes(post.id)}
                    onSelect={() => setSelectedId(post.id)}
                    onSave={() => togglePost(post.id)}
                  />
                ))
              ) : (
                <EmptyState title="No roommate posts yet" description="Try clearing filters, or sign in as a student and create the first roommate post." />
              )}
            </CardContent>
          </Card>

          <aside className="lg:sticky lg:top-16 lg:self-start">
            {selectedPost ? (
              <RoommateDetailCard post={selectedPost} saved={savedPosts.includes(selectedPost.id)} onSave={() => togglePost(selectedPost.id)} />
            ) : (
              <Card>
                <CardContent className="p-4">
                  <EmptyState title="Select a post" description="Choose a roommate post to view full details and contact options." />
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </section>

      {isCreateOpen ? (
        <div className="fixed inset-0 z-50 flex items-end bg-slate-950/40 p-0 sm:items-center sm:justify-center sm:p-4">
          <Card className="max-h-[92vh] w-full overflow-y-auto rounded-b-none sm:max-w-2xl sm:rounded-lg">
            <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-slate-100 p-4">
              <div>
                <CardTitle className="text-lg">Create roommate post</CardTitle>
                <p className="mt-1 text-sm text-slate-500">Posting as {session?.displayName}</p>
              </div>
              <button type="button" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" onClick={() => setIsCreateOpen(false)} aria-label="Close create post form">
                <X className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent className="p-4">
              <form className="grid gap-4 sm:grid-cols-2" onSubmit={submitPost}>
                <Field label="Post title" className="sm:col-span-2">
                  <Input value={postForm.title} onChange={(event) => setPostForm({ ...postForm, title: event.target.value })} required placeholder="Looking for a quiet roommate near campus" />
                </Field>
                <Field label="University">
                  <Select value={postForm.nearUniversity} onChange={(event) => setPostForm({ ...postForm, nearUniversity: event.target.value as NearUniversity })}>
                    {universities.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Move-in month">
                  <Input value={postForm.moveInDate} onChange={(event) => setPostForm({ ...postForm, moveInDate: event.target.value })} required placeholder="August 2026" />
                </Field>
                <Field label="Minimum budget">
                  <Input value={postForm.budgetMin} onChange={(event) => setPostForm({ ...postForm, budgetMin: event.target.value })} type="number" min="0" placeholder="Optional" />
                </Field>
                <Field label="Maximum budget">
                  <Input value={postForm.budgetMax} onChange={(event) => setPostForm({ ...postForm, budgetMax: event.target.value })} type="number" min="1" required placeholder="6500" />
                </Field>
                <Field label="Preferred area" className="sm:col-span-2">
                  <Input value={postForm.locationPreference} onChange={(event) => setPostForm({ ...postForm, locationPreference: event.target.value })} required placeholder="Muang Ake, Lak Hok, Khlong Nueng" />
                </Field>
                <Field label="Lifestyle tags" className="sm:col-span-2">
                  <Input value={postForm.lifestyleTags} onChange={(event) => setPostForm({ ...postForm, lifestyleTags: event.target.value })} placeholder="Clean, quiet, no smoking" />
                </Field>
                <Field label="Description" className="sm:col-span-2">
                  <Textarea value={postForm.description} onChange={(event) => setPostForm({ ...postForm, description: event.target.value })} required placeholder="Share your room preference, schedule, and what kind of roommate would fit." />
                </Field>
                <div className="flex flex-col-reverse gap-2 sm:col-span-2 sm:flex-row sm:justify-end">
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Creating..." : "Create post"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </main>
  )
}

function RoommatePostCard({ post, active, saved, onSelect, onSave }: { post: RoommatePost; active: boolean; saved: boolean; onSelect: () => void; onSave: () => void }) {
  return (
    <article className={active ? "rounded-lg border border-blue-300 bg-blue-50/40 p-3 shadow-sm" : "rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:border-blue-200 hover:shadow-md"}>
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_160px_32px] md:items-start">
        <button type="button" onClick={onSelect} className="min-w-0 text-left">
          <div className="flex flex-wrap items-center gap-1.5">
            <h2 className="break-words text-sm font-bold text-slate-950 sm:text-base">{post.title}</h2>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">{post.nearUniversity}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-600">
            <span className="flex min-w-0 items-center gap-1">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-600" />
              <span className="truncate">{post.locationPreference}</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-blue-600" />
              {post.moveInDate}
            </span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600">{post.description}</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {post.lifestyleTags.slice(0, 4).map((item) => (
              <span key={item} className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-blue-700 ring-1 ring-blue-100">
                {item}
              </span>
            ))}
          </div>
        </button>
        <button type="button" onClick={onSelect} className="rounded-lg bg-slate-50 px-3 py-2 text-left md:text-right">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Budget</p>
          <p className="mt-1 text-sm font-bold text-slate-950">{budgetLabel(post)}</p>
        </button>
        <button type="button" onClick={onSave} className="justify-self-start rounded-full p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500 md:justify-self-end" aria-label={saved ? "Remove saved roommate post" : "Save roommate post"}>
          <Heart className={saved ? "h-4 w-4 fill-rose-500 text-rose-500" : "h-4 w-4"} />
        </button>
      </div>
    </article>
  )
}

function RoommateDetailCard({ post, saved, onSave }: { post: RoommatePost; saved: boolean; onSave: () => void }) {
  const contactItems = [
    post.posterEmail ? { icon: Mail, label: post.posterEmail, href: `mailto:${post.posterEmail}` } : null,
    post.posterPhone ? { icon: Phone, label: post.posterPhone, href: `tel:${post.posterPhone}` } : null,
    post.posterLineId ? { icon: MessageCircle, label: `LINE: ${post.posterLineId}`, href: null } : null,
  ].filter(Boolean) as Array<{ icon: typeof Mail; label: string; href: string | null }>

  return (
    <Card>
      <CardContent className="space-y-3 p-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-blue-600">Post details</p>
          <h2 className="mt-1.5 text-lg font-bold leading-tight text-slate-950">{post.title}</h2>
        </div>
        <div className="grid gap-2 text-sm">
          <Detail label="Budget" value={budgetLabel(post)} />
          <Detail label="Move in" value={post.moveInDate} />
          <Detail label="Location" value={post.locationPreference} />
          <Detail label="University" value={post.nearUniversity} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Lifestyle fit</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {post.lifestyleTags.length > 0 ? post.lifestyleTags.map((item) => (
              <span key={item} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                {item}
              </span>
            )) : <span className="text-sm text-slate-500">No tags added yet.</span>}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">About this post</p>
          <p className="mt-2 text-sm leading-5 text-slate-600">{post.description}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              {initials(post.posterName)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-950">{post.posterName}</p>
              <p className="text-xs text-slate-500">Student poster</p>
            </div>
          </div>
          <div className="mt-3 grid gap-2">
            {contactItems.length > 0 ? contactItems.map((item) => {
              const Icon = item.icon
              const content = (
                <>
                  <Icon className="h-4 w-4" />
                  {item.label}
                </>
              )

              return item.href ? (
                <a key={item.label} href={item.href} className="flex min-h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-700">
                  {content}
                </a>
              ) : (
                <div key={item.label} className="flex min-h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700">
                  {content}
                </div>
              )
            }) : (
              <p className="rounded-lg bg-white px-3 py-2 text-sm text-slate-500">This student has not shared contact details yet.</p>
            )}
          </div>
        </div>
        <Button type="button" variant="outline" className="w-full" onClick={onSave}>
          <Heart className={saved ? "h-4 w-4 fill-rose-500 text-rose-500" : "h-4 w-4"} />
          {saved ? "Saved post" : "Save post"}
        </Button>
      </CardContent>
    </Card>
  )
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2">
      <span className="text-xs font-semibold text-slate-500">{label}</span>
      <span className="text-right text-xs font-bold text-slate-950">{value}</span>
    </div>
  )
}

function budgetLabel(post: RoommatePost) {
  return post.budgetMin ? `${formatCurrency(post.budgetMin)} - ${formatCurrency(post.budget)}` : `Up to ${formatCurrency(post.budget)}`
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || <UserRound className="h-4 w-4" />
}
