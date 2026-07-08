import { Heart, MessageCircle, UsersRound } from "lucide-react"
import { useMemo, useState } from "react"
import { EmptyState } from "../../components/shared/EmptyState"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Select } from "../../components/ui/select"
import { roommatePosts } from "../../data/mockData"
import { formatCurrency } from "../../lib/utils"

export function RoommatesPage() {
  const [tag, setTag] = useState("")
  const [savedPosts, setSavedPosts] = useState<string[]>([])
  const [selectedId, setSelectedId] = useState(roommatePosts[0]?.id ?? "")

  const tags = Array.from(new Set(roommatePosts.flatMap((post) => post.lifestyleTags)))
  const filteredPosts = useMemo(
    () => (tag ? roommatePosts.filter((post) => post.lifestyleTags.includes(tag)) : roommatePosts),
    [tag],
  )
  const selectedPost = roommatePosts.find((post) => post.id === selectedId) ?? filteredPosts[0]

  const togglePost = (id: string) => {
    setSavedPosts((current) => (current.includes(id) ? current.filter((postId) => postId !== id) : [...current, id]))
  }

  return (
    <main className="bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-7xl gap-5 xl:grid-cols-[0.95fr_1.1fr_1fr]">
        <Card className="border-0 bg-violet-50/60 shadow-none">
          <CardContent className="flex h-full flex-col justify-between p-7">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-violet-600">Roommate support</p>
              <h1 className="mt-5 max-w-sm text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl xl:text-3xl">Find Your Perfect Roommate</h1>
              <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">Connect with students near Rangsit University and Bangkok University.</p>
              <Button className="mt-6 h-11 w-full sm:w-auto">Browse Roommate Posts</Button>
            </div>
            <div className="mt-8 rounded-lg bg-white p-5 shadow-sm">
              <div className="mx-auto flex max-w-xs items-end justify-center gap-3">
                <div className="grid h-28 w-24 place-items-center rounded-t-full bg-blue-100 text-4xl">A</div>
                <div className="grid h-32 w-24 place-items-center rounded-t-full bg-violet-200 text-4xl">B</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base">Recent Posts</CardTitle>
            <Select className="w-full sm:w-40" value={tag} onChange={(event) => setTag(event.target.value)}>
              <option value="">All tags</option>
              {tags.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </CardHeader>
          <CardContent className="grid gap-3 p-4 pt-0">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => setSelectedId(post.id)}
                  className="rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:border-violet-200 hover:bg-violet-50/40"
                >
                  <div className="flex items-start gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                      {post.posterName.slice(-1)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-slate-950">{post.title}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {post.nearUniversity} - {formatCurrency(post.budget)}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {post.lifestyleTags.slice(0, 3).map((item) => (
                          <span key={item} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Heart className={savedPosts.includes(post.id) ? "h-4 w-4 fill-rose-500 text-rose-500" : "h-4 w-4 text-slate-300"} />
                  </div>
                </button>
              ))
            ) : (
              <EmptyState title="No roommate posts match this tag" description="Clear the tag filter to return to all roommate support posts." />
            )}
          </CardContent>
        </Card>

        {selectedPost ? (
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-base">Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-4 pt-0">
              <div>
                <h2 className="text-xl font-bold text-slate-950">{selectedPost.title}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedPost.lifestyleTags.map((item) => (
                    <span key={item} className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 text-sm">
                <Detail label="Budget" value={`${formatCurrency(selectedPost.budget)} THB/month`} />
                <Detail label="Move in date" value={selectedPost.moveInDate} />
                <Detail label="Location" value={selectedPost.locationPreference} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">About me</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{selectedPost.description}</p>
              </div>
              <Card className="bg-slate-50 shadow-none">
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                      {selectedPost.posterName.slice(-1)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-950">{selectedPost.posterName}</p>
                      <p className="text-xs text-slate-500">Computer Science Student</p>
                    </div>
                  </div>
                  <Button className="h-11 w-full">
                    <MessageCircle className="h-4 w-4" />
                    Send Message
                  </Button>
                  <Button type="button" variant="outline" className="h-11 w-full" onClick={() => togglePost(selectedPost.id)}>
                    <UsersRound className="h-4 w-4" />
                    {savedPosts.includes(selectedPost.id) ? "Saved Post" : "Save Post"}
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        ) : null}
      </section>
    </main>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg bg-slate-50 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-xs font-semibold text-slate-500">{label}</span>
      <span className="text-xs font-bold text-slate-950">{value}</span>
    </div>
  )
}
