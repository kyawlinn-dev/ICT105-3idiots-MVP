# Lab 10 - Feature Implementation Status

## Purpose

This document connects the Student Apartment Finder prototype to the functional requirements in `docs/system-requirements.md`. It records the current implementation status, the prototype evidence and the next verification or fix needed for each requirement.

## Status Meaning

- **Not Started:** No implementation evidence currently exists.
- **In Progress:** Development has started but the feature is incomplete.
- **Working Draft:** Implementation exists and is ready for Sprint 1 testing.
- **Needs Fix:** Testing found a problem that must be corrected.

## Requirement-to-Feature Mapping

| Req ID | Required Functionality | Prototype Screen / Module | Current Status | Evidence | Next Fix or Verification Needed |
|---|---|---|---|---|---|
| FR-01 | Clear problem-specific homepage | Public homepage | Working Draft | `prototype/frontend/src/pages/public/HomePage.tsx` | Verify that the title, target users, problem and main apartment-search action are visible; capture `screenshots/homepage.png`. |
| FR-02 | Primary student pathway | Homepage, apartment list, apartment detail and contact flow | Working Draft | `prototype/frontend/src/App.tsx`, `ApartmentsPage.tsx`, `ApartmentDetailPage.tsx` | Test the complete journey from opening the site to viewing details and contacting an owner. |
| FR-03 | Owner apartment submission | Owner add-listing page and listing API | Working Draft | `OwnerAddListingPage.tsx`, `backend/src/routes/listingRoutes.ts` | Test required fields, photo/location input and successful submission; capture `screenshots/input-form.png`. |
| FR-04 | Data storage and record management | Express services and Supabase database | Working Draft | `backend/src/services/listingService.ts`, `backend/supabase/migrations/` | Confirm that submitted data is stored and remains available after refreshing the prototype. |
| FR-05 | Apartment record list | Public apartment list and admin listing list | Working Draft | `ApartmentsPage.tsx`, `AdminListingsPage.tsx` | Confirm approved listings appear publicly while pending/rejected listings remain restricted; capture `screenshots/record-list.png`. |
| FR-06 | Search and apartment filters | Apartment list and filter panel | Working Draft | `ApartmentsPage.tsx`, `components/shared/FilterPanel.tsx` | Test search and filters for price, distance, room type, facilities and availability. |
| FR-07 | Apartment detail view | Public apartment detail page | Working Draft | `ApartmentDetailPage.tsx` | Confirm price, distance, room type, facilities, availability, photos, location and contact information are shown; capture `screenshots/detail-view.png`. |
| FR-08 | Listing status tracking | Listing cards, details, owner portal and admin pages | Working Draft | `StatusBadge.tsx`, `OwnerListingsPage.tsx`, `AdminListingsPage.tsx` | Test pending, approved, rejected, available and unavailable status changes. |
| FR-09 | Admin listing management | Admin dashboard and listings page | Working Draft | `AdminDashboardPage.tsx`, `AdminListingsPage.tsx`, `backend/src/routes/adminRoutes.ts` | Test approve, reject and delete actions using an authorized admin account; capture `screenshots/admin-view.png`. |
| FR-10 | Validation and error prevention | Owner listing form and backend validation schemas | Working Draft | `OwnerAddListingPage.tsx`, `backend/src/validation/listingSchemas.ts` | Submit incomplete and invalid data and confirm that clear validation errors appear. |
| FR-11 | Confirmation and feedback messages | Form notifications and action feedback | Working Draft | `components/shared/NotificationBox.tsx`, owner and admin pages | Confirm successful submission and status updates show understandable feedback messages. |
| FR-12 | Dashboard and summary view | Admin and owner dashboards | Working Draft | `AdminDashboardPage.tsx`, `OwnerDashboardPage.tsx`, `backend/src/services/dashboardService.ts` | Verify listing totals and status summaries against the displayed records; capture `screenshots/dashboard.png`. |
| FR-13 | Consistent user interface | Shared layouts, navigation and reusable components | Working Draft | `components/layout/`, `components/shared/`, `frontend/src/index.css` | Check that navigation, labels, buttons, colors and spacing are consistent across roles. |
| FR-14 | Responsive design | Responsive React layouts and Tailwind styling | Working Draft | `frontend/src/index.css`, page and layout components | Test homepage, list, form, detail and admin screens at laptop and mobile widths. |
| FR-15 | Privacy and responsible data handling | Authentication, role protection, private contact information and sample data | Working Draft | `backend/src/middleware/auth.ts`, `docs/privacy-and-data-protection.md`, `docs/data-handling-policy.md` | Confirm private details are hidden from unauthorized users and all screenshots use sample or masked information. |
| FR-16 | Prototype traceability | Requirements, user stories, implementation plan and feature-status document | Working Draft | `docs/system-requirements.md`, `docs/user-stories.md`, `docs/implementation-plan.md`, this file | Add screenshot and commit evidence after Sprint 1 testing is completed. |

## Summary

- **Features working today:** Not yet confirmed through Lab 10 validation testing.
- **Features available as working drafts:** Homepage, navigation, apartment submission, data storage, apartment list, search/filter, detail view, status display, admin management, validation, feedback messages, dashboards, responsive interface and privacy controls.
- **Features not yet started:** None identified from the current repository files.
- **Features requiring additional verification:** All working-draft features must be tested using student, owner and admin accounts before their final status is confirmed.
- **Features requiring instructor feedback:** Whether the current full-stack scope and external services are suitable for the remaining implementation sprints.

This document will be updated after Sprint 1 testing. Any failed feature will be changed to **Needs Fix**, and working features will receive screenshot or commit evidence.
