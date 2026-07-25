# Lab 11 Startup Metrics

**Project:** Student Apartment Finder Platform  
**Lab:** Lab 11 - MVP Implementation Sprint 2 and Startup Metrics  
**Prepared by:** Phyo Wai Aung  
**Analysis date:** 2026-07-25

## Purpose

This document defines the startup and product metrics used to evaluate listing supply, administrator review activity, affordability, and prototype usability. The metrics are connected to the system requirements, the administrator dashboard, the Lab 11 datasets, and the prototype testing evidence.

## Metrics Summary

| Metric ID | Metric | Definition and Calculation | Related Requirement | Current Result |
|---|---|---|---|---:|
| M01 | Total Listings | Count of unique apartment records | FR-04/FR-05 | 6 |
| M02 | Approved Listings | Count of records where `ReviewStatus` is `Approved` | FR-08/FR-09 | 6 |
| M03 | Pending Reviews | Count of records where `ReviewStatus` is `Pending` | FR-08/FR-09 | 0 |
| M04 | Available Rooms | Count of records marked as available | FR-05/FR-08 | Not available in the current dataset |
| M05 | Average Monthly Rent | Sum of monthly rents divided by the number of listings | FR-06/FR-07/FR-12 | THB 6,816.67 |
| M06 | Listing Approval Rate | Approved listings divided by total listings, multiplied by 100 | FR-08/FR-09 | 100% |
| M07 | Average Review Time | Average time between submission and review/update | FR-09/FR-12 | Cannot be calculated because dates are unavailable |
| M08 | Prototype Task Success Rate | Passed test cases divided by executed test cases, multiplied by 100 | FR-02/FR-16 | 100% (7 of 7 tests) |

## Calculation Evidence

- Total monthly rent: THB 40,900
- Number of listings: 6
- Average monthly rent: THB 40,900 / 6 = THB 6,816.67
- Approved listings: 6
- Listing approval rate: 6 / 6 x 100 = 100%
- Passed prototype tests: 7
- Prototype task success rate: 7 / 7 x 100 = 100%

## Requirement Evidence

| Requirement ID | Metric Evidence | Dashboard or Visual | Decision Supported |
|---|---|---|---|
| FR-03 | Listing-submission test event | Landlord input form and activity log | Check whether landlords can submit apartment records |
| FR-04/FR-05 | Total listings and listing persistence | Apartment records and public listing screen | Measure housing supply and confirm that records persist |
| FR-06 | Average rent and search/filter test | Apartment search page and Power BI | Check whether listings can be compared by student budget |
| FR-08 | Approved and pending listing counts | Administrator listings screen | Monitor the listing-review workload |
| FR-09 | Approval rate and administrator-review event | Administrator dashboard and activity log | Evaluate the listing-approval process |
| FR-12 | Listing, rent, approval, and testing metrics | Prototype dashboard and Power BI | Support product and operational decisions |
| FR-16 | Prototype task success rate | Prototype testing notes | Identify usability problems and workflow failures |

## Current Metric Results

| Metric ID | Current Result | Evidence Source | Status |
|---|---:|---|---|
| M01 - Total Listings | 6 | `data/lab11_apartment_records.csv` | Completed |
| M02 - Approved Listings | 6 | `data/lab11_apartment_records.csv` | Completed |
| M03 - Pending Reviews | 0 | `data/lab11_apartment_records.csv` | Completed |
| M04 - Available Rooms | Not available | Availability was not displayed in the supplied administrator records | Pending |
| M05 - Average Monthly Rent | THB 6,816.67 | `data/lab11_apartment_records.csv` | Completed |
| M06 - Listing Approval Rate | 100% | `data/lab11_apartment_records.csv` | Completed |
| M07 - Average Review Time | Cannot be calculated | Submission and update dates were not displayed | Pending |
| M08 - Prototype Task Success Rate | 100% (7/7) | `data/lab11_activity_log.csv` and `docs/prototype-testing-notes.md` | Completed |

## Interpretation and Decisions

The prototype currently contains six apartment listings, and all six are approved. The average listed monthly rent is THB 6,816.67, which provides an initial affordability benchmark for students. The 100% approval rate shows that all current records passed administrator review, but the dataset does not yet include rejected examples for comparison. All seven planned workflow tests passed, indicating that the main student, landlord, and administrator journeys worked in the tested laptop environment. A short Render cold-start delay was observed, so the interface should provide a loading or server warm-up message. Available-room totals cannot be confirmed because availability was not present in the supplied administrator records. Average review time also cannot be calculated until submission and review timestamps are recorded. The next data improvement should therefore add availability status and lifecycle timestamps to each listing.

## Data Sources and Evidence

- Live prototype: https://student-apartment-finder.onrender.com
- Apartment records: `data/lab11_apartment_records.csv`
- Prototype activity log: `data/lab11_activity_log.csv`
- Data dictionary: `data/lab11_data_dictionary.csv`
- Prototype test results: `docs/prototype-testing-notes.md`
- Feature audit: `docs/feature-implementation-status.md`
- Power BI dashboard: awaiting completion
- Power BI screenshot: `screenshots/lab11-powerbi-dashboard.png` - awaiting completion

## Current Limitations

- Submission dates and last-update dates were not visible in the administrator screenshots.
- Availability status was not included in the supplied administrator listing table.
- The current dataset contains only approved records and cannot compare approval with rejection patterns.
- The prototype test was performed on a laptop using Chrome.
- Mobile responsiveness, unauthorized role access, listing rejection, and listing deletion still require verification.
- The Render deployment may have a short cold-start delay.
- Final Power BI calculations must be checked against the values in this document.

## Responsibility

- Metric definitions, dataset validation, data dictionary, and prototype validation: Phyo Wai Aung
- Backend development, prototype improvements, and Power BI dashboard: Kyaw Linn
- README and weekly logbook updates: Arkar Kyaw Oo
