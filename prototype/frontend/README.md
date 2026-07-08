# Student Apartment Finder Frontend

Frontend-only React prototype for the ICT105 Lab 05 Student Apartment Finder Platform.

The app helps students browse apartment and condo listings around Rangsit University, Bangkok University, and the Pathum Thani / Rangsit area. It uses mock data only and does not include a backend, database, payment, real authentication, or contract signing.

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Lucide React
- Recharts
- Mock data only

## Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```text
http://localhost:5173/
```

## Build

Create a production build:

```bash
npm run build
```

## Lint

Run the linter:

```bash
npm run lint
```

## Main Routes

- `/` - Homepage
- `/signin` - Role selection page
- `/apartments` - Apartment listing page
- `/apartments/:id` - Apartment detail page
- `/roommates` - Roommate support page
- `/saved` - Student shortlist page
- `/owner/dashboard` - Owner dashboard
- `/owner/add-listing` - Owner add listing form
- `/owner/listings` - Owner listing management
- `/admin/dashboard` - Admin analytics dashboard
- `/admin/listings` - Admin listing management

## Project Notes

- This is one React frontend app with role-based routes.
- All listings, roommate posts, dashboard metrics, and status updates use mock data or frontend state.
- Apartment prices are shown in THB.
- Distances are shown in kilometers.
- Sample listings focus on Rangsit University, Bangkok University, Pathum Thani, Khlong Luang, Thanyaburi, Lak Hok, and Muang Ake.

## Before Pushing

Recommended checks:

```bash
npm run build
npm run lint
```
