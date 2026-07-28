# Final Reflection

## 1. What We Built

Our team developed a working Student Apartment Finder Platform for university students searching for accommodation near campus.

The final prototype includes:

- A public homepage explaining the product and its value.
- User sign-in and role-based platform areas.
- Approved apartment listings.
- Search and filtering based on apartment preferences.
- Apartment detail pages containing prices, facilities, photographs, availability, contact information, and map locations.
- A landlord portal for apartment listing submission.
- Roommate posts and moderation.
- Administrator listing, landlord, user, and roommate-management functions.
- An administrator dashboard containing platform summaries and product metrics.
- A deployed web prototype accessible through a public link.

The prototype connects student, landlord, and administrator workflows in one platform.

## 2. What We Learned About Users

We learned that students need more than an apartment name and monthly price. They also need reliable photographs, facilities, availability, distance from campus, landlord contact information, and an understandable map location.

First-year and international students may experience greater difficulty because they have limited local knowledge and may not know which social media groups, agents, or recommendations are reliable.

Our simulated role-based testing also showed that small interface details affect usability. Filter labels, status explanations, inquiry visibility, location instructions, and administrator controls can determine whether users understand a working feature.

The current simulated results are useful for identifying possible usability problems, but they do not replace future testing with real external students, landlords, and administrators.

## 3. What We Learned About Requirements

Requirements helped the team keep the semester project connected across the different labs. They prevented the prototype from becoming a collection of unrelated screens and documents.

The final requirement audit showed that most requirements were addressed through:

- The public homepage.
- The primary student pathway.
- User and landlord input forms.
- Apartment-record storage and display.
- Apartment and administrative record lists.
- Search and filtering.
- Apartment detail pages.
- Availability and approval-status tracking.
- Administrator and moderation functions.
- Form validation and feedback.
- Dashboard summaries and product metrics.
- Final requirement traceability.

We also learned that a requirement should not be marked Completed only because a screen exists. The functionality should work, be understandable, and have suitable evidence.

For this reason, FR-03 and FR-10 remain Partially Completed until the remaining landlord-form guidance and validation improvements are verified.

## 4. What We Improved After Testing

The simulated testing identified improvements involving:

- Filter-label and distance-unit clarity.
- Visibility of the landlord inquiry action.
- Location-confirmation and photograph-upload instructions.
- Administrator approval and rejection controls.
- Roommate moderation-status explanations.
- Map-loading feedback.
- Currency information for the average-rent metric.

The team documented these findings in `docs/final-improvement-list.md` and assigned the prototype changes to the Technical Lead.

The Validation Lead is responsible for checking the affected workflows after the changes and updating each improvement’s status. Important improvements should be verified before the final submission, while Useful improvements can be completed if time permits.

## 5. What Was Difficult Technically

One challenge was connecting the different user roles into one coherent prototype. Students, landlords, and administrators require different navigation, permissions, records, and actions.

Other technical challenges included:

- Deploying the prototype and handling delays when the hosted server starts.
- Managing apartment records and keeping student and administrator views consistent.
- Displaying maps and confirmed apartment locations.
- Handling photograph uploads and listing information.
- Showing approval, availability, and moderation statuses clearly.
- Providing useful dashboard metrics from available platform data.
- Protecting private information while still providing useful demonstration data.
- Maintaining connected evidence across requirements, user stories, testing, screenshots, and GitHub files.

These challenges demonstrated that a working platform requires more than interface design. It also requires reliable data handling, role separation, validation, deployment, privacy awareness, and documentation.

## 6. What We Would Improve Next

The next development priorities are:

1. Complete and verify the remaining landlord-form guidance and validation improvements.
2. Test the platform with real first-year and international students.
3. Recruit more landlords and increase the number of verified apartment listings.
4. Improve map-loading feedback and location accuracy.
5. Improve roommate safety, reporting, and moderation guidance.
6. Add clearer notification and inquiry tracking.
7. Improve mobile responsiveness and accessibility.
8. Expand startup metrics using real, privacy-safe usage data.
9. Create a stronger process for checking outdated apartment information.
10. Evaluate sustainable revenue options without reducing student trust.

Future testing should clearly separate simulated testing from feedback collected from real external participants.

## 7. Individual Contributions

| Member | Contribution | Evidence |
| --- | --- | --- |
| Phyo Wai Aung | Product direction, validation planning, simulated user testing, sales scenario, demo scripts, improvement prioritization, requirement audit, traceability, sample data, final testing, reflection, and final pitch outline | `docs/sales-scenario.md`, `docs/user-testing-plan.md`, `docs/user-testing-results.md`, `docs/final-improvement-list.md`, `docs/feature-implementation-status.md`, `docs/requirement-traceability-matrix.md`, `docs/final-demo-script.md`, `docs/final-reflection.md`, `pitch/final-pitch-outline.md`, and related CSV files |
| Kyaw Linn | Prototype architecture, user interface, deployment, student workflow, landlord portal, administrator functions, maps, data handling, and technical improvements | Prototype source files, deployed prototype, technical GitHub issues and commits, and `prototype/final-prototype-link.md` |
| Arkar Kyaw Oo | Project documentation, final report, README organization, weekly logbook, submission checklist, and member-contribution evidence | `README.md`, `docs/weekly-logbook.md`, `docs/final-prototype-report.md`, `docs/final-submission-checklist.md`, and `data/member-contribution.csv` |

## Final Reflection Statement

The continuous lab process helped our team move from a broad student-housing problem to a requirement-based and testable MVP.

The Student Apartment Finder Platform is not perfect, but it demonstrates the core value of making apartment information easier for students to find, compare, and understand. It also provides structured participation for landlords and oversight functions for administrators.

The most important lesson was that building features is only one part of product development. The team also needed customer evidence, requirement discipline, validation, responsible data handling, clear documentation, teamwork, and a convincing explanation of the product’s value.

This project improved our understanding of how an IT venture develops from an initial problem into a working MVP through continuous planning, implementation, testing, feedback, and improvement.
