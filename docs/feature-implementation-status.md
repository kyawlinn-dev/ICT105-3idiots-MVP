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
# Feature Implementation Status

## Final Audit Note

This document checks the Student Apartment Finder Platform against the Lab 14 final functionality baseline. Statuses are based on the currently deployed prototype and will be checked again after the Lab 13 Important improvements are completed.

| Requirement ID | Requirement Summary | Prototype Screen / Module | Status | Evidence / Screenshot | Notes |
| --- | --- | --- | --- | --- | --- |
| FR-01 | Problem-specific homepage or landing screen | Public homepage | Completed | `screenshots/final-homepage.png` | The homepage shows the project title, target area, apartment-search purpose, and main actions. |
| FR-02 | Primary user pathway | Homepage → Apartments → Filters → Detail → Inquiry | Completed | `screenshots/final-homepage.png`, `screenshots/final-record-list.png`, `screenshots/final-detail-view.png` | Students can move from the homepage to an apartment listing and its complete details. |
| FR-03 | User input or data submission | Landlord Add Listing form and roommate-post form | Partially Completed | `screenshots/final-input-form.png` | Submission forms exist, but final instructions and validation improvements must be verified. |
| FR-04 | Data storage or simulated storage | Apartment listings, roommate posts, and administrative records | Completed | `screenshots/final-record-list.png`, `data/final-sample-data.csv` | Stored apartment records are displayed in student and administrator views. |
| FR-05 | View records or lists | Student apartment list, admin listings, landlord records, and roommate posts | Completed | `screenshots/final-record-list.png`, `screenshots/final-admin-view.png` | Students and administrators can view relevant records. |
| FR-06 | Search, filter, or category function | Apartment search and filter panel | Completed | `screenshots/final-record-list.png` | Search and filters work; minor clarity improvements remain in the Lab 13 improvement list. |
| FR-07 | Detail view | Apartment detail page | Completed | `screenshots/final-detail-view.png` | The detail page displays photographs, price, distance, description, facilities, contact information, and map location. |
| FR-08 | Status or progress tracking | Apartment availability, listing approval, and roommate-post moderation status | Completed | `screenshots/final-detail-view.png`, `screenshots/final-admin-view.png` | Available and Approved statuses are displayed; roommate status clarity remains an improvement item. |
| FR-09 | Administrator or manager function | Admin listings, roommate moderation, landlord records, and dashboard | Completed | `screenshots/final-admin-view.png`, `screenshots/final-dashboard.png` | Administrators can inspect platform records and perform moderation actions. |
| FR-10 | Validation and feedback | Landlord Add Listing form and other submission forms | Partially Completed | `screenshots/final-input-form.png` | Validation exists, but final location and photograph guidance still requires verification. |
| FR-11 | Dashboard, summary, or metrics | Administrator dashboard | Completed | `screenshots/final-dashboard.png` | The dashboard displays listing totals, room availability, average rent, status, pain points, and roommate demand. |
| FR-12 | Final prototype traceability | Requirements, user stories, MVP features, screenshots, and testing documents | Partially Completed | `docs/requirement-traceability-matrix.md`, `data/final-requirement-traceability.csv` | Prototype traceability is being completed as part of the Lab 14 final audit. |
