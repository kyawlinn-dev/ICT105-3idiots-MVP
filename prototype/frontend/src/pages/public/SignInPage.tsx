import { Building2, Home, LockKeyhole, ShieldCheck, UserRound } from "lucide-react"
import type { FormEvent } from "react"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { signIn, signUp } from "../../services/api/auth"
import { ApiError } from "../../services/api/client"
import type { AuthProfile, AuthRole } from "../../services/api/types"

type AuthPageProps = {
  onAuthenticated: (profile: AuthProfile) => void | Promise<void>
}

type AuthMode = "sign-in" | "sign-up"

type PortalConfig = {
  role: AuthRole
  mode: AuthMode
  eyebrow: string
  title: string
  description: string
  icon: typeof UserRound
  submitLabel: string
  alternateLabel?: string
  alternateTo?: string
  redirectTo: string
  allowSignup: boolean
}

const portalCopy = {
  studentLogin: {
    role: "student",
    mode: "sign-in",
    eyebrow: "Student account",
    title: "Sign in to continue your apartment search",
    description: "Save apartments, compare options, and keep your shortlist ready while you search near campus.",
    icon: UserRound,
    submitLabel: "Sign in",
    alternateLabel: "Create student account",
    alternateTo: "/signup",
    redirectTo: "/apartments",
    allowSignup: false,
  },
  studentSignup: {
    role: "student",
    mode: "sign-up",
    eyebrow: "Student sign up",
    title: "Create your student account",
    description: "Start a shortlist and keep your housing search organized in one place.",
    icon: Home,
    submitLabel: "Create account",
    alternateLabel: "Already have an account?",
    alternateTo: "/signin",
    redirectTo: "/apartments",
    allowSignup: true,
  },
  ownerLogin: {
    role: "owner",
    mode: "sign-in",
    eyebrow: "Owner portal",
    title: "Sign in to manage your listings",
    description: "Upload rooms, manage availability, and track review status from your owner dashboard.",
    icon: Building2,
    submitLabel: "Sign in to owner portal",
    alternateLabel: "List your apartment",
    alternateTo: "/owner/signup",
    redirectTo: "/owner/dashboard",
    allowSignup: false,
  },
  ownerSignup: {
    role: "owner",
    mode: "sign-up",
    eyebrow: "Owner sign up",
    title: "Create an owner account",
    description: "Add real apartment details, upload room photos, and submit listings for admin review.",
    icon: Building2,
    submitLabel: "Create owner account",
    alternateLabel: "Already manage listings?",
    alternateTo: "/owner/login",
    redirectTo: "/owner/add-listing",
    allowSignup: true,
  },
  adminLogin: {
    role: "admin",
    mode: "sign-in",
    eyebrow: "Admin login",
    title: "Access the admin console",
    description: "Review owner submissions, approve listings, and monitor platform records.",
    icon: ShieldCheck,
    submitLabel: "Sign in as admin",
    redirectTo: "/admin/dashboard",
    allowSignup: false,
  },
} satisfies Record<string, PortalConfig>

export function SignInPage({ onAuthenticated }: AuthPageProps) {
  return <AuthPortalPage config={portalCopy.studentLogin} onAuthenticated={onAuthenticated} />
}

export function SignUpPage({ onAuthenticated }: AuthPageProps) {
  return <AuthPortalPage config={portalCopy.studentSignup} onAuthenticated={onAuthenticated} />
}

export function OwnerLoginPage({ onAuthenticated }: AuthPageProps) {
  return <AuthPortalPage config={portalCopy.ownerLogin} onAuthenticated={onAuthenticated} />
}

export function OwnerSignUpPage({ onAuthenticated }: AuthPageProps) {
  return <AuthPortalPage config={portalCopy.ownerSignup} onAuthenticated={onAuthenticated} />
}

export function AdminLoginPage({ onAuthenticated }: AuthPageProps) {
  return <AuthPortalPage config={portalCopy.adminLogin} onAuthenticated={onAuthenticated} />
}

function AuthPortalPage({ config, onAuthenticated }: AuthPageProps & { config: PortalConfig }) {
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = (location.state as { redirectTo?: string } | null)?.redirectTo ?? config.redirectTo
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [lineId, setLineId] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const Icon = config.icon

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage("")
    setSubmitting(true)

    try {
      const profile = config.mode === "sign-up"
        ? await signUp({
            role: config.role as "student" | "owner",
            displayName,
            email,
            password,
            phone: phone || undefined,
            lineId: lineId || undefined,
          })
        : await signIn({ role: config.role, email, password })

      await onAuthenticated(profile)
      navigate(redirectTo)
    } catch (error) {
      setMessage(error instanceof ApiError ? error.message : "Authentication failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-[calc(100vh-49px)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-6">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-blue-600">
            <Icon className="h-6 w-6" />
          </div>
          <p className="mt-5 text-sm font-bold uppercase tracking-wide text-blue-600">{config.eyebrow}</p>
          <h1 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{config.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{config.description}</p>
          <div className="mt-6 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
            {["Secure account", "Real listing data", "Role-based portal"].map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-3 font-semibold">
                {item}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-600 text-white">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-950">{config.mode === "sign-up" ? "Create account" : "Sign in"}</h2>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{config.role} portal</p>
              </div>
            </div>

            {message ? <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">{message}</div> : null}

            <form className="space-y-4" onSubmit={handleSubmit}>
              {config.allowSignup ? (
                <Field label="Full name">
                  <Input value={displayName} onChange={(event) => setDisplayName(event.target.value)} required placeholder="Your name" />
                </Field>
              ) : null}
              <Field label="Email address">
                <Input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="name@example.com" />
              </Field>
              <Field label="Password">
                <Input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required minLength={config.allowSignup ? 8 : 1} placeholder={config.allowSignup ? "At least 8 characters" : "Your password"} />
              </Field>
              {config.allowSignup ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone">
                    <Input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Optional" />
                  </Field>
                  <Field label="LINE ID">
                    <Input value={lineId} onChange={(event) => setLineId(event.target.value)} placeholder="Optional" />
                  </Field>
                </div>
              ) : null}
              <Button type="submit" className="h-11 w-full bg-blue-600 hover:bg-blue-700" disabled={submitting}>
                {submitting ? "Please wait..." : config.submitLabel}
              </Button>
            </form>

            {config.alternateTo && config.alternateLabel ? (
              <Button asChild variant="ghost" className="mt-3 h-10 w-full">
                <Link to={config.alternateTo}>{config.alternateLabel}</Link>
              </Button>
            ) : null}
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  )
}
