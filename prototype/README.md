
# Student Apartment Finder Platform - Fullstack MVP Prototype

This folder contains the fullstack MVP prototype for the ICT105 Student Apartment Finder Platform. The app helps students search for off-campus rooms near Rangsit University and Bangkok University, while owners can submit real listings and admins can review listing quality before listings become public.

The current prototype is no longer a frontend-only mockup. It uses a React frontend, an Express backend API, Supabase Auth/Postgres/Storage, and Google Maps Platform.

## Main MVP Workflows

### Student

- Browse approved apartment listings.
- Search and filter by location, price, distance, room type, facilities, and availability.
- View apartment details, uploaded room photos, and Google map location.
- Save apartments to a shortlist after signing in.
- Browse and create roommate posts as a signed-in student.
- Use a basic asynchronous inbox to send apartment and roommate inquiries.

### Owner

- Sign up and sign in with Supabase Auth.
- Add real apartment listings.
- Upload room photos through the backend to Supabase Storage.
- Select listing location using Google Places Autocomplete.
- Edit existing owned listings.
- Update listing availability.
- Use owner portal pages for listings, leads, inbox inquiries, analytics, profile, and settings.

### Admin

- Sign in through the admin portal.
- Review owner-submitted listings.
- Approve, reject, or delete listings.
- View dashboard metrics and supporting admin pages.
- Approved listings become visible on the student side.

## Tech Stack

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Lucide React
- Recharts
- Google Maps JavaScript API loader

### Backend

- Node.js
- Express
- TypeScript
- Zod validation
- Multer file upload handling
- Vitest backend tests

### Data, Auth, and Storage

- Supabase Postgres
- Supabase Auth
- Supabase Storage
- SQL migrations and seed data

### Maps

- Google Maps JavaScript API
- Google Places Autocomplete

## Folder Structure

```text
prototype/
  frontend/                React/Vite app
  backend/                 Express API
    src/
      routes/              API route handlers
      services/            Supabase-backed service logic
      validation/          Zod schemas
      middleware/          Auth/error middleware
    supabase/
      migrations/          SQL schema changes
      seed.sql             Demo seed data
  PROJECT_SPEC.md
  FULLSTACK_MVP_ARCHITECTURE.md
```

## Environment Setup

Create local `.env` files for frontend and backend. Do not commit real `.env` files or API keys.

### Frontend

Create `prototype/frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:4000/api
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_browser_key
```

The Google key should have Maps JavaScript API and Places API enabled. For safety, restrict it to local and deployment domains in Google Cloud Console.

### Backend

Create `prototype/backend/.env` using the variables expected by the backend config. At minimum, configure:

```env
PORT=4000
NODE_ENV=development
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
CORS_ORIGIN=http://localhost:5173,http://localhost:5174
```

Use the service role key only on the backend. Never expose it in frontend code.

## Supabase Setup

1. Create or open the Supabase project.
2. Run SQL migrations in `prototype/backend/supabase/migrations/` in order.
3. Run `prototype/backend/supabase/seed.sql` for demo users and roommate posts.
4. Enable Supabase Auth email/password.
5. Create the Storage bucket:
   - Bucket name: `listing-photos`
   - Public read is acceptable for this MVP.
   - Uploads should go through the Express backend.
6. If resetting owner listing demo data, use the dev reset SQL script in `prototype/backend/supabase/`.

## Run Locally

Run the backend and frontend in separate terminals.

### Backend

```bash
cd prototype/backend
npm install
npm run dev
```

The backend runs on:

```text
http://localhost:4000
```

### Frontend

```bash
cd prototype/frontend
npm install
npm run dev
```

The frontend usually runs on:

```text
http://localhost:5173
```

If Vite chooses another port, make sure the backend `CORS_ORIGIN` includes that origin.

## Useful Scripts

### Frontend

```bash
cd prototype/frontend
npm run lint
npm run build
```

### Backend

```bash
cd prototype/backend
npm run lint
npm run build
npm run test
```

## Demo Flow

1. Start backend and frontend.
2. Sign in or sign up as an owner.
3. Add a listing with real photos and a confirmed Google Places location.
4. Open owner listings and edit or update availability if needed.
5. Sign in as admin.
6. Approve the pending listing.
7. Return to the student side.
8. Confirm the listing appears in apartment list, detail view, photo gallery, and Google map.
9. Sign in as student to save listings or create roommate posts.

## MVP Limitations

The following are intentionally out of scope for this MVP:

- Online payment
- Lease signing
- Full booking workflow
- Real-time chat; the MVP only supports basic asynchronous inquiry messages.
- Full identity verification
- AI roommate matching
- Production security hardening
- Power BI integration

## Related Project Docs

- `PROJECT_SPEC.md`
- `FULLSTACK_MVP_ARCHITECTURE.md`
- `SKILL_FRONTEND.md`
- `SKILL_BACKEND.md`
- `SKILL_DATABASE.md`
- `SKILL_MAPS.md`
- `SKILL_VERIFICATION.md`

Use those files for deeper implementation context and team workflow notes.
