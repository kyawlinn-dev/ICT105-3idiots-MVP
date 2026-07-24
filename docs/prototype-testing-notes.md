# Lab 11 - Prototype Testing Notes

## Test Environment

- **Prototype:** https://student-apartment-finder.onrender.com
- **Browser:** Google Chrome
- **Device:** Laptop
- **Tester:** Phyo Wai Aung
- **Tester role:** Product Lead and Validation Lead
- **Test date:** 2026-07-24
- **Test data rule:** Use sample accounts and masked apartment/contact information only.

## Main User Flow Tested

The test covered the main Student Apartment Finder journey from opening the homepage to owner listing submission, database storage, apartment search and filtering, apartment detail viewing, admin approval and dashboard updates.

## Main Test Cases

| Test ID | Requirement | User Flow / Feature | Steps to Test | Expected Result | Actual Result | Status | Issue Found | Fix / Next Action |
|---|---|---|---|---|---|---|---|---|
| T-01 | FR-01 | Open homepage | Open the live prototype homepage. | Homepage shows the project name, target user, apartment-search purpose and main actions. | Homepage loaded successfully and displayed the required information after a short server start-up delay. | Pass with Observation | Hosted server has a cold-start delay after inactivity. | Keep a clear loading message, measure start-up time and investigate hosting improvements. |
| T-02 | FR-03, FR-10, FR-11 | Submit apartment listing | Sign in as an owner, test an empty submission, enter sample data and submit. | Required fields are validated, the listing is submitted and a confirmation message appears. | Empty submission was prevented and validation appeared. The complete sample listing submitted successfully and a confirmation message was displayed. | Pass | None | Continue using sample or masked listing information during testing. |
| T-03 | FR-04, FR-05 | View submitted listing | Open My Listings and refresh the browser after submission. | The submitted listing remains stored and appears with the correct status. | The sample listing appeared with a status and remained after refreshing the browser. | Pass | None | Continue checking status changes during admin testing. |
| T-04 | FR-06 | Search and filter apartments | Open Apartments, apply at least two filters and use Clear All. | Only matching records are displayed, and Clear All restores the complete list. | Search and filters changed the results correctly. Clear All restored the complete listing. | Pass | None | Retest after additional backend records are added. |
| T-05 | FR-07 | View apartment details | Open one approved apartment and review its information. | Price, distance, room type, facilities, availability, photos, map and sample contact information are displayed. | The required apartment details, photos, map, status and contact/inquiry action were displayed. Back navigation also worked. | Pass | None | Continue using sample or masked contact information. |
| T-06 | FR-08, FR-09 | Admin review and status update | Sign in as admin, open Listings and approve the submitted sample listing. | Status changes successfully and public visibility follows the approval decision. | Admin approval worked, remained after refresh and made the listing visible on the public Apartments page. | Pass | None | Test rejection and deletion using separate sample records before the final prototype. |
| T-07 | FR-12 | Dashboard metrics | Open the admin dashboard after the listing-status update. | Dashboard metrics are visible and reflect the current listing data. | Dashboard totals updated correctly, and the sample apartment appeared in recent listings. | Pass | None | Compare the prototype dashboard with the Power BI dashboard after completion. |

## Summary of Issues

1. The hosted Render server has a short cold-start delay after inactivity.
2. Rejection and deletion actions still require separate sample-record testing.
3. Unauthorized role-access testing is still required.
4. Mobile responsiveness testing is still required.
5. Power BI metrics must be compared with the prototype dashboard after the dataset export.

## Improvements Verified During Lab 11

- Required-field validation worked.
- A sample apartment listing was submitted successfully.
- The listing remained stored after refreshing.
- Search, filters and Clear All worked.
- The apartment detail view displayed the required information.
- Admin approval and public-listing visibility worked.
- Dashboard totals updated after the status change.

## Improvements for the Final Prototype

| Problem or Remaining Check | Requirement ID | Fix Before Final Prototype |
|---|---|---|
| Hosted server cold-start delay | FR-02 | Add a clear loading state and investigate hosting or server warm-up improvements. |
| Rejection and deletion not yet tested | FR-09 | Test both actions using separate sample records. |
| Unauthorized access not yet fully tested | FR-15 | Attempt protected owner and admin actions without the required role. |
| Mobile layouts not yet verified | FR-14 | Test the required screens at common mobile widths. |
| Power BI comparison is pending | FR-12, FR-16 | Compare Power BI results with the prototype dashboard and document any differences. |

## Overall Testing Decision

The main Student Apartment Finder workflow passed Sprint 2 testing. The prototype supports listing submission, storage, viewing, filtering, detail display, admin approval and dashboard updates.

The prototype can continue toward the final deliverable. Remaining work concerns performance, additional admin actions, role-security testing, mobile testing and Power BI evidence.
