# Lab 11 - Startup/Product Metrics

## Project

Student Apartment Finder Platform

## Purpose

These metrics help the team understand apartment-listing activity, availability, admin workload, affordability, prototype usability and operational performance. The metrics connect to the system requirements and support evidence-based decisions for the final prototype.

## Metrics Summary

| Metric ID | Metric Name | Metric Type | Why It Matters | Formula / Calculation | Data Source | Requirement |
|---|---|---|---|---|---|---|
| M-01 | Total Listings | Usage | Shows how many apartment records the platform manages. | Distinct count of listing IDs | Apartment records | FR-04, FR-05 |
| M-02 | Approved Listings | Status | Shows how many listings passed admin review. | Count where approval status is Approved | Apartment records | FR-08, FR-09 |
| M-03 | Pending Reviews | Operational | Shows the current admin-review workload. | Count where approval status is Pending Review | Apartment records | FR-08, FR-09 |
| M-04 | Available Rooms | Status | Shows how many approved rooms students can currently consider. | Count where availability is Available and approval is Approved | Apartment records | FR-05, FR-08 |
| M-05 | Average Monthly Rent | Product | Helps students and the team understand affordability. | Sum of monthly rent divided by listing count | Apartment records | FR-06, FR-07, FR-12 |
| M-06 | Listing Approval Rate | Operational | Shows the proportion of submitted listings approved by admins. | Approved listings divided by total reviewed listings × 100 | Apartment records | FR-08, FR-09 |
| M-07 | Average Review Time | Operational | Shows how quickly admins process listing submissions. | Average number of days from submission to review | Apartment records | FR-09, FR-12 |
| M-08 | Prototype Task Success Rate | Validation | Shows whether the tested user journey works successfully. | Passed test cases divided by total test cases × 100 | Prototype testing notes | FR-02, FR-16 |
## Requirement Evidence

| Requirement ID | Metric Evidence | Dashboard / Visual | Decision Supported |
|---|---|---|---|
| FR03 | Total listing submissions | Prototype dashboard and Power BI | Check whether landlords are actively adding apartments |
| FR04–FR05 | Total listings and available rooms | Prototype dashboard and Power BI | Measure the amount of housing available to students |
| FR06 | Average monthly rent and search/filter activity | Apartment search page and Power BI | Check whether listings match student budgets |
| FR08 | Approved listings and pending reviews | Admin dashboard and Power BI | Monitor the listing review workload |
| FR09 | Listing approval rate and average review time | Admin dashboard and Power BI | Evaluate the efficiency of the approval process |
| FR12 | Listings, room availability, rent, and review metrics | Startup metrics dashboard | Support product and operational decisions |
| FR16 | Prototype task success rate | Prototype testing notes | Identify usability problems and workflow failures |

## Current Metric Results

| Metric ID | Current Result | Evidence Source | Status |
|---|---:|---|---|
| M01 – Total Listings | Awaiting dataset export | Backend apartment records | Pending |
| M02 – Approved Listings | Awaiting dataset export | Backend apartment records | Pending |
| M03 – Pending Reviews | Awaiting dataset export | Backend apartment records | Pending |
| M04 – Available Rooms | Awaiting dataset export | Backend apartment records | Pending |
| M05 – Average Monthly Rent | Awaiting dataset export | Backend apartment records | Pending |
| M06 – Listing Approval Rate | Awaiting dataset export | Backend apartment records | Pending |
| M07 – Average Review Time | Awaiting activity-log export | Backend activity log | Pending |
| M08 – Prototype Task Success Rate | 100% (7 of 7 tests passed) | `docs/prototype-testing-notes.md` | Completed |

> The remaining metric values will be added after Kyaw Linn provides the sanitized backend datasets and completes the Power BI calculations. No values have been invented.
> ## Preliminary Interpretation and Decisions

The prototype completed all seven planned workflow tests, giving a current task success rate of 100%. This indicates that the main student, landlord, and administrator workflows are functioning in the tested desktop environment. A short delay was observed when the Render server started, so a loading or server warm-up message should be considered. Listing submission, persistence, searching, filtering, detail viewing, and administrator approval worked correctly during testing. Rejection, deletion, unauthorized role access, and mobile responsiveness still require additional verification. The remaining business metrics cannot be finalized until the sanitized backend exports are available. After the datasets are received, the team will compare listing supply, availability, rent, approval rate, and review time in Power BI before making final product decisions.
## Data Sources and Evidence

- Live prototype: https://student-apartment-finder.onrender.com
- Prototype test results: `docs/prototype-testing-notes.md`
- Feature audit: `docs/feature-implementation-status.md`
- Apartment dataset: `data/lab11_apartment_records.csv` — awaiting sanitized backend export
- Activity dataset: `data/lab11_activity_log.csv` — awaiting sanitized backend export
- Power BI dashboard: awaiting completion
- Power BI screenshot: `screenshots/lab11-powerbi-dashboard.png` — awaiting completion

## Current Limitations

- Most business metric values are pending because the backend datasets have not yet been exported.
- The current prototype test was performed on a laptop using Chrome.
- Mobile responsiveness and unauthorized role access still require testing.
- The Render deployment may have a short cold-start delay.
- Final Power BI metric values must be checked against the prototype dashboard.

## Responsibility

- Metric definitions and prototype validation: Phyo Wai Aung
- Backend data export and Power BI dashboard: Kyaw Linn
- README and weekly logbook updates: Arkar Kyaw Oo
