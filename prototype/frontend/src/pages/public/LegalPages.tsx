import { ShieldCheck } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"

const updated = "13 July 2026"

function LegalPage({ title, introduction, sections }: { title: string; introduction: string; sections: Array<{ heading: string; body: string }> }) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-white"><ShieldCheck className="h-5 w-5" /></div>
        <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600">Student Apartment Finder</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">{title}</h1>
        <p className="mt-2 text-xs text-slate-500">Last updated: {updated}</p>
      </div>
      <Card><CardContent className="space-y-6 p-5 sm:p-7">
        <p className="text-sm leading-7 text-slate-600">{introduction}</p>
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-base font-extrabold text-slate-950">{section.heading}</h2>
            <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600">{section.body}</p>
          </section>
        ))}
      </CardContent></Card>
    </main>
  )
}

export function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" introduction="This policy explains how Student Apartment Finder handles information when students, landlords, and administrators use the platform." sections={[
    { heading: "Information we collect", body: "We may collect account information such as your name, email address, phone number and LINE ID; apartment or roommate-post information; saved listings; inquiry messages; uploaded images; approximate property locations; and technical information needed to operate and secure the service." },
    { heading: "How information is used", body: "Information is used to authenticate accounts, display approved listings, provide saved items and basic inquiry messaging, moderate submissions, send approval or rejection notifications, prevent misuse, and improve the service." },
    { heading: "Visibility and sharing", body: "Approved apartment and roommate-post details may be visible to platform users. Private inquiry messages are intended only for conversation participants. We do not ask users to share passwords, OTP codes, banking credentials, passport details, national ID numbers, or identity-document images in messages." },
    { heading: "Service providers", body: "The application uses Supabase for authentication and database services and Google Maps services for property location features. These providers may process information according to their own privacy terms." },
    { heading: "Retention and security", body: "Information is retained while needed to provide the service, meet legitimate administrative needs, or resolve misuse. Reasonable technical safeguards are used, but no online system can guarantee absolute security." },
    { heading: "Your choices", body: "Users may update their own listing or roommate-post information and may request account or data assistance from the project administrator. You can stop using the service at any time." },
    { heading: "Children and changes", body: "The platform is intended for university-age users. This policy may be updated as the project changes; the latest revision date will appear above." },
  ]} />
}

export function TermsPage() {
  return <LegalPage title="Terms of Use" introduction="By creating an account or using Student Apartment Finder, you agree to use the platform responsibly and follow these terms." sections={[
    { heading: "Purpose of the platform", body: "Student Apartment Finder helps users discover student housing, publish roommate posts, save options, and send basic inquiries. The platform does not own, inspect, rent, or guarantee listed properties and is not a party to rental agreements." },
    { heading: "Accounts and accurate information", body: "You are responsible for your account and for providing accurate, current information. Do not impersonate another person, create misleading listings, or use another user’s account without permission." },
    { heading: "Landlord and student submissions", body: "Landlords must have authority to advertise a property. Students must publish genuine roommate requests. Administrators may approve, reject, remove, or request changes to content that is incomplete, unsafe, misleading, inappropriate, or no longer current." },
    { heading: "Safe communication", body: "Do not send harassment, discrimination, scams, malware, or illegal content. Never request or share passwords, OTP codes, banking credentials, passport details, national ID numbers, or identity-document images through platform messages." },
    { heading: "Property checks and payments", body: "Users must independently verify property condition, landlord identity, pricing, deposits, contracts, roommates, and locations before making decisions. Do not transfer money solely because of information or messages shown on this platform." },
    { heading: "Availability and liability", body: "The service may occasionally be unavailable or contain errors. Listings and user messages are user-submitted. To the extent allowed by applicable law, the project is provided without guarantees regarding availability, accuracy, safety, suitability, or successful rental outcomes." },
    { heading: "Suspension and updates", body: "Accounts or content may be restricted or removed for violating these terms or threatening user safety. These terms may be updated as features change; continued use after an update means you accept the revised terms." },
  ]} />
}
