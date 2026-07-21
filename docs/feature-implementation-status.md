# Lab 10 - Feature Implementation Status

## Purpose

This document connects the Student Apartment Finder prototype to the functional requirements in `docs/system-requirements.md`. It records the current implementation status, prototype evidence and next verification or fix needed for each requirement.

## Status Meaning

- **Not Started:** No implementation evidence currently exists.
- **In Progress:** Development has started but the feature is incomplete.
- **Working Draft:** Implementation exists and is ready for Sprint 1 testing.
- **Needs Fix:** Testing found a problem that must be corrected.

## Requirement-to-Feature Mapping

| Req ID | Required Functionality | Prototype Screen / Module | Current Status | Evidence | Next Fix or Verification Needed |
|---|---|---|---|---|---|
| FR-01 | Clear problem-specific homepage | Public homepage | Working Draft | `prototype/frontend/src/pages/public/HomePage.tsx`, `screenshots/homepage.png` | Verify the homepage at mobile width. |
| FR-02 | Primary student pathway | Homepage, apartment list, apartment detail and contact flow | Working Draft | `prototype/frontend/src/App.tsx`, `ApartmentsPage.tsx`, `ApartmentDetailPage.tsx`, `screenshots/homepage.png`, `screenshots/record-list.png`, `screenshots/detail-view.png` | Complete an inquiry using a sample student account. |
| FR-03 | Owner apartment submission | Owner add-listing page and listing API | Working Draft | `OwnerAddListingPage.tsx`, `backend/src/routes/listingRoutes.ts`, `screenshots/input-form.png` | Submit a complete sample listing and confirm success. |
| FR-04 | Data storage and record management | Express services and Supabase database | Working Draft | `backend/src/services/listingService.ts`, `backend/supabase/migrations/`, `screenshots/record-list.png` | Confirm submitted data remains available after refreshing. |
| FR-05 | Apartment record list | Public apartment list and admin listing list | Working Draft | `ApartmentsPage.tsx`, `AdminListingsPage.tsx`, `screenshots/record-list.png`, `screenshots/admin-view.png` | Confirm pending or rejected listings are not publicly displayed. |
| FR-06 | Search and apartment filters | Apartment list and filter panel | Working Draft | `ApartmentsPage.tsx`, `components/shared/FilterPanel.tsx`, `screenshots/record-list.png` | Test every filter and the Clear All function. |
| FR-07 | Apartment detail view | Public apartment detail page | Working Draft | `ApartmentDetailPage.tsx`, `screenshots/detail-view.png` | Confirm all photos, facilities, map information and contact actions work. |
| FR-08 | Listing status tracking | Listing cards, details, owner portal and admin pages | Working Draft | `StatusBadge.tsx`, `OwnerListingsPage.tsx`, `AdminListingsPage.tsx`, `screenshots/detail-view.png`, `screenshots/admin-view.png` | Test pending, approved, rejected, available and unavailable status changes. |
| FR-09 | Admin listing management | Admin dashboard and listings page | Working Draft | `AdminDashboardPage.tsx`, `AdminListingsPage.tsx`, `backend/src/routes/adminRoutes.ts`, `screenshots/admin-view.png` | Test approve, reject and delete actions using an authorized admin account. |
| FR-10 | Validation and error prevention | Owner listing form and backend validation schemas | Working Draft | `OwnerAddListingPage.tsx`, `backend/src/validation/listingSchemas.ts`, `screenshots/input-form.png` | Submit incomplete and invalid data and confirm clear errors appear. |
| FR-11 | Confirmation and feedback messages | Form notifications and action feedback | Working Draft | `components/shared/NotificationBox.tsx`, owner and admin pages | Confirm successful submissions and status updates show feedback messages. |
| FR-12 | Dashboard and summary view | Admin and owner dashboards | Working Draft | `AdminDashboardPage.tsx`, `OwnerDashboardPage.tsx`, `backend/src/services/dashboardService.ts`, `screenshots/dashboard.png` | Verify dashboard totals against the displayed records. |
| FR-13 | Consistent user interface | Shared layouts, navigation and reusable components | Working Draft | `components/layout/`, `components/shared/`, `frontend/src/index.css`, `screenshots/` | Check navigation, labels, buttons, colors and spacing across all roles. |
| FR-14 | Responsive design | Responsive React layouts and Tailwind styling | Working Draft | `frontend/src/index.css`, page and layout components | Test the homepage, list, form, detail and admin screens at mobile width. |
| FR-15 | Privacy and responsible data handling | Authentication, role protection, private contact information and sample data | Working Draft | `backend/src/middleware/auth.ts`, `docs/privacy-and-data-protection.md`, `docs/data-handling-policy.md`, Lab 10 screenshots | Confirm private details are hidden from unauthorized users. |
| FR-16 | Prototype traceability | Requirements, user stories, implementation plan, feature status and screenshots | Working Draft | `docs/system-requirements.md`, `docs/user-stories.md`, `docs/implementation-plan.md`, this file and `screenshots/` | Add final issue and commit links to the README and weekly logbook. |

## Summary

- **Features visually confirmed during Sprint 1:** Homepage, apartment input form, apartment record list, search/filter interface, apartment detail view, listing-status display, admin listing-management view and dashboard.
- **Features available as working drafts:** Authentication, owner submission, database storage, admin actions, validation, confirmation messages, responsive design and privacy controls.
- **Features not yet started:** None identified.
- **Features requiring additional verification:** Successful form submission, database persistence, invalid-form errors, role protection, approve/reject/delete actions and mobile responsiveness.
- **Features requiring instructor feedback:** Whether the current full-stack implementation scope and external services are suitable for the remaining implementation sprints.

Screenshot evidence is stored in the `screenshots/` folder. Any problem discovered during further testing will be recorded as **Needs Fix**.
