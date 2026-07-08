import { Save, Send } from "lucide-react"
import type { FormEvent } from "react"
import { useState } from "react"
import { FormSection } from "../../components/shared/FormSection"
import { PageHeader } from "../../components/shared/PageHeader"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select } from "../../components/ui/select"
import { Textarea } from "../../components/ui/textarea"

type FormState = {
  name: string
  location: string
  price: string
  roomType: string
  bedrooms: string
  bathrooms: string
  availabilityStatus: string
  facilities: string
  ownerName: string
  ownerContact: string
  description: string
}

const emptyForm: FormState = {
  name: "",
  location: "",
  price: "",
  roomType: "",
  bedrooms: "",
  bathrooms: "",
  availabilityStatus: "Available",
  facilities: "",
  ownerName: "",
  ownerContact: "",
  description: "",
}

export function OwnerAddListingPage() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [message, setMessage] = useState("")

  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }))

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {}
    const required: Array<keyof FormState> = ["name", "location", "price", "roomType", "ownerName", "ownerContact", "description"]

    required.forEach((key) => {
      if (!form[key].trim()) {
        nextErrors[key] = "This field is required."
      }
    })

    if (form.price && Number(form.price) <= 0) {
      nextErrors.price = "Price must be greater than 0."
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) {
      setMessage("")
      return
    }
    setMessage("Listing submitted for admin review. This is a frontend-only confirmation.")
    setForm(emptyForm)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div className="rounded-lg border border-slate-200/80 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
        <PageHeader
          eyebrow="Owner Panel"
          title="Add New Apartment Listing"
          description="Fill in the details below to list your apartment."
        />
      </div>
      {message ? <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{message}</div> : null}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormSection title="Basic information" description="Name the property and describe the student housing offer.">
          <Field label="Apartment name" error={errors.name}>
            <Input value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Example Residence" />
          </Field>
          <Field label="Room type" error={errors.roomType}>
            <Select value={form.roomType} onChange={(event) => update("roomType", event.target.value)}>
              <option value="">Select room type</option>
              <option value="Studio">Studio</option>
              <option value="Shared Room">Shared Room</option>
              <option value="Private Room">Private Room</option>
              <option value="One Bedroom">One Bedroom</option>
            </Select>
          </Field>
          <Field label="Description" error={errors.description} className="md:col-span-3">
            <Textarea value={form.description} onChange={(event) => update("description", event.target.value)} placeholder="Describe the room, commute, facilities, and student fit." />
          </Field>
        </FormSection>

        <FormSection title="Location and price" description="Help students compare commute distance and monthly rent.">
          <Field label="Location" error={errors.location}>
            <Input value={form.location} onChange={(event) => update("location", event.target.value)} placeholder="Lak Hok, Muang Ake, or Khlong Nueng" />
          </Field>
          <Field label="Monthly price" error={errors.price}>
            <Input value={form.price} onChange={(event) => update("price", event.target.value)} type="number" min="0" placeholder="9500" />
          </Field>
        </FormSection>

        <FormSection title="Room details and facilities" description="Use comma-separated facilities for the mock card display.">
          <Field label="Bedrooms">
            <Input value={form.bedrooms} onChange={(event) => update("bedrooms", event.target.value)} type="number" min="0" placeholder="1" />
          </Field>
          <Field label="Bathrooms">
            <Input value={form.bathrooms} onChange={(event) => update("bathrooms", event.target.value)} type="number" min="0" placeholder="1" />
          </Field>
          <Field label="Availability status">
            <Select value={form.availabilityStatus} onChange={(event) => update("availabilityStatus", event.target.value)}>
              <option value="Available">Available</option>
              <option value="Limited">Limited</option>
              <option value="Unavailable">Unavailable</option>
            </Select>
          </Field>
          <Field label="Facilities">
            <Input value={form.facilities} onChange={(event) => update("facilities", event.target.value)} placeholder="Wi-Fi, Laundry, Security" />
          </Field>
        </FormSection>

        <FormSection title="Photos and contact" description="Remote placeholder images are used elsewhere; owners provide contact details here.">
          <Field label="Owner name" error={errors.ownerName}>
            <Input value={form.ownerName} onChange={(event) => update("ownerName", event.target.value)} placeholder="Owner or company name" />
          </Field>
          <Field label="Owner contact" error={errors.ownerContact}>
            <Input value={form.ownerContact} onChange={(event) => update("ownerContact", event.target.value)} placeholder="owner@example.com" />
          </Field>
          <div className="rounded-lg border border-dashed border-violet-200 bg-violet-50 p-4 text-sm text-violet-700 md:col-span-3">
            Photo upload is represented as a placeholder section for the frontend-only prototype.
          </div>
        </FormSection>

        <div className="flex flex-wrap justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => setMessage("Draft saved locally for the prototype session.")}>
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button type="submit">
            <Send className="h-4 w-4" />
            Submit Listing
          </Button>
        </div>
      </form>
    </div>
  )
}

type FieldProps = {
  label: string
  error?: string
  className?: string
  children: React.ReactNode
}

function Field({ label, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <div className="mt-2">{children}</div>
      {error ? <p className="mt-1 text-sm font-semibold text-rose-600">{error}</p> : null}
    </div>
  )
}
