# Lab 10 - Feature Implementation Status

## Purpose

This document connects the Student Apartment Finder prototype to the functional requirements in `docs/system-requirements.md`. It records the current implementation status, prototype evidence and next verification or fix needed for each requirement.

## Status Meaning

- **Not Started:** No implementation evidence currently exists.
- **In Progress:** Development has started but the feature is incomplete.
- **Working Draft:** Implementation exists and is ready for Sprint 1 testing.
- **Needs Fix:** Testing found a problem that must be corrected.

## Requirement-to-Feature Mapping
## Requirement Implementation Status

| Req ID | Required Functionality | Screen / Module | Lab 10 Status | Lab 11 Status | Owner | Evidence | Notes / Next Action |
|---|---|---|---|---|---|---|---|
| FR-01 | Clear problem-specific homepage | Public homepage | Working Draft | Completed | Phyo Wai Aung | `HomePage.tsx`, `screenshots/homepage.png` | Homepage purpose, target users and main action were visually confirmed. |
| FR-02 | Primary student pathway | Homepage, apartment list, detail and contact flow | Working Draft | Partially Completed | Phyo Wai Aung / Kyaw Linn | `App.tsx`, `ApartmentsPage.tsx`, `ApartmentDetailPage.tsx` | Test the complete journey through inquiry submission. |
| FR-03 | Owner apartment submission | Owner add-listing page and listing API | Working Draft | Partially Completed | Kyaw Linn | `OwnerAddListingPage.tsx`, `listingRoutes.ts`, `screenshots/input-form.png` | Verify complete submission, validation and database persistence. |
| FR-04 | Data storage and record management | Express API and Supabase | Working Draft | Partially Completed | Kyaw Linn | `listingService.ts`, Supabase migrations | Confirm new and updated records remain after refresh. |
| FR-05 | View apartment records | Public and admin listing pages | Working Draft | Partially Completed | Kyaw Linn | `ApartmentsPage.tsx`, `AdminListingsPage.tsx`, `screenshots/record-list.png` | Test with multiple approved, pending and rejected listings. |
| FR-06 | Search and apartment filters | Apartment list and filter panel | Working Draft | Partially Completed | Kyaw Linn | `ApartmentsPage.tsx`, `FilterPanel.tsx` | Test keyword, price, distance, university, room type, facility and availability filters. |
| FR-07 | Apartment detail view | Public apartment detail page | Working Draft | Completed | Phyo Wai Aung / Kyaw Linn | `ApartmentDetailPage.tsx`, `screenshots/detail-view.png` | Detail view, facilities, location, status and sample contact were visually confirmed. |
| FR-08 | Listing status tracking | Listing cards, owner portal and admin pages | Working Draft | Partially Completed | Kyaw Linn | `StatusBadge.tsx`, `OwnerListingsPage.tsx`, `AdminListingsPage.tsx` | Test pending, approved, rejected, available and unavailable transitions. |
| FR-09 | Admin listing management | Admin dashboard and listing-management page | Working Draft | Partially Completed | Kyaw Linn | `AdminDashboardPage.tsx`, `AdminListingsPage.tsx`, `screenshots/admin-view.png` | Test approve, reject, delete and status-update actions. |
| FR-10 | Validation and error prevention | Owner listing form and backend schemas | Working Draft | Partially Completed | Kyaw Linn | `OwnerAddListingPage.tsx`, `listingSchemas.ts` | Submit incomplete and invalid data and verify clear errors. |
| FR-11 | Confirmation and feedback messages | Owner and admin action notifications | Working Draft | Partially Completed | Kyaw Linn | `NotificationBox.tsx`, owner and admin pages | Verify confirmation messages after submission and status changes. |
| FR-12 | Dashboard and startup metrics | Admin and Power BI dashboards | Working Draft | Revised | Phyo Wai Aung / Kyaw Linn | `AdminDashboardPage.tsx`, `dashboardService.ts`, `screenshots/dashboard.png` | Add at least six defined metrics and build the Lab 11 Power BI dashboard. |
| FR-13 | Consistent user interface | Shared layouts and components | Working Draft | Completed | Kyaw Linn | `components

## Summary

- **Features visually confirmed during Sprint 1:** Homepage, apartment input form, apartment record list, search/filter interface, apartment detail view, listing-status display, admin listing-management view and dashboard.
- **Features available as working drafts:** Authentication, owner submission, database storage, admin actions, validation, confirmation messages, responsive design and privacy controls.
- **Features not yet started:** None identified.
- **Features requiring additional verification:** Successful form submission, database persistence, invalid-form errors, role protection, approve/reject/delete actions and mobile responsiveness.
- **Features requiring instructor feedback:** Whether the current full-stack implementation scope and external services are suitable for the remaining implementation sprints.

Screenshot evidence is stored in the `screenshots/` folder. Any problem discovered during further testing will be recorded as **Needs Fix**.

## Lab 11 Sprint 2 Audit Findings

The team reviewed the Lab 10 prototype against `system-requirements.md`, the MVP feature list, Lab 09 responsible-design decisions and the Lab 10 evidence.

The following improvements require attention during Sprint 2:

1. The owner listing form requires complete submission and database-persistence testing.
2. Required-field validation and confirmation messages require full interaction testing.
3. Admin approve, reject, delete and status-update actions require verification.
4. Search and filter controls require testing with multiple apartment records.
5. Mobile responsiveness requires verification across public, owner and admin screens.
6. The dashboard requires at least six clearly defined startup/product metrics.
7. Private contact information and role-protected functions require authorization testing.
8. Updated Lab 11 screenshots and Power BI evidence must be added after improvements.
## Lab 11 Status Summary

- **Completed:** 3 requirements — FR-01, FR-07 and FR-13
- **Partially Completed:** 12 requirements
- **Revised:** 1 requirement — FR-12
- **Pending:** 0 requirements
- **Not Applicable:** 0 requirements

## Sprint 2 Priorities

1. Verify owner listing submission and Supabase persistence.
2. Test validation and confirmation messages.
3. Test admin approval, rejection, deletion and status changes.
4. Verify search and filters using multiple apartment records.
5. Add at least six startup/product metrics.
6. Build the Student Apartment Finder Power BI dashboard.
7. Test role protection and private contact visibility.
8. Capture updated Lab 11 evidence after improvements.

The statuses will be reviewed again after Sprint 2 development and testing. Any verified working requirement may be changed to **Completed**, while discovered problems will remain **Partially Completed** with a documented next action.
